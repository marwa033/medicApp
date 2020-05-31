import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from '../../core/route-animation/route.animation';
import { AuthService } from 'app/service/auth-service/auth.service';
import * as $ from 'jquery';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";




@Component({
   selector: 'ms-dashboard',
   templateUrl: './saas-component.html',
   styleUrls: ['./saas-component.scss']
})


export class SaasComponent implements OnInit  {
   id: string="";
   editEName: string ='anything';
   editAName: string = '';
   editColor : any;
   editimage: string='';
   createdAt = new Date();
   updatedAt = new Date();
   filter : any;
   selectedstatus : any;
  //  addcount = this.count++;
   dataSource: MatTableDataSource<unknown>;
   displayedColumns: string[] = [ 'addcount','image', 'color' , 'name',  'createdAt' , 'updatedAt' , 'action'];


   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   
   @ViewChild(MatSort, {static: true}) sort: MatSort;

   status: any;
   results: any;
   tries: any;
   updated: any;
   imageSrc: any;
   image: any;
   message = 'anything';
   X: void;
  src: any;
 
   constructor(public translate: TranslateService,
               public authService: AuthService,
              private pageTitleService: PageTitleService ,
              private router : Router,
              private toastr: ToastrService,
                config: NgbModalConfig,
                private spinner: NgxSpinnerService,
                 private modalService: NgbModal) {
                  config.backdrop = 'static';
                  config.keyboard = false;
               }
           
               Update(value){
                //  if(this.imageSrc == ""){
                //    this.imageSrc == this.results;
                //  }
                  this.authService.editCategories(value).
                            then( editresponse => { this.tries = editresponse;
                              let message = editresponse.message;
                              if (message) {
                                this.toastr.error(message);
                              
                              }
                               else{
                                this.toastr.success('Successfully Updated');
                                this.Close();                  
                              }
                            });
                }  
                Close(){ 
                  this.modalService.dismissAll(); 
                  this.spinner.show();
                  window.location.reload();
                   } 
     
           applyFilter(event: Event) {
            const filterValue = (event.target as HTMLInputElement).value;
            this.dataSource.filter = filterValue.trim().toLowerCase();
          }

          selectedRow(element){
            
  this.setcategoryID(element);
             this.id = element._id;
             this.editEName = element.name;
             this.editColor =  (element.color);
             this.imageSrc = element.image;
          }
          FilterCategory(value){
            this.spinner.show();
            if(value.filter == undefined){
              value.filter = "";
            }
            this.authService.GetFilterCategories(value).
                      then( responsedata => { this.results = responsedata.data;
                         this.dataSource = new MatTableDataSource(responsedata.data);
                         this.dataSource.paginator = this.paginator;
                         this.dataSource.sort = this.sort;
                         setTimeout(() => {
                            this.spinner.hide();
                          }, this.results);
                      });
       }

Categories(){
     this.authService.GetCategories().
               then( responsedatafilter => { this.results = responsedatafilter.data;
                  this.dataSource = new MatTableDataSource(responsedatafilter.data);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                  setTimeout(() => {
                     this.spinner.hide();
                   }, this.results);
               });
}

handleInputChange(e) {
   var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
   var pattern = /image-*/;
   var reader = new FileReader();
   if (!file.type.match(pattern)) {
     alert('invalid format');
     return;
   }
   reader.onload = this._handleReaderLoaded.bind(this);
   reader.readAsDataURL(file);
 }
 _handleReaderLoaded(e) {
   let reader = e.target;
   this.imageSrc = reader.result;
   console.log(this.imageSrc)
 }

Active(element){
   this.authService.Activation(element).
   then( responseActivedata => { this.tries = responseActivedata;
      // console.log("state is = " + this.tries.state);
      element.state = this.tries.state;
      this.Close();   
   });
}

openLg(content) {
   this.modalService.open(content, { size: 'lg' });
 }

 setcategoryID(value) {
  localStorage.setItem('try', JSON.stringify(value));
  var x = JSON.parse(localStorage.getItem('try'));
console.log(x);
console.log('x => ' + x);
}
   ngOnInit() {
     
      this.spinner.show();
this.Categories();
$(document).ready(function() {

   $('.pointer').click(function() {
      $('.one').hide();
    });

 });

}
}

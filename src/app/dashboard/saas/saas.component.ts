import { Component, OnInit, ViewEncapsulation, ViewChild, Input, OnChanges, SimpleChanges, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from '../../core/route-animation/route.animation';
import { AuthService } from 'app/service/auth-service/auth.service';
import * as $ from 'jquery';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator, MatSort } from '@angular/material';
import {MatTableDataSource, MatTable} from '@angular/material/table';
// import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
   selector: 'ms-dashboard',
   templateUrl: './saas-component.html',
   styleUrls: ['./saas-component.scss']
})

export class SaasComponent implements  OnInit{
  id: string="";
   editEName: string ='';
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
   @ViewChild(MatTable, {static: true}) table: MatTable<any>;
   status: any;
   results: any;
   tries: any;
   updated: any;
   imageSrc: any;
   message = 'anything';
   X: void;
  src: any;
  try: any;
  imgResultBeforeCompress;
  imgResultAfterCompress;
  
  
   constructor(public translate: TranslateService,
               public authService: AuthService,
              private pageTitleService: PageTitleService ,
              private router : Router,
              private toastr: ToastrService,
                config: NgbModalConfig,
                private spinner: NgxSpinnerService,
                 private modalService: NgbModal,
                 private imageCompress: NgxImageCompressService) {
                  config.backdrop = 'static';
                  config.keyboard = false;
               }
           
               Update(value){
                 this.spinner.show()
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
     

          selectedRow(element){
            this.spinner.show();
            this.authService.GetIDCategories(element).
            then( responsedataID => { this.try = responsedataID;
              console.log(this.try.image)
              this.id = this.try._id;
              this.editEName =this.try.name.en;
              this.editAName =this.try.name.ar;
              this.editColor =this.try.color;
             this.imageSrc = this.try.image;
             setTimeout(() => {
              this.spinner.hide();
            }, this.try);
            });
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
                  // this.changeDetectorRefs.detectChanges();
                  console.log(this.dataSource)
                  setTimeout(() => {
                     this.spinner.hide();
                   }, this.results);
               });
}

uploadFile(){
  this.imageCompress.uploadFile().then(({image, orientation}) => {
       this.imgResultBeforeCompress = image;
       console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
       this.imageCompress.compressFile(image, null, 30, 30).then(
         result => {
           this.imageSrc = result;
           this.imgResultAfterCompress = result;
           console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
           console.log(result)
         }
       );
     });       
   }
Active(element){
   this.authService.Activation(element).
   then( responseActivedata => { this.tries = responseActivedata;
      element.state = this.tries.state;
      this.Close();   
   });
}
openLg(content) {
   this.modalService.open(content, { size: 'lg' });
 }
   ngOnInit() {
    this.spinner.show();
      this.Categories();
      // $(document).ready(function(){
      //   location.reload();
      // })
   }
}

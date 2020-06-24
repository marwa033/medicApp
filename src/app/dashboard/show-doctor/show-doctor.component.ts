import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'ms-show-doctor',
  templateUrl: './show-doctor.component.html',
  styleUrls: ['./show-doctor.component.scss']
})
export class ShowDoctorComponent implements OnInit {
  selectedSubscription: any;
  selecteddistrict: any;
  selectedcategory: any;
  selectedstatus: any;
  filter: any;
  id: string = '';
  editeName: string= '';
  upaName: string = '';
  createdAt = new Date();
  subscription = new Date();

  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = [ 'count' ,'name', 'district' , 'category' , 'subscription' , 'bookings' , 'action'];


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  results: any;
  tries: any;
  editEName: any;
  editAName: any;
  editATitle: any;
  editABio: any;
  editAAddress: any;
  try: any;
  districts: any;
  categories: any;
  
  constructor(public translate: TranslateService,
    public authService: AuthService,
    private router: Router,
   private pageTitleService: PageTitleService ,
   private toastr: ToastrService,
     config: NgbModalConfig,
     private spinner: NgxSpinnerService,
      private modalService: NgbModal) {
       config.backdrop = 'static';
       config.keyboard = false;
    } 
    openLg(content) {
      this.modalService.open(content, { size: 'lg' });
    }

    Categories(){
      this.authService.GetCategories().
                then( responsedatafilter => { this.categories = responsedatafilter.data;
                });
 } 
 FilterDoctor(value){
  if(value.status == undefined){
    value.status = "";
  }
  if(value.filter == undefined){
    value.filter = "";
  }
  if(value.category == undefined){
    value.category = "";
  }
  if(value.district == undefined){
    value.district = "";
  }
  if(value.subscription == undefined){
    value.subscription = "";
  }
  this.spinner.show();
  this.authService.GetFilterDoctor(value).
            then( responseDoctorfilter => { this.results = responseDoctorfilter.data;
               this.dataSource = new MatTableDataSource(responseDoctorfilter.data);
               this.dataSource.paginator = this.paginator;
               this.dataSource.sort = this.sort;
               setTimeout(() => {
                this.spinner.hide();
              }, this.results);
            });
           }
    Doctor(){
      this.authService.GetDoctor().
                then( responsegetDoctor => { this.results = responsegetDoctor;
                   this.dataSource = new MatTableDataSource(responsegetDoctor.data);
                   this.dataSource.paginator = this.paginator;
                   this.dataSource.sort = this.sort; 
                   console.log( this.results);
                   setTimeout(() => {
                    this.spinner.hide();
                  }, this.results);
                });
               }
               
               Close(){ 
                window.location.reload();
                this.modalService.dismissAll;
                 }  
                 Districts(){
                  this.authService.GetDistrict().
                            then( responsedistrictdata => { this.districts = responsedistrictdata.data;
                            });
                           }

Active(element){
  this.authService.AdminActivation(element).
                  then( responseActiveAdmindata => { this.tries = responseActiveAdmindata;
                     console.log(element);
                     this.Close();   
                  });
}
  ngOnInit() {
    this.spinner.show();
    this.Doctor();
    this.Categories();
    this.Districts();
  }

}

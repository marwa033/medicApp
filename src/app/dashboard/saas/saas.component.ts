import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from '../../core/route-animation/route.animation';
import { AuthService } from 'app/service/auth-service/auth.service';
import * as $ from 'jquery';
import { app } from 'firebase';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'
import { Observable } from 'rxjs';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';


@Component({
   selector: 'ms-dashboard',
   templateUrl: './saas-component.html',
   styleUrls: ['./saas-component.scss'],
   encapsulation: ViewEncapsulation.None,
   host: {
      '[@fadeInAnimation]': 'true'
   },
   animations: [ fadeInAnimation ]
})


export class SaasComponent implements OnInit  {
   [x: string]: any;
  name= '';
  contactno= '';
  patientlab= '';
  idnumber= '';
  from= '';
  to= '';
  mrn= '';
   // Add form inputs
   fname= '';
   mname= '';
   lname= '';
   plabID= '';
   gender= '';
   title= '';
   dob= '';
   idno= '';
   mnumber= '';
   pnumber= '';
   nation;
   passportno= '';
   email= '';
   bgroup= '';
   country= '';
   state= '';
   city= '';
   detials= '';
   selectedpatient: any;
   public results: Observable<any>;
   public history: Observable<any>;


   dataSource: MatTableDataSource<unknown>;
   displayedColumns: string[] = ['PatientName', 'Mobile' , 'Phone' ,
    'Date_Of_Birth' ,'custom_id',  'PatientID' , 'symbol'];


   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   // @ViewChild(MatSort, {static: true}) sort: MatSort;


   constructor(public translate: TranslateService,
               public authService: AuthService,
              private pageTitleService: PageTitleService ,
                config: NgbModalConfig,
                 private modalService: NgbModal) {
               }
               openSm(content) {
                 this.modalService.open(content, { size: 'lg' });
               }


              async Nationality(value) {

               this.authService.AddNationality(value).then( getNationalrsponse => {
                  this.nation = getNationalrsponse.nationalities;
               });
              }

              async BloodGroup(value) {
             
               this.authService.AddBloodGroup(value).then( getbloodgrouprsponse => {
                  this.bgroup = getbloodgrouprsponse.bloodGroups;
               });
              }
              async Country(value) {
            
               this.authService.AddCountry(value).then( getcountryrsponse => {
                  this.country = getcountryrsponse.country;
               });
              }

              async State(value) {
               this.authService.AddState(value).then( getstatersponse => {
                  this.state = getstatersponse.states;
               });
              }
              async Title(item) {
   
              }
              async Gender(value) {
               this.authService.AddGender(value).then( getGenderrsponse => {
                  this.gender = getGenderrsponse.genders;
               });
              }
              async City(value) {
               this.authService.AddCity(value).then( getcityrsponse => {
                  this.city = getcityrsponse.cities;
               });
              }
               Add(value) {
                  this.authService.AddPatient(value);
               }

               		// Changed for Double click ////
                     Search(value) {
                        if (value.name == undefined || value.name =='') {
                        value.name=' ';
                        } 
                        if (value.contactno == undefined || value.contactno =='') {
                        value.contactno=' ';
                        } 
                        if (value.patientlab == undefined || value.patientlab =='') {
                        value.patientlab=' ';
                        } 
                        if (value.idnumber == undefined || value.idnumber =='') {
                        value.idnumber=' ';
                        } 
                        if (value.from == undefined || value.from =='') {
                        value.from=" ";
                        } 
                        if (value.to == undefined || value.to =='') {
                        value.to=" ";
                        } 
                        if (value.mrn == undefined || value.mrn =='') {
                        value.mrn=' ';
                        }
                        this.authService.SearchPatient(value).
                        then( responsedata => { this.results = responsedata;
                           this.dataSource = new MatTableDataSource(responsedata);
                           this.dataSource.paginator = this.paginator;
                           // this.dataSource.sort = this.sort; 
                           console.log( this.results );
                        });
                     }



  async selectOne(item) {   
   var obj = this.authService.AddTitle(item).then( gettitlersponse => {
      this.title = gettitlersponse.titles;
   });
 }
 async selectedItem(item) {
   var obj = await this.authService.OrderHistory(item).then(
      responseorderhistory => {this.history = responseorderhistory;
     console.log( this.history );
    });
 }
 toggleSidebar() {
   this.coreService.sidenavOpen = !this.coreService.sidenavOpen;
}


   ngOnInit() {


      this.Nationality('input');
      this.BloodGroup('input');
      this.State('input');
      this.City('input');
      this.Country('input');
      this.Title('input');
      this.Gender('input');


      $(document).ready(function() {

         $('.add').click(function() {
            $('.first').hide();
            $('.two').show();
          });
          $('.log').click(function() {
            $('.first').show();
            $('.two').hide();
          });

          $('.visit').click(function() {
            $('.rest').toggle();
          });

       });

       setTimeout(function() {
         $('.loadeer').fadeToggle();
      }, 3000);

   }
}

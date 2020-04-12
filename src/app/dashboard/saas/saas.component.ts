import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
   public data: object[];

   // selectednationality;
   //  selectedstate;
   //  selectedBloodGroup;
   //  selectedcity;
   // selectedcountry;
   public UserData: any;
   // public results: any;
   selectedpatient: any;
   public results: Observable<any>;
   public history: Observable<any>;

            //                         //   this.results = authService.getsearchResults();
            //   public RequestOrder = function(value)
            //    {
            //       console.log(value);
            //    }

   public isCollapsed = false;


   constructor(public translate: TranslateService,
               public authService: AuthService,
              private pageTitleService: PageTitleService ,
                config: NgbModalConfig,
                 private modalService: NgbModal) {
               // config.backdrop = 'static';
               // config.keyboard = false;
               }
               openSm(content) {
                 this.modalService.open(content, { size: 'lg' });
               }


              async Nationality(value) {
               // await this.authService.AddNationality(value);
               // this.nation = this.authService.nationalities.nationalities;
               // console.log(this.nation);
               this.authService.AddNationality(value).then( getNationalrsponse => {
                  this.nation = getNationalrsponse.nationalities;
               });
              }

              async BloodGroup(value) {
               // await this.authService.AddBloodGroup(value);
               // this.bgroup = this.authService.bloodGroups.bloodGroups;
               // console.log(this.bgroup);
               this.authService.AddBloodGroup(value).then( getbloodgrouprsponse => {
                  this.bgroup = getbloodgrouprsponse.bloodGroups;
               });
              }
              async Country(value) {
               // await this.authService.AddCountry(value);
               // this.country = this.authService.countries.country;
               this.authService.AddCountry(value).then( getcountryrsponse => {
                  this.country = getcountryrsponse.country;
               });
              }

              async State(value) {
               // await this.authService.AddState(value);
               // this.state = this.authService.states.states;
               this.authService.AddState(value).then( getstatersponse => {
                  this.state = getstatersponse.states;
               });
              }
              async Title(item) {
   
              }
              async Gender(value) {
               // await this.authService.AddGender(value);
               // this.gender = this.authService.genders.genders;
               this.authService.AddGender(value).then( getGenderrsponse => {
                  this.gender = getGenderrsponse.genders;
               });
              }
              async City(value) {
               // await this.authService.AddCity(value);
               // this.city = this.authService.cities.cities;
               this.authService.AddCity(value).then( getcityrsponse => {
                  this.city = getcityrsponse.cities;
               });
              }
               Add(value) {
                  // value.gpayer = this.selectednationality;

                  this.authService.AddPatient(value);
                  // console.log(this.selectednationality);
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
                        // this.results=  this.authService.SearchPatient(value);
                        this.authService.SearchPatient(value).then( responsedata => {
                           this.results = responsedata;
                           console.log( this.results );
                        });
                     }

                  
   RequestOrder(value) {
      // this.router.navigate(['/']);
      console.log('marwaaaaaaaaaaaaaaaaaaa');
    }

    
  async selectOne(item) {
   
   // var obj = await this.authService.AddTitle(item);
   // this.title = this.authService.titles.titles;
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

   ngOnInit() {


      this.Nationality('input');
      this.BloodGroup('input');
      this.State('input');
      this.City('input');
      this.Country('input');
      this.Title('input');
      this.Gender('input');



      this.pageTitleService.setTitle('Home');

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

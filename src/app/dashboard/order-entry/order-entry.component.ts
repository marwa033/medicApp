import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';
import {FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ms-order-entry',
  templateUrl: './order-entry.component.html',
  styleUrls: ['./order-entry.component.scss']
})
export class OrderEntryComponent implements OnInit {
  startDate = new Date(2020, 0, 1);

  // toppings = new FormControl();
  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  selectedclinic: any;
  selecteddoctor: any;
  ordermrn: any;
  selectedpayer: any;
  selectedcontract: any;
  showMe: any;
  selectedcopayment: any;
  selectedpercent: any;
  comment: any;
  collect: any;
  total: any;
  amt: any;
  receivable: any;
  cash: any;
  outstanding: any;
  
  payers= '';
  contracts= '';
  copayment= '';
  perecent= '';
  absolute= '';
  approval= '';
  mrn= '';
  card= '';
  claim= '';
  credit= '';
  clinicsss= '';
  doctors= '';
  selectedpatient: any;

  ncash= '';
  tcash= '';
  recieved= '';
  refund= '';
  discounttype= '';
  remaining= '';
  discount= '';
  deposit= '';
  ncredit= '';
  methode= '';
  results: any;
  visits: any;
  FilteredVisits: any;
  UserData: any;
  patients: any;
  tables: any;

 flagDiv = false;
 refundTry: string;
customerName: string;
customerID: number;
netcash: number;
netcredit: number;
// tableid: number;
// tablename: string;
totalcredit= '';
itemtype=0;
  constructor(public translate: TranslateService,
               public authService: AuthService,
              private pageTitleService: PageTitleService,
              private route: ActivatedRoute) { }

  //  Entry(value) {
  //     this.authService.OrderEntry(value);
  //  }

  Entry(value) {
    this.authService.OrderEntry(value);
 }

 async loadPatient(value) {
  await this.authService.LoadPatient(value);
  this.patients = this.authService.patients.Patient_Search;
  console.log('//////////');
 }

Visit(value) {
  // this.results=  this.authService.SearchPatient(value);
  this.authService.VisitType(value).then( responseloadtestdata => {
     this.visits = responseloadtestdata;
     console.log( this.visits );
  });

 }
 async OrderDoctor(value) {
  // await this.authService.OrderEntryDoctor(value);
  // this.doctors = this.authService.GetOrderDoctor.doctors;

 }


  async GetTable(value) {
  
}


 async GeneratePayer(value) {
  // await this.authService.GeneratePayerInvoice(value);
  // this.payers = this.authService.clients.clients;
  this.authService.GeneratePayerInvoice(value).then( getpayerrsponse => {
    this.payers = getpayerrsponse.clients;
 });
 }

 async GetContract(value) {
  // await this.authService.OrderContract(value);
  // this.contracts = this.authService.contractresult.contracts;
  this.authService.OrderContract(value).then( getcontractrsponse => {
    this.contracts = getcontractrsponse.contracts;
 });
 }

 async GenerateClinic(value) {
  await this.authService.GenerateClinicInvoice(value);

  this.clinicsss = this.authService.clinic.ClinicList;
  console.log(this.clinicsss);
 }
 HideShow() {
   this.flagDiv = !this.flagDiv;
 }

selectCompany(item) {
  console.log('item is===' + item);
  this.customerName = item.CategoryName;

  this.flagDiv = false;
}

// var obj = await this.authService.CollectionDetials(item).then(
//   responsecollectiondetialsdata => {this.detials = responsecollectiondetialsdata;
//  console.log( this.detials );
// });
// }
  async selectOne(item) {
  console.log('*********************************');
 let result = await this.authService.LoadVisit(item);
if(item.ItemTypeID==1)
{
  if (this.tables != undefined) {
    this.tables.push(result._Load_Test);
   }
    else {
      this.tables = [];
      this.tables.push(result._Load_Test);
  
    }
} else if(item.ItemTypeID==2)
{
  if (this.tables != undefined) {
    this.tables.push(result);
   }
    else {
      this.tables = [];
      this.tables.push(result);
  
    }
}
 
  console.log( this.tables );
//   .then(
//      responsevisititemdata => {
//        this.tables = responsevisititemdata;
//     console.log( this.tables );
//  });
}
selectRow(item) {
  this.refundTry = item.WorkCenterName;
  this.totalcredit = item.Covered;
  this.netcash = item.Covered;
  this.netcredit = item.Covered;
}
async selectDoctor(item) {
  this.authService.OrderEntryDoctor(item).then( getorderdoctorrsponse => {
    this.doctors = getorderdoctorrsponse.doctors;
 });
}
selectType(){
  this.FilteredVisits=[];
  if(this.itemtype==0)
 { this.FilteredVisits=this.visits;
 }
 else if(this.itemtype!=0)
 {
   this.visits.forEach(visit => {
     if(visit.ItemTypeID==this.itemtype)
     {
      this.FilteredVisits.push(visit);
     }
   });
   
 }
}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedpatient = params.id;
    });
    this.GeneratePayer('input');
    this.GenerateClinic('input');
    this.OrderDoctor('input');
    this.GetContract('input');
    this.loadPatient(this.selectedpatient);
    // this.GetTable('input');

    $(document).ready(function() {
      $('.type').click(function() {
        $('.other').toggle();
      });

      $('.credit').click(function() {
        $('.this').toggle();
      });

  
      $('.walk').click(function() {
        $('.other').hide();
      });

      $('.percent').click(function() {
        $('.drop').hide();
      });
      $('.collect').click(function() {
        $('.date').prop('readonly', false)
            });

    })

  }

}

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import * as $ from 'jquery';
import { Observable } from 'rxjs';


@Component({
  selector: 'ms-general-lab',
  templateUrl: './general-lab.component.html',
  styleUrls: ['./general-lab.component.scss']
})
export class GeneralLabComponent implements OnInit {
  afrom= '';
  ato= '';
  center;
  selectedcenter;
  wcenter;
  selectedwcenter;
  ecategory: any;
  test= '';
  minstatus= '';
  maxstatus= '';
  clinic;
  selectedclient;
  priority= '';
  visitid= '';
  sampleid= '';
  selectedtest;
  UserData: any;
  detials: any;
  // labs: any;//////////
  public labs: Observable<any>;
  visit: any;
  pname: any;
  category: any;
  selectedminstatus: any;
  selectedmaxstatus: any;
  selectedpriority: any;
  


  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService) { }
  
   async GenerateClinic(value) {
    await this.authService.GenerateClinicInvoice(value);
    this.clinic = this.authService.clinic.ClinicList;
   }
   async Center(value) {
    this.authService.CenterCollection(value).then( getcenterrsponse => {
      this.center = getcenterrsponse.centers;
   });
   }


   async WorkCenter(value) {
    this.authService.GeneralWCenter(value).then( getWcenterrsponse => {
      this.wcenter = getWcenterrsponse.workCenteres;
   });
   }

   async Test(value) {

    this.authService.GeneralTest(value).then( gettestrsponse => {
      this.test = gettestrsponse.testModels;
   });
   }

   async Priority(value) {
   
    this.authService.GeneralPriority(value).then( getpriorityrsponse => {
      this.priority = getpriorityrsponse.priorities;
   });
   }
   async Category(value) {

    this.authService.GeneralGategory(value).then( getgategoryrsponse => {
      this.ecategory = getgategoryrsponse.clientCategoryModels;
   });
   }
   async Minstatus(value) {

    this.authService.MinimumStatus(value).then( getminstatusrsponse => {
      this.minstatus = getminstatusrsponse.testStatuses;
   });
   }
   async Maxstatus(value) {

    this.authService.MaximumStatus(value).then( getmaxstatusrsponse => {
      this.maxstatus = getmaxstatusrsponse.testStatuses;
   });
   }
General(value) {
  if (value.minstatus == undefined || value.minstatus =='') {
  value.minstatus='0';
  } 

  if (value.sampleid == undefined || value.sampleid =='') {
  value.sampleid= '0';
  } 

  if (value.visitid == undefined || value.visitid =='') {
  value.visitid=' ';
  }

  if (value.priority == undefined || value.priority =='') {
  value.priority='0';
  }

  if (value.clinic == undefined || value.clinic =='') {
  value.clinic="0";
  }

  if (value.maxstatus == undefined || value.maxstatus =='') {
  value.maxstatus="0";
  }

  if (value.test == undefined || value.test =='') {
  value.test='0';
  } 

  if (value.ecategory == undefined || value.ecategory =='') {
  value.ecategory='0';
  }

  if (value.wcenter == undefined || value.wcenter =='') {
  value.wcenter=" ";
  }

  if (value.center == undefined || value.center =='') {
  value.center="0";
  }

  if (value.ato == undefined || value.ato =='') {
  value.ato= ' ';
  } 

  if (value.afrom == undefined || value.afrom =='') {
  value.afrom=' ';
  } 
  this.authService.GeneralLab(value).then(
    responsegeneraldata => {this.labs = responsegeneraldata;
     console.log( this.labs );
  });
}
async selectCompany(item) {
  console.log("****************************");
  this.visit = item.VisitId;
  this.pname = item.Name;

  var obj = await this.authService.GeneralDetials(item).then(
    responsegeneraldetialsdata => {this.detials = responsegeneraldetialsdata;
   console.log( this.detials );
  });
}

  ngOnInit() {
    this.Test('input');
    this.Center('input');
    this.WorkCenter('input');
    this.GenerateClinic('input');
    this.Priority('input');
    this.Minstatus('input');
    this.Maxstatus('input');
    this.Category('input');

    $(document).ready(function() {
      $('.down').click(function() {
        $('.right').show();
        $('.down').hide();
        $('.sample').hide();
      });
      $('.right').click(function() {
        $('.down').show();
        $('.right').hide();
        $('.sample').show();
      });
    });

  }

}

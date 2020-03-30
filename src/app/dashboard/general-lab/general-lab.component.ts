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
  // labs: any;
  public labs: Observable<any>;
  visit: any;
  pname: any;


  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService) { }
   async Center(value) {
    await this.authService.CenterCollection(value);
    this.center = this.authService.centers.centers;
   }
   async GenerateClinic(value) {
    await this.authService.GenerateClinicInvoice(value);
    this.UserData = this.authService.userData;

    console.log(this.UserData);
    this.clinic = this.UserData.ClinicList;
    console.log(this.clinic);
   }
   async WorkCenter(value) {
    await this.authService.GeneralWCenter(value);
    this.wcenter = this.authService.workcenters.workCenteres;
   }

   async Test(value) {
    await this.authService.GeneralTest(value);
    this.test = this.authService.tests.testModels;

   }

   async Priority(value) {
    await this.authService.GeneralPriority(value);
    this.priority = this.authService.priorities.priorities;
   }
   async Category(value) {
    await this.authService.GeneralGategory(value);
    this.ecategory = this.authService.categories.clientCategoryModels;
   }
   async Minstatus(value) {
    await this.authService.MinimumStatus(value);
    this.minstatus = this.authService.minstatus.testStatuses;
   }
   async Maxstatus(value) {
    await this.authService.MaximumStatus(value);
    this.maxstatus = this.authService.maxstatus.testStatuses;
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

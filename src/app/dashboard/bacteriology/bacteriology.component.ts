import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';


@Component({
  selector: 'ms-bacteriology',
  templateUrl: './bacteriology.component.html',
  styleUrls: ['./bacteriology.component.scss']
})
export class BacteriologyComponent implements OnInit {
  bfrom: string='';
  bto: string='';
  bcenter;
  selectedcenter;
  bwcenter;
  selectedwcenter;
  bcategory;
  selectedcategory;
  btest;
  selectedtest;
  bminstatus: string='';
  bmaxstatus: string='';
  clinic;
  selectedclient;
  bpriority;
  selectedpriority;
  bvisitid: string='';
  bsampleid:string='';
  UserData: any;
  bacteriologies: any;
  visit: any;
  pname: any;

  
  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService) { }


   async Center(value) {
    await this.authService.CenterCollection(value);
    this.bcenter = this.authService.centers.centers;
   }


   async WorkCenter(value) {
    await this.authService.GeneralWCenter(value);
    this.bwcenter = this.authService.workcenters.workCenteres;

   }

   async Test(value) {
    await this.authService.GeneralTest(value);
    this.btest = this.authService.tests.testModels;
   }
   async GenerateClinic(value) {
    await this.authService.GenerateClinicInvoice(value);
    this.UserData = this.authService.userData;
  
    console.log(this.UserData);
    this.clinic = this.UserData.ClinicList;
    console.log(this.clinic);
   }
   async Priority(value) {
    await this.authService.GeneralPriority(value);
    this.bpriority = this.authService.priorities.priorities;
   }
   async Category(value) {
    await this.authService.GeneralGategory(value);
    this.bcategory = this.authService.categories.clientCategoryModels;
   }
   async Minstatus(value) {
    await this.authService.MinimumStatus(value);
    this.bminstatus = this.authService.minstatus.testStatuses;
   }
   async Maxstatus(value) {
    await this.authService.MaximumStatus(value);
    this.bmaxstatus = this.authService.maxstatus.testStatuses;
   }
//    Bacteria(value) {
//     this.authService.Bacteriology(value);
//     this.bacteriologies = this.authService.bacteriology;
//     console.log( 'results is :  ' + this.bacteriologies);
//     console.log(  this.bacteriologies);
//  }
Bacteria(value) {
  if (value.bfrom == undefined || value.bfrom == '') {
    value.bfrom = ' ';
    }

    if (value.bto == undefined || value.bto == '') {
    value.bto = ' ';
    }

    if (value.bcenter == undefined || value.bcenter == '') {
    value.bcenter = '0';
    }

    if (value.bwcenter == undefined || value.bwcenter == '') {
    value.bwcenter = " " ;
    }

    if (value.bcategory == undefined || value.bcategory == '') {
    value.bcategory ='0';
    }

    if (value.btest == undefined || value.btest == '') {
    value.btest ='0';
    }

    if (value.bminstatus == undefined || value.bminstatus == '') {
    value.bminstatus = '0';
    }

    if (value.bmaxstatus == undefined || value.bmaxstatus == '') {
    value.bmaxstatus = '0';
    }

    if (value.clinic == undefined || value.clinic == '') {
    value.clinic ='0';
    }

    if (value.bpriority == undefined || value.bpriority == '') {
    value.bpriority ='0';
    }

    if (value.bvisitid == undefined || value.bvisitid == '') {
    value.bvisitid = ' ' ;
    }

    if (value.bsampleid == undefined || value.bsampleid == '') {
    value.bsampleid = '0';
    }
  this.authService.Bacteriology(value).then(
    responsebackdata => {this.bacteriologies = responsebackdata;
     console.log( this.bacteriologies );
  });
}
selectedRow(item) {
  this.visit = item.VisitId;
  this.pname = item.Name;

}
  ngOnInit() {

    this.Test('input');
    this.Center('input');
    this.WorkCenter('input');
    this.GenerateClinic('input');
    this.Priority('input');
    this.Priority('input');
    this.Category('input');
    this.Minstatus('input');
    this.Maxstatus('input');

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

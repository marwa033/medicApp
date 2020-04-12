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
  selectedeminstatus: any;
  category: any;
  selectedemaxstatus: any;
  selecttest: any;
  detials: any;



  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService) { }


   async Center(value) {
    this.authService.CenterCollection(value).then( getcenterrsponse => {
      this.bcenter = getcenterrsponse.centers;
   });
   }


   async WorkCenter(value) {

    this.authService.GeneralWCenter(value).then( getWcenterrsponse => {
      this.bwcenter = getWcenterrsponse.workCenteres;
   });
   }

   async Test(value) {

    this.authService.GeneralTest(value).then( gettestrsponse => {
      this.btest = gettestrsponse.testModels;
   });
   }
   async GenerateClinic(value) {
    await this.authService.GenerateClinicInvoice(value);
    this.clinic = this.authService.clinic.ClinicList;
  
 
  //   this.authService.GenerateClinicInvoice(value).then( getclinicrsponse => {
  //     this.clinic = getclinicrsponse.ClinicList;
  //  });
   }
   async Priority(value) {
   
    this.authService.GeneralPriority(value).then( getpriorityrsponse => {
      this.bpriority = getpriorityrsponse.priorities;
   });
   }
   async Category(value) {

    this.authService.GeneralGategory(value).then( getgategoryrsponse => {
      this.bcategory = getgategoryrsponse.clientCategoryModels;
   });
   }
   async Minstatus(value) {

    this.authService.MinimumStatus(value).then( getminstatusrsponse => {
      this.bminstatus = getminstatusrsponse.testStatuses;
   });
   }
   async Maxstatus(value) {

    this.authService.MaximumStatus(value).then( getmaxstatusrsponse => {
      this.bmaxstatus = getmaxstatusrsponse.testStatuses;
   });
   }
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

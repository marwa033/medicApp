import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ms-lab-info',
  templateUrl: './lab-info.component.html',
  styleUrls: ['./lab-info.component.scss']
})
export class LabInfoComponent implements OnInit {
  labs: any;
  labname: string = "" ;
  lab: any;
  website : string = '' ;
  webresult: string = '' ;
  hotline: string = '';
  labaddress: string = '';
  labincharge: string = '';
  legaldetail: string = '';
  labfax: string = '';
  labphone: string = '';
  labmobile: string = '';
  uplab: any;
  labid: any;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService,
   private route: ActivatedRoute) { }
   LabInfo(value) {
    this.authService.AddLabInfo(value);
   }
  //  Labinformation(value) {

  //   this.authService.GetLabInformation(value);
  //   this.labs = this.authService.getlab.labs;
  //   console.log(this.labs);
  //   this.labname = this.labs[0].name;
  // }
  Labinformation(value) {
    // this.results=  this.authService.GetLabInformation(value);
    this.authService.GetLabInformation(value).then( LabInformationrespnse => {
       this.labs = LabInformationrespnse.labs;
       console.log( this.labs );
       this.labid = this.labs[0].id;
       this.labname = this.labs[0].name;
       this.website = this.labs[0].website;
       this.webresult = this.labs[0].webresult;
       this.hotline = this.labs[0].hotline;
       this.labaddress = this.labs[0].address;
       this.labincharge = this.labs[0];
       this.legaldetail = this.labs[0];
       this.labfax = this.labs[0].fax;
       this.labphone = this.labs[0].phone;
       this.labmobile = this.labs[0].mobile;
      });
  
   }
   UpLab(value) {
    // this.authService.UpdateBranch(value);
    this.authService.UpdateLabInfo(value).then(
      getuplabResponse => {this.uplab = getuplabResponse;
       console.log( this.uplab );
    });
  }


  WithoutArray(value) {

    // this.authService.LabWithOutArray(value);
    // this.labs = this.authService.noarray;
    // console.log(this.labs);
    // this.labname = this.labs.name;
  }

  ngOnInit() {
    this.Labinformation('input');
    this.WithoutArray('input');
  
    $(document).ready(function() {
      $('.collect').click(function() {
        $('.done').show();
        $('.collect').hide();
      });

      $('.done').click(function() {
        $('.done').hide();
        $('.collect').show();
      });

      $('.collect').click(function() {
        $('.date').prop('disabled', false)
            });

    })
  }


}

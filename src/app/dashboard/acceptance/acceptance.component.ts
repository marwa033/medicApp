import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-acceptance',
  templateUrl: './acceptance.component.html',
  styleUrls: ['./acceptance.component.scss']
})
export class AcceptanceComponent implements OnInit {
  fcollection= '';
  tcollection= '';
  status2;
  selectedstatus;
  center2;
  selectedcenter;
  visite2= '';
  sample2= '';
  UserData: any;
  public acceptance: Observable<any>;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService) { }

   async Center(value) {
    await this.authService.CenterCollection(value);
    this.center2 = this.authService.centers.centers;

    // console.log(this.UserData);
    // this.center2 = this.UserData.centers;
    // console.log(this.center2);
   }


   async Status(value) {
    await this.authService.GetStatus(value);
    this.status2 = this.authService.getstatus.testStatuses;
   }

  // Acceptance(value) {
  //   this.authService.SampleAcceptance(value);

  //   this.acceptance = this.authService.AcceptanceResult;
  //   console.log( 'results is :  ' + this.acceptance);
  //   console.log(  this.acceptance);

  // }
  Acceptance(value) {
    if (value.sample2 == undefined || value.sample2 =='') {
    value.sample2='0';
    } 
    if (value.visite2 == undefined || value.visite2 =='') {
    value.visite2=' ';
    } 
    if (value.center2 == undefined || value.center2 =='') {
    value.center2='0';
    } 
    if (value.status2 == undefined || value.status2 =='') {
    value.status2='0';
    } 
    if (value.tcollection == undefined || value.tcollection =='') {
    value.tcollection=" ";
    } 
    if (value.fcollection == undefined || value.fcollection ==' ') {
    value.fcollection=" ";
    } 
    // this.acceptance =  this.authService.SampleAcceptance(value);
    this.authService.SampleAcceptance(value).
    then( responseacceptdata => {this.acceptance = responseacceptdata;
       console.log( this.acceptance );
    });
 }

  ngOnInit() {
    this.Status('input');
    this.Center('input');
  }

}

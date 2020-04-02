import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  pname= '';
  pcpt= '';
  pactive= '';
  idprofile= '';
  nameprofile= '';
  genderprofile= '';
  activeprofile= '';
  printprofile= '';
  UserData: any;
  // profiles: any;
  public profiles: Observable<any>;


  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService,
   config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    }
    openSm(content) {
      this.modalService.open(content, { size: 'lg' });
    }
    addProfile(value) {
      this.authService.AddProfile(value);
     }
//   Profile(value) {
//     this.authService.ConfigProfile(value);

//     this.profiles = this.authService.ProfileResult;
//     console.log( 'results is :  ' + this.profiles);
//     console.log(  this.profiles);
//  }
Profile(value) {
  if (value.pcpt == undefined || value.pcpt =='') {
  value.pcpt = ' ';
  }
  if (value.pname == undefined || value.pname =='') {
  value.pname = ' ';
  }
if (value.pactive == undefined || value.pactive =='') {
  value.pactive = '2';
}

  this.authService.ConfigProfile(value).then(
    responseprofiledata => {this.profiles = responseprofiledata;
     console.log( this.profiles );
  });
}
async TestGender(value) {
  await this.authService.AddGender(value);
  this.genderprofile = this.authService.genders.genders;
 }
  ngOnInit() {
    this.TestGender('input');

    $(document).ready(function() {

      $('.addd').click(function() {
         $('.one').hide();
         $('.second').show();
       });
 
       $('.log').click(function() {
        $('.second').hide();
        $('.one').show();
      });
    });
  }

}

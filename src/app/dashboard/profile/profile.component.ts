import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ms-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name: any;
  email: any;
  phone: any;
  tries: any;
  id: any;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService ,
     config: NgbModalConfig,
      private modalService: NgbModal) {}


      Profile(){
    this.authService.GetProfile().
              then( getProfileResults => { 
                this.name = getProfileResults.name;
                this.email = getProfileResults.email;
                this.phone = getProfileResults.phone;
                this.id = getProfileResults._id;
                console.log( this.name );
              });
}
Update(value){
  this.authService.UpdateProfile(value).
            then( responseUpProfile => { this.tries = responseUpProfile;
            });
}  

  ngOnInit() {
    this.Profile()
  }

}

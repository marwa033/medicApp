import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../service/auth-service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
   selector: 'ms-login-session',
   templateUrl:'./login-component.html',
   styleUrls: ['./login-component.scss'],
   encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit{
   mail: string='';
   passcode: string='';
   tries: any;

  constructor( public authService: AuthService,
               private spinner: NgxSpinnerService,
               public translate : TranslateService ) { }

   // when email and password is correct, user logged in.
   login(value) {
    this.spinner.show();
      this.authService.loginUser(value).
      then( responsedata => { this.tries = responsedata;
      
         this.Profile() 
         setTimeout(() => {
            this.spinner.hide();
          },this.tries);
      });
   }

   Profile(){
      this.authService.GetProfile().
                then( getProfileResults => { getProfileResults
                  this.getRole(getProfileResults.admin.role)
                  this.getAdminId(getProfileResults.admin.userId)
                  this.getAdminName(getProfileResults.name)
                });
  }
  
  getRole(value) {
    localStorage.setItem('adminRole', JSON.stringify(value));
    var role = JSON.parse(localStorage.getItem('adminRole'));
    console.log(role)
    }
    getAdminId(value) {
      localStorage.setItem('adminId', JSON.stringify(value));
      var adminID = JSON.parse(localStorage.getItem('adminId'));
      console.log(adminID)
      }
      getAdminName(value) {
        localStorage.setItem('adminName', JSON.stringify(value));
        var adminName = JSON.parse(localStorage.getItem('adminName'));
        console.log(adminName)
        }
    ngOnInit(){
    }

    

}




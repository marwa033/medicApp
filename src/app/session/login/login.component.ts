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
export class LoginComponent {
   mail: string='';
   passcode: string='';
//   email  =  new FormControl('', [Validators.required, Validators.email]);
//   password = new FormControl('', [Validators.required, Validators.minLength(6)]);
   tries: any;

  constructor( public authService: AuthService,
               private spinner: NgxSpinnerService,
               public translate : TranslateService ) { }

   // when email and password is correct, user logged in.
   login(value) {
    this.spinner.show();
      this.authService.loginUser(value).
      then( responsedata => { this.tries = responsedata;
      
         setTimeout(() => {
            this.spinner.hide();
          },this.tries);
      });
   }


//   getErrorMessage() {
//     if (this.email.hasError('required')) {
//       return 'Please enter email';
//     }

//     return this.email.hasError('email') ? 'Not a valid email' : 'example@example.com';
//   } 
  
//   getErrorPassword() {
//    if (this.password.hasError('required')) {
//      return 'Please enter password';
//    }else{
//       return 'Not a valid password';
//    }

   // return this.password.hasError('minLength(6)') ? 'Not a valid password' : '';
//  } 
	
}




import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../service/auth-service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';
import { IfStmt } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
   // tslint:disable-next-line: component-selector
   selector: 'ms-login-session',
   templateUrl: './login-component.html',
   styleUrls: ['./login-component.scss'],
   encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {

   username: string ='';
   password: string ='';
   accountno: string ='';
      centers ;
   selectedcenter;
   public UserData: any;
  constructor( public authService: AuthService,
              private router: Router,
               public translate: TranslateService ) { }

               async Center(value) {
                  await this.authService.Branch(value);
                  this.centers = this.authService.branches.branches;
                 }
   async login(value) {
      this.UserData = null;
      await this.authService.loginUser(value);


   }

   // tslint:disable-next-line: use-life-cycle-interface
   ngOnInit() {
      this.Center('input');

      $(document).ready(function() {
         $('.log').click(function() {
         //   $('.two').show();
         //   $('.one').hide();
         });
       });
   }
   // selectedCenterandcont(value) {
   //    console.log(this.selectedcenter);
   //    this.router.navigate(['/']);
   // }
}

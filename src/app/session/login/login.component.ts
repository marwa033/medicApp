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
   systems: any;
   public UserData: any;
   labs: any;
   labname: any;
  constructor( public authService: AuthService,
              private router: Router,
               public translate: TranslateService ) { }

               async Center(value) {
                  await this.authService.Branch(value);
                  this.centers = this.authService.branches.branches;
                 }
                 async Providers(value) {
                  await this.authService.SystemProviders(value);
                  this.systems = this.authService.providers.system_Providers;
                 }
               //   async GetLab(value) {
               //    await this.authService.Lab(value);
               //    this.labs = this.authService.GetLab.labs;
               //   }
               LabOnformation(value) {

                  this.authService.GetLabInformation(value).then( LabInformationrespnse => {
                     this.labs = LabInformationrespnse.labs;
                     console.log( this.labs );
                     // this.labname = this.labs[0].name;

                  });
                  // this.labname = this.labs.name;
                }
   async login(value) {
      this.UserData = null;
      await this.authService.loginUser(value);


   }

   // tslint:disable-next-line: use-life-cycle-interface
   ngOnInit() {
      this.Center('input');
      this.Providers('input');
      this.LabOnformation('input');

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

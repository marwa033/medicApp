import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
   // tslint:disable-next-line: component-selector
   selector: 'ms-forgot-password',
   templateUrl: './forgot-passwordV2-component.html',
   styleUrls: ['./forgot-passwordV2-component.scss'],
   encapsulation: ViewEncapsulation.None,
})
export class ForgotPasswordV2Component {

   constructor() { }
}




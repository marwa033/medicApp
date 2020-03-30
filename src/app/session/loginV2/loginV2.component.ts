import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth-service/auth.service';
import { ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
   // tslint:disable-next-line: component-selector
   selector: 'ms-loginV2-session',
   templateUrl: './loginV2-component.html',
   styleUrls: ['./loginV2-component.scss'],
   // encapsulation: ViewEncapsulation.None
})
export class LoginV2Component {

   constructor( public authService: AuthService,
                public translate: TranslateService ) { }

}




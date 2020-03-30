import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../service/auth-service/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
 // tslint:disable-next-line: component-selector
 selector: 'ms-register-session',
 templateUrl: './register-component.html',
 styleUrls: ['./register-component.scss'],
 encapsulation: ViewEncapsulation.None,
})

export class RegisterComponent {

name: string;
email: string;
password: string;
passwordConfirm: string;

constructor() { }

}




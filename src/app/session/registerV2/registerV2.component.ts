import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../service/auth-service/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
// tslint:disable-next-line: component-selector
selector: 'ms-register-session',
templateUrl: './registerV2-component.html',
styleUrls: ['./registerV2-component.scss'],
encapsulation: ViewEncapsulation.None,
})
export class RegisterV2Component {

constructor( public authService: AuthService,
                public translate: TranslateService) { }

}

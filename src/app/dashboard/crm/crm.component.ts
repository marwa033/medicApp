import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth-service/auth.service';
import { PageTitleService } from '../../core/page-title/page-title.service';
import * as $ from 'jquery';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ms-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.scss']
})

export class CrmComponent implements OnInit {

   constructor(public authService: AuthService,
              private pageTitleService: PageTitleService) { }
   
   Search(value) {
      this.authService.SearchPatient(value);
   }

   ngOnInit() {
      this.pageTitleService.setTitle('CRM');

 
   }

} 

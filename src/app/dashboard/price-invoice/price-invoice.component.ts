import { Component, OnInit, Inject, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ms-price-invoice',
  templateUrl: './price-invoice.component.html',
  styleUrls: ['./price-invoice.component.scss']
})


export class PriceInvoiceComponent implements OnInit {

  public dataSource: {} = [
    {messages: '3 New', badge: 'e-badge e-badge-primary' },
    {messages: '27 New', badge: 'e-badge e-badge-secondary' },
    { messages: '10 New', badge: 'e-badge e-badge-success' },

];

// Map fields
// public fields: object = { groupBy: 'type' };

  constructor(public translate: TranslateService,
    public authService: AuthService,
    private pageTItleService : PageTitleService,
  ) {}

  
  ngOnInit() {
  
					  }

}


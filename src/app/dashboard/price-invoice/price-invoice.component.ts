import { Component, OnInit, Inject, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';



@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ms-price-invoice',
  templateUrl: './price-invoice.component.html',
  styleUrls: ['./price-invoice.component.scss']
})
export class PriceInvoiceComponent implements OnInit {
  panelOpenState = false;

  constructor(public translate: TranslateService,
    public authService: AuthService,
    private pageTItleService : PageTitleService,
  ) {}

  ngOnInit() {
					  }

}

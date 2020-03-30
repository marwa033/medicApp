import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  iso= '';
  cactive= '';
  currencyid= '';
  currencyname= '';
  currencycode= '';
  currencyactive= '';
  UserData: any;
  // currencies: any;
  public currencies: Observable<any>;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService,
   config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false; }

    addCurrency(value) {
      this.authService.AddPricingCurrency(value);
     }

     openSm(content) {
      this.modalService.open(content, { size: 'lg' });
    }

//   Currency(value) {
//     this.authService.PricingCurrency(value);

//     this.currencies = this.authService.CurrencyResult;
//     console.log( 'results is :  ' + this.currencies);
//     console.log(  this.currencies);
//  }
Currency(value) {
  if (value.iso == undefined || value.iso =='') {
  value.iso = ' ';
  }
if (value.cactive == undefined || value.cactive =='') {
  value.cactive = 2 ;
}
this.authService.SearchCurrency(value).then(
  responsecurrencydata => {this.currencies = responsecurrencydata;
   console.log( this.currencies );
});

}

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-payer',
  templateUrl: './payer.component.html',
  styleUrls: ['./payer.component.scss']
})
export class PayerComponent implements OnInit {
  pname = '';
  pactive = '';
  categories: any;
  selectedcategory
  UserData: any;
  // payers: any;
  public payers: Observable<any>;
  payerid= '';
  payername= '';
  payerpricelist= '';
  payercurrency= '';
  payerdiscount= '';
  payeractive= '';
  payercategory= '';
  payerweblogin= '';
  payerallow= '';
  payerwebpassword= '';
  payeradvanced= '';
  phone= '';
  category: any;
  ecategory: any;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService,
   config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    }
    openSm(content) {
      this.modalService.open(content, { size: 'lg' });
    }
    addPayer(value) {
      this.authService.AddPricingPayer(value);
     }

     async Category(value) {
  
      this.authService.GeneralGategory(value).then( getgategoryrsponse => {
        this.ecategory = getgategoryrsponse.clientCategoryModels;
        this.payercategory = getgategoryrsponse.clientCategoryModels;

     });
     }

     async PriceList(value) {

      this.authService.GetPriceList(value).then( getpricersponse => {
        this.payerpricelist = getpricersponse.pricelistModels;
     });
     }

Payer(value) {
  if (value.pname == undefined || value.pname =='') {
  value.pname=' ';
  }
  if (value.ecategory == undefined || value.ecategory =='') {
  value.ecategory=' ';
  }
  if (value.pactive == undefined || value.pactive =='') {
  value.pactive= '2';
  }
  this.authService.PricingPayer(value).then(
    responsepayerdata => {this.payers = responsepayerdata;
     console.log( this.payers );
  });
}
  // selectedtest(selectedtest: any) {
  //   throw new Error('Method not implemented.');
  // }

  ngOnInit() {
    this.Category('input');
    this.PriceList('input');
  }

}

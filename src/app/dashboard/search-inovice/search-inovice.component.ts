import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-search-inovice',
  templateUrl: './search-inovice.component.html',
  styleUrls: ['./search-inovice.component.scss']
})
export class SearchInoviceComponent implements OnInit {
  sfrom: string='';
  sto: string='';
  gpayer;
  selectedpayer;
  bid:string='';
  active:string='';
  UserData: any;
  public searching: Observable<any>;
  
  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService) { }

Sinvoice(value) {
  if (value.sfrom == undefined || value.sfrom == '') {
    value.sfrom = ' ';
  }
    if (value.sto == undefined || value.sto == '') {
      value.sto = ' ';
      }
   if (value.payer == undefined || value.payer == '') {
        value.payer = '0';
      }
   if (value.bid == undefined || value.bid == '') {
          value.bid = ' ';
   }
 if (value.active == undefined || value.active == '') {
   value.active = '2';
  }
  this.authService.SearchInvoice(value).then(
    responsesearchdata => {this.searching = responsesearchdata;
     console.log( this.searching );
  });
}
 async GeneratePayer(value) {
  await this.authService.GeneratePayerInvoice(value);
  this.gpayer = this.authService.clients.clients;

  console.log(this.UserData);
  this.gpayer = this.UserData.clients;
  console.log(this.gpayer);
 }

  ngOnInit() {
    this.GeneratePayer('input');
  }

}

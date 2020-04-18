import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'ms-gross-pricelist',
  templateUrl: './gross-pricelist.component.html',
  styleUrls: ['./gross-pricelist.component.scss']
})
export class GrossPricelistComponent implements OnInit {
  gname= '';
  gactive= '';
  curencypricelist= '';
  activepricelist= '';
  namepricelist= '';
  idpricelist= '';
  UserData: any;
  currencypricelist: any;
  selectedactive: any;
  selectedcurrancy: any;
  // pricelists: any;
  currenyy: any;
  public pricelists: Observable<any>;
  
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = [ 'ID' ,'Name', 'CurrencyID','Active' , 'CreateDT'];
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService,
   config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false; }

    addPricelist(value) {
      this.authService.addGrossPricelist(value);
     }

     openSm(content) {
      this.modalService.open(content, { size: 'lg' });
    }

//   Gross(value) {
//     this.authService.GrossPriseList(value);

//     this.pricelists = this.authService.PricelistResult;
//     console.log( 'results is :  ' + this.pricelists);
//     console.log(  this.pricelists);
//  }
async Currency(value) {
  // await this.authService.GetCurrency(value)
  // this.currenyy = this.authService.currency.currencyModels;
  this.authService.GetCurrency(value).then( getcurrancygetrsponse => {
    this.currencypricelist = getcurrancygetrsponse.currencyModels;
 });
 }

Gross(value) {
  if (value.gname == undefined || value.gname =='') {
  value.gname=' ';
  }
  if (value.gactive == undefined || value.gactive =='') {
  value.gactive='2';
  }

  this.authService.GrossPriseList(value).then(
    responsegrossdata => {this.pricelists = responsegrossdata;
      this.dataSource = new MatTableDataSource(responsegrossdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     console.log( this.pricelists );
  });
}
  ngOnInit() {
    this.Currency('input');
  }

}

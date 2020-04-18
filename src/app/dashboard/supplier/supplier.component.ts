import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'ms-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  supplyname= '';
  supplysactive= '';
  /// AddInputs
  currencies= '';
  supplyid= '';
  addname= '';
  supplyaddress= '';
  vat= '';
  contanctname= '';
  supplyphone= '';
  supplymail= '';
  supplypayment= '';
  supplypname= '';
  supplyactive= '';
// supplies: any;
public supplies: Observable<any>;
dataSource: MatTableDataSource<unknown>;

displayedColumns: string[] = ['ID', 'Name', 'Active', 'ContactName', 'CreateDT'];

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;

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
    AddSupply(value) {
      this.authService.AddSupplyInventry(value);
     }
 
  Supply(value) {
    if (value.supplyname == undefined || value.supplyname =='') {
    value.supplyname=' ';
    } 
    if (value.supplysactive == undefined || value.supplysactive =='') {
    value.supplysactive='2';
    } 

    this.authService.SupplierInventry(value).then(
      responsesupplydata => {this.supplies = responsesupplydata;
        this.dataSource = new MatTableDataSource(responsesupplydata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
       console.log( this.supplies );
    });
  }
   async Currancy(value) {
    // await this.authService.GetCurrancy(value);
    // this.currencies = this.authService.getcurrancy.currencyModels;
    this.authService.GetCurrancy(value).then( getcurrancyresponse => {
      this.currencies = getcurrancyresponse.currencyModels;
   });
   }

  ngOnInit() {
    this.Currancy('input');

  }

}

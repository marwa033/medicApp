import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PriceInvoiceComponent } from '../price-invoice/price-invoice.component';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import { data } from 'jquery';
// import { BsModalService, BsModalRef } from '@bit/valor-software.ngx-bootstrap.modal';



@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ms-test-category',
  templateUrl: './test-category.component.html',
  styleUrls: ['./test-category.component.scss']
})
export class TestCategoryComponent implements OnInit {
  testname: any;
  testactive: any;
  closeResult: string;
   testid: string;
   testname2: string;
   testprint: string;
   active2s: string;
  //  all: '0' '1'
arr: [0, 1];
  public categories: Observable<any>;
  dataSource: MatTableDataSource<unknown>;
displayedColumns: string[] = ['ID', 'Name', 'Active', 'CreateDT'];

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

//   Category(value) {
//     this.authService.TestCategory(value);
//     this.categories = this.authService.TestCategoryResult;
//     console.log( 'results is :  ' + this.categories);
//     console.log(  this.categories);
//  }
Category(value) {
  if (value.testname == undefined || value.testname =='') {
    value.testname='%';
  }
  if (value.testactive == undefined) {
    value.testactive='2';
  }

  this.authService.TestCategory(value).then(
    responsecategorydata => {this.categories = responsecategorydata;
      this.dataSource = new MatTableDataSource(responsecategorydata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

     console.log( this.categories );
  });
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
 addTestCategory(value) {
  this.authService.addCategory(value);
  console.log(this.testname2);
 }

  ngOnInit() {

  }

}

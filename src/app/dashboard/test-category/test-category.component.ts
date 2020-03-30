import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PriceInvoiceComponent } from '../price-invoice/price-invoice.component';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';


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
     console.log( this.categories );
  });
}

 addTestCategory(value) {
  this.authService.addCategory(value);
  console.log(this.testname2);
 }

  ngOnInit() {
    // const inputElement: HTMLInputElement = document.getElementById('i1') as HTMLInputElement
    // const name: string = inputElement.value

    // const name = (document.getElementById('i1')).value
    // const active = document.getElementById('i2');
    // if (name == "")
    // {
    //   this.testname = "%";
    // }else{
    //   this.testname = name;
    // }
  }

}

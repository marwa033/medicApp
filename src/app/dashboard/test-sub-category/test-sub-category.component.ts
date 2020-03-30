import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-test-sub-category',
  templateUrl: './test-sub-category.component.html',
  styleUrls: ['./test-sub-category.component.scss']
})
export class TestSubCategoryComponent implements OnInit {
  subname = '';
  // subcategories: any;
  subid = '';
  subname2 = '';
  subprint = '';
  suborder = '';
  public subcategories: Observable<any>;


  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService,
   config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false; }

//    Sub(value) {
//     this.authService.SubCategory(value);

//     this.subcategories = this.authService.SubCategoryResult;
//     console.log( 'results is :  ' + this.subcategories);
//     console.log(  this.subcategories);
//  }

Sub(value) {
  if (value.subname == undefined || value.subname == '') {
  value.subname = ' ';
  }
  this.authService.SubCategory(value).then(
    responsesubcategorydata => {this.subcategories = responsesubcategorydata;
     console.log( this.subcategories );
  });
}


 addSubCategory(value) {
  this.authService.addSubCategory(value);
 }

 openSm(content) {
  this.modalService.open(content, { size: 'lg' });
}

  ngOnInit() {
  }

}

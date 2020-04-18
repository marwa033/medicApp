import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

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
  dataSource: MatTableDataSource<unknown>;
displayedColumns: string[] = ['ID', 'Name', 'CreateDT'];

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService,
   config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false; }


Sub(value) {
  if (value.subname == undefined || value.subname == '') {
  value.subname = ' ';
  }
  this.authService.SubCategory(value).then(
    responsesubcategorydata => {this.subcategories = responsesubcategorydata;
      this.dataSource = new MatTableDataSource(responsesubcategorydata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

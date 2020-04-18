import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { observable, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'ms-test-methodology',
  templateUrl: './test-methodology.component.html',
  styleUrls: ['./test-methodology.component.scss']
})
export class TestMethodologyComponent implements OnInit {

  methodactive= '';
  methodname= '';
  testmid= '';
  testmname= '';
  public  methodology: Observable<any>;
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

   addMethodology(value) {
    this.authService.addTestMethodology(value);
   }

   openSm(content) {
    this.modalService.open(content, { size: 'lg' });
  }


  //  Methodology(value) {
  //    this.authService.TestMethodolgy(value);

  //    this.methodology = this.authService.MethodologyResult;
  //    console.log( 'results is :  ' + this.methodology);
  //    console.log(  this.methodology);
  //   }

  Methodology(value) {
    if (value.methodname == undefined || value.methodname == '') {
    value.methodname = ' ';
    }

    this.authService.TestMethodolgy(value).then(
      responsemethoddata => {this.methodology = responsemethoddata;
        this.dataSource = new MatTableDataSource(responsemethoddata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
       console.log( this.methodology );
    });
  }

  ngOnInit() {
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'ms-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  tname = '';
  cpt = '';
  testcategory = '';
  selectedcategory;
  tactive = '';
  testid = '';
  testcpt = '';
  testname = '';
  testprint = '';
  testshort = '';
  testfooter = '';
  testinstructor = '';
  testbar = '';
  testresult = '';
  testdisplay = '';
  testcategory2 = '';
  testactive = '';
  testrequest = '';
  testsup = '';
  testsub = '';
  testgender = '';
  testsample = '';
  testtype = '';
  testreport = '';
  testprevious = '';
  subcategory = '';
  testindtructor: any;
  selectcategory: any;
  selectsub: any;
  selectgender: any;
  selectsample: any;
  selecttype: any;
  selectreport: any;
  testpage: any;
  
  UserData: any;
  // tests: any;
  public tests: Observable<any>;
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
    addTest(value) {
      this.authService.AddTest(value);
     }
     async Category(value) {
      // await this.authService.GeneralGategory(value);
      // this.testcategory = this.authService.categories.clientCategoryModels;
      this.authService.GeneralGategory(value).then( getgategoryrsponse => {
        this.testcategory = getgategoryrsponse.clientCategoryModels;
     });
     }
     async SubCategory(value) {
      // await this.authService.TestSubCategory(value);
      // this.testsub = this.authService.subcategory.testSubCategoryModels;
      this.authService.TestSubCategory(value).then( gettestsubcategoryrsponse => {
        this.testsub = gettestsubcategoryrsponse.testSubCategoryModels;
     });
     }
     async TestGender(value) {
      this.authService.AddGender(value).then( getGenderrsponse => {
        this.testgender = getGenderrsponse.genders;
     });
     }
     async TestSample(value) {
      // await this.authService.TestSample(value);
      // this.testsample = this.authService.samples.sampleTypeModels;
      this.authService.TestSample(value).then( gettestsamplersponse => {
        this.testsample = gettestsamplersponse.sampleTypeModels;
     });
     }
     async resultReport(value) {
      // await this.authService.ResultReport(value);
      // this.testreport = this.authService.result.resultReports;
      this.authService.ResultReport(value).then( getresultreportrsponse => {
        this.testreport = getresultreportrsponse.resultReports;
     });
     }


Test(value) {
  if (value.tname == undefined || value.tname == '') {
  value.tname = '%';
  }
if (value.cpt == undefined || value.cpt == '') {
  value.cpt = '%';
}
  if (value.testcategory == undefined || value.testcategory == '') {
  value.testcategory = '0';
  }
if (value.tactive == undefined || value.tactive == '') {
  value.tactive = '2';
}

  this.authService.ConfigTest(value).then(
    responsetestdata => {this.tests = responsetestdata;
      this.dataSource = new MatTableDataSource(responsetestdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     console.log( this.tests );
  });
}

  ngOnInit() {
    this.Category('input');
    this.SubCategory('input');
    this.TestGender('input');
    this.TestSample('input');
    this.resultReport('input');

    $(document).ready(function() {

      $('.addd').click(function() {
         $('.one').hide();
         $('.second').show();
       });
 
       $('.log').click(function() {
        $('.second').hide();
        $('.one').show();
      });
    });
  }

}

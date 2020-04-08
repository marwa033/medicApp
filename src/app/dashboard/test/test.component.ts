import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

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
      await this.authService.GeneralGategory(value);
      this.testcategory = this.authService.categories.clientCategoryModels;
     }
     async SubCategory(value) {
      await this.authService.TestSubCategory(value);
      this.testsub = this.authService.subcategory.testSubCategoryModels;
     }
     async TestGender(value) {
      await this.authService.AddGender(value);
      this.testgender = this.authService.genders.genders;
     }
     async TestSample(value) {
      await this.authService.TestSample(value);
      this.testsample = this.authService.samples.sampleTypeModels;
     }
     async resultReport(value) {
      await this.authService.ResultReport(value);
      this.testreport = this.authService.result.resultReports;
     }
//    Test(value) {
//     this.authService.ConfigTest(value);
//     this.tests = this.authService.TestResult;
//     console.log( 'results is :  ' + this.tests);
//     console.log(  this.tests);
//  }

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

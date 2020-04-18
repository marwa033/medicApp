import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'ms-result-field',
  templateUrl: './result-field.component.html',
  styleUrls: ['./result-field.component.scss']
})
export class ResultFieldComponent implements OnInit {

  rname= '';
  // fresults: any;
  public fresults: Observable<any>;
  testgender: any;
  centers: any;
  addid: any;
  addname: any;
  printas: any;
  addtype: any;
  addunit: any;
  precision: any;
  default: any;
  selectreport: any;
  testreport: any;
  resultgender: any;
  resultbranch: any;
  minage: any;
  maxage: any;
  addlow: any;
  addhigh: any;
  addprintas: any;
  openDialog: any;

  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['Name', 'ID'];
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService) { }

   async TestGender(value) {
    this.authService.AddGender(value).then( getGenderrsponse => {
      this.testgender = getGenderrsponse.genders;
   });
   }
   async Center(value) {
    // await this.authService.Branch(value);
    // this.centers = this.authService.branches.branches;
    this.authService.Branch(value).then( getbranchrsponse => {
      this.centers = getbranchrsponse.branches;
   });
   }
   async resultReport(value) {
    // await this.authService.ResultReport(value);
    // this.testreport = this.authService.result.resultReports;
    this.authService.ResultReport(value).then( getresultreportrsponse => {
      this.testreport = getresultreportrsponse.resultReports;
   });
   }
Result(value) {
  if (value.rname == undefined || value.rname =='') {
  value.rname = ' ';
  }

  this.authService.ResultField(value).then(
    responseresultdata => {this.fresults = responseresultdata;
      this.dataSource = new MatTableDataSource(responseresultdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     console.log( this.fresults );
  });
}
  ngOnInit() {
    this.TestGender('input');
    this.Center('input');
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

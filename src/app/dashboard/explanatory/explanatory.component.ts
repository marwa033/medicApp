import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { ToolbarService } from '@syncfusion/ej2-angular-documenteditor';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';


@Component({
  selector: 'ms-explanatory',
  templateUrl: './explanatory.component.html',
  styleUrls: ['./explanatory.component.scss'],
  providers: [ToolbarService]
})
export class ExplanatoryComponent implements OnInit {
  public serviceLink: string;

  
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = [ 'VisitId' ,'SampleId', 'Name','Progress'];
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  efrom = '';
  eto = '';
  ecenter;
  selectedcenter;
  ewcenter;
  selectedwcenter
  ecategory;
  selectedcategory
  etest;
  selectedtest;
  eminstatus = '';
  emaxstatus = '';
  clinic;
  selectedclient
  epriority;
  selectedpriority;
  evisitid = '';
  esampleid = '';
  UserData: any;
  Explanatory: any;
  visit: any;
  pname: any;
  category: any;
  selectedeminstatus: any;
  selectedemaxstatus: any;
  selecttest: any;
///////////
  // insertParagraph: any;
  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService) { }
  
   async Center(value) {
    this.authService.CenterCollection(value).then( getcenterrsponse => {
      this.ecenter = getcenterrsponse.centers;
   });
   }


   async WorkCenter(value) {

    this.authService.GeneralWCenter(value).then( getWcenterrsponse => {
      this.ewcenter = getWcenterrsponse.workCenteres;
   });
   }

   async Test(value) {

    this.authService.GeneralTest(value).then( gettestrsponse => {
      this.etest = gettestrsponse.testModels;
   });
   }
   async GenerateClinic(value) {
    await this.authService.GenerateClinicInvoice(value);
    this.clinic = this.authService.clinic.ClinicList;
  
 
  //   this.authService.GenerateClinicInvoice(value).then( getclinicrsponse => {
  //     this.clinic = getclinicrsponse.ClinicList;
  //  });
   }
   async Priority(value) {
   
    this.authService.GeneralPriority(value).then( getpriorityrsponse => {
      this.epriority = getpriorityrsponse.priorities;
   });
   }
   async Category(value) {

    this.authService.GeneralGategory(value).then( getgategoryrsponse => {
      this.ecategory = getgategoryrsponse.clientCategoryModels;
   });
   }
   async Minstatus(value) {

    this.authService.MinimumStatus(value).then( getminstatusrsponse => {
      this.eminstatus = getminstatusrsponse.testStatuses;
   });
   }
   async Maxstatus(value) {

    this.authService.MaximumStatus(value).then( getmaxstatusrsponse => {
      this.emaxstatus = getmaxstatusrsponse.testStatuses;
   });
   }
   Explan(value) {
    if (value.efrom == undefined || value.efrom == '') {
    value.efrom = ' ';
    }

    if (value.eto == undefined || value.eto == '') {
    value.eto = ' ';
    }

    if (value.ecenter == undefined || value.ecenter == '') {
    value.ecenter = '0';
    }

    if (value.ewcenter == undefined || value.ewcenter == '') {
    value.ewcenter = " " ;
    }

    if (value.ecategory == undefined || value.ecategory == '') {
    value.ecategory ='0';
    }

    if (value.etest == undefined || value.etest == '') {
    value.etest ='0';
    }

    if (value.eminstatus == undefined || value.eminstatus == '') {
    value.eminstatus = '0';
    }

    if (value.emaxstatus == undefined || value.emaxstatus == '') {
    value.emaxstatus = '0';
    }

    if (value.clinic == undefined || value.clinic == '') {
    value.clinic ='0';
    }

    if (value.epriority == undefined || value.epriority == '') {
    value.epriority ='0';
    }

    if (value.evisitid == undefined || value.evisitid == '') {
    value.evisitid = " " ;
    }

    if (value.esampleid == undefined || value.esampleid == '') {
    value.esampleid = '0';
    }
    this.authService.Explanatory(value).then(
      responseexplandata => {this.Explanatory = responseexplandata;
        this.dataSource = new MatTableDataSource(responseexplandata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
       console.log( this.Explanatory );
    });
  }
  selectedRow(item) {
    this.visit = item.VisitId;
    this.pname = item.Name;

  }

//    Explan(value) {
//     this.authService.Explanatory(value);

//     this.Explanatory = this.authService.bacteriology;
//     console.log( 'results is :  ' + this.Explanatory);
//     console.log(  this.Explanatory);
//  }


  ngOnInit() {

     // Service URL is required for opening word documents in DocumentEditor
    // Documentation link: https://ej2.syncfusion.com/angular/documentation/document-editor/import/?no-cache=1#convert-word-documents-into-sfdt
    this.serviceLink = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/';

    this.Test('input');
    this.Center('input');
    this.WorkCenter('input');
    this.GenerateClinic('input');
    this.Priority('input');
    this.Priority('input');
    this.Category('input');
    this.Minstatus('input');
    this.Maxstatus('input');

    $(document).ready(function() {
      $('.down').click(function() {
        $('.right').show();
        $('.down').hide();
        $('.sample').hide();
      });
      $('.right').click(function() {
        $('.down').show();
        $('.right').hide();
        $('.sample').show();
      });
    });

  }

}

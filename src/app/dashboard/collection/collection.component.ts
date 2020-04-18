import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'ms-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  center2: any;
  selectedcenter;
  forder: string='';
  torder: string='';
  status;
  selectedstatus;
  patient:string='';
  visite:string='';
  sample:string='';
  name: string='';
  mrn: string='';
  UserData: any;
  detials: any;
  public collections: Observable<any>;

  dataSource: MatTableDataSource<unknown>;

  displayedColumns: string[] = [ 'VisitId' , 'date', 'DOB', 'gender_Name' , 'outSideCollectionDT'];

  data: MatTableDataSource<unknown>;

  displayedColumn: string[] = [ 'SampleID', 'TestName' , 'Category', 'ProcCenter', 'ResultDate' , 'StatusName'];


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService) { }

   async Center(value) {
    this.authService.CenterCollection(value).then( getcenterrsponse => {
      this.center2 = getcenterrsponse.centers;
   });
   }
   
   async Status(value) {
    this.authService.GetStatus(value).then( getgetstatusrsponse => {
      this.status = getgetstatusrsponse.testStatuses;
   });
   }


Collection(value) {
  if (value.forder == undefined || value.forder =='') {
    value.forder =' ';
    } 
  
    if (value.torder == undefined || value.torder =='') {
    value.torder = " ";
    } 
  
    if (value.center2 == undefined || value.center2 =='') {
    value.center2= '0';
    }
  
    if (value.status == undefined || value.status =='') {
    value.status='0';
    }
  
    if (value.patient == undefined || value.patient =='') {
    value.patient="0";
    }
  
    if (value.visite == undefined || value.visite =='') {
    value.visite = "0";
    }
  
    if (value.sample == undefined || value.sample =='') {
    value.sample ='0';
    } 
  
    if (value.name == undefined || value.name =='') {
    value.name = " ";
    }
  
    if (value.mrn == undefined || value.mrn =='') {
    value.mrn =" ";
    }
  this.authService.SampleCollection(value).then(
      responsecollectiondata => {this.collections = responsecollectiondata;
        this.dataSource = new MatTableDataSource(responsecollectiondata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
     console.log( this.collections );
  });
}

async OrderDetials(value) {
  
}

async cellClicked(element) {
  console.log(element.VisitId + ' cell clicked');
  var obj = await this.authService.CollectionDetials(element).then(
    responsecollectiondetialsdata => {this.detials = responsecollectiondetialsdata;
      this.data = new MatTableDataSource(responsecollectiondetialsdata);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
   console.log( this.detials );
  });
}
    //  var item = await this.authService.CollectionDetials(value);
    // // this.detials = this.authService.detialsResult.loadVisitTests;


  ngOnInit() {
    this.Status('input');
    this.Center('input');
    // this.OrderDetials('input');
  }

}

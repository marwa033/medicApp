import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'ms-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
 
  containername= '';
  idcontainer= '';
  namecontainer= '';
  capcontainer= '';
  subname: any;
  testname: any;
  // containers: any;
  public  containers: Observable<any>;
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = [ 'ID' ,'Name', 'CAPcolor', 'CreateDT'];
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService,
   config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false; }

    addContainer(value) {
      this.authService.addTestContainer(value);
     }

     openSm(content) {
      this.modalService.open(content, { size: 'lg' });
    }

//    Container(value) {
//    this.authService.TestContainer(value);

//    this.containers = this.authService.ContainerResult;
//    console.log( 'results is :  ' + this.containers);
//    console.log(  this.containers);
//  }
Container(value) {
  if (value.containername == undefined || value.containername =='') {
  value.containername='';
  }
  this.authService.TestContainer(value).then(
    responsecontainerdata => {this.containers = responsecontainerdata;
      this.dataSource = new MatTableDataSource(responsecontainerdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     console.log( this.containers );
  });
}
  ngOnInit() {
  }

}

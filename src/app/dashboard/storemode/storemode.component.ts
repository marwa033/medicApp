import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'ms-storemode',
  templateUrl: './storemode.component.html',
  styleUrls: ['./storemode.component.scss']
})
export class StoremodeComponent implements OnInit {
  // stores: any;
  modename= '';
  modeactive= '';
  storeid= '';
  storename= '';
  storeactive= '';
  public stores: Observable<any>;
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

Store(value) {
  if (value.modename == undefined || value.modename =='') {
  value.modename=' ';
  } 
  if (value.modeactive == undefined || value.modeactive =='') {
  value.modeactive='2';
  } 

  this.authService.StoreMode(value).then(
    responsestoredata => {this.stores = responsestoredata;
      this.dataSource = new MatTableDataSource(responsestoredata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     console.log( this.stores );
  });
}
 addStore(value) {
  this.authService.addStoreMode(value);
 }

  ngOnInit() {

  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'ms-client-category',
  templateUrl: './client-category.component.html',
  styleUrls: ['./client-category.component.scss']
})
export class ClientCategoryComponent implements OnInit {

  name: string='';
  clientid: string='';
  clientname: string='';
  clientactive: string='';
  // categories: any;
  public categories: Observable<any>;

  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = [ 'ID' , 'Name', 'Active' , 'CreateDT'];
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService,
   config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false; }

    addClient(value) {
      this.authService.addclientCategory(value);
     }
    
     openSm(content) {
      this.modalService.open(content, { size: 'lg' });
    } 

   
//   Client(value) {
//    this.authService.ClientCategory(value);

//    this.categories = this.authService.ClientCategoryResult;
//    console.log( 'results is :  ' + this.categories);
//    console.log(  this.categories);
//  }

Client(value) {
  if(value.name==undefined|| value.name=="")
  value.name=' ';

  this.authService.ClientCategory(value).then(
    responseclientdata => {this.categories = responseclientdata;
      this.dataSource = new MatTableDataSource(responseclientdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     console.log( this.categories );
  });
}

  ngOnInit() {
  }

}

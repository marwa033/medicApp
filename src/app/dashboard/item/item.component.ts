import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'ms-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  // items: any;
nameitem: string='';
activeitem: string='';
public items: Observable<any>;
  supplier: any;

  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = [ 'ID' ,'Name', 'ReferenceNo', 'Price' , 'PackSize' , 'Active' , 'CreateDT'];
  
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
    AddItem(value) {
      this.authService.AddItemInventry(value);
     }
  //   Item(value) {
  //     this.authService.InventryItem(value);
  
  //     this.items = this.authService.itemresult;
  //     console.log( 'results is :  ' + this.items);
  //     console.log(  this.items);
  //  }
Item(value){
  if (value.nameitem == undefined || value.nameitem =='') {
    value.nameitem =' ';
    } 
    if (value.activeitem == undefined || value.activeitem =='') {
      value.activeitem = '2';
      } 
        this.authService.InventryItem(value).then(
          responseitemdata => {this.items = responseitemdata;
            this.dataSource = new MatTableDataSource(responseitemdata);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
           console.log( this.items );
          });
}
async Supplier(value) {
  // await this.authService.PurchaseSupply(value);
  // this.supplier = this.authService.SupplyOrder.supplieres;
  this.authService.PurchaseSupply(value).then( getsupplyorderrsponse => {
    this.supplier = getsupplyorderrsponse.supplieres;
 });
 }
  ngOnInit() {
    this.Supplier('input');

  }

}

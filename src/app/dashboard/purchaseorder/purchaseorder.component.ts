import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ms-purchaseorder',
  templateUrl: './purchaseorder.component.html',
  styleUrls: ['./purchaseorder.component.scss']
})
export class PurchaseorderComponent implements OnInit {
  orders: any;
  purchases: any;
  supplier: any;
  additem: any;
  from: any;
  to: any;
  selectedsupplier: any;
  status: any;
  poid: any;
  

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService,
   config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false; }
    openSm(content) {
      this.modalService.open(content, { size: 'lg' });
    } 
    async Supplier(value) {
      await this.authService.PurchaseSupply(value);
      this.supplier = this.authService.SupplyOrder.supplieres;
     }

     async Item(value) {
      await this.authService.PurchaseItem(value);
      this.additem = this.authService.ItemOrder.inventory_Items;
     }

    Order(value) {
      if (value.from == undefined || value.from == '') {
        value.from = ' ';
        }
        if (value.to == undefined || value.to == '') {
        value.to = ' ';
        }
        if (value.supplier == undefined || value.supplier == '') {
          value.supplier = '0';
          }
          if (value.status == undefined || value.status == '') {
          value.status = '0';
          }
          if (value.poid == undefined || value.poid == '') {
            value.poid = '0';
            }
            
      // this.authService.PurchaseOrder(value);
  
      // this.orders = this.authService.purchaseorder;
      // console.log( 'results is :  ' + this.orders);
      // console.log(  this.orders);
      this.authService.PurchaseOrder(value).then(
        responsepayerdata => {this.orders = responsepayerdata;
         console.log( this.orders );
      });
   }
   AddOrder(value) {
    this.authService.AddPurchaseOrder(value);

    this.purchases = this.authService.addpurchaseorder;
    console.log( 'results is :  ' + this.purchases);
    console.log(  this.purchases);
 }

  ngOnInit() {
    this.Supplier('input');
    this.Item('input');
  }

}

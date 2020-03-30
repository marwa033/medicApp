import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

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
           console.log( this.items );
          });
}
  ngOnInit() {
  }

}

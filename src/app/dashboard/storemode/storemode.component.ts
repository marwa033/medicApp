import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

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
     console.log( this.stores );
  });
}
 addStore(value) {
  this.authService.addStoreMode(value);
 }

  ngOnInit() {

  }

}

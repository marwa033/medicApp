import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-uom',
  templateUrl: './uom.component.html',
  styleUrls: ['./uom.component.scss']
})
export class UomComponent implements OnInit {
  // tries: any;
  public tries: Observable<any>;

  uname = '';
  uactive = '';
  addid = '';
  addname = '';
  addactive = '';

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

//   UOM(value) {
//     this.authService.InventryUOM(value);
//     this.tries = this.authService.uomresult;
//     console.log( 'results is :  ' + this.tries);
//     console.log(  this.tries);
//  }
UOM(value) {
  if (value.uname == undefined || value.uname == '') {
  value.uname = ' ';
  }
  if (value.uactive == undefined || value.uactive == '') {
  value.uactive = '2';
  }

  this.authService.InventryUOM(value).then(
    responseuomdata => {this.tries = responseuomdata;
     console.log( this.tries );
  });
}
 AddUOM(value) {
  this.authService.AddUOMInventry(value);
 }

  ngOnInit() {
  }

}

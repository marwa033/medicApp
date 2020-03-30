import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

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
     console.log( this.categories );
  });
}

  ngOnInit() {
  }

}

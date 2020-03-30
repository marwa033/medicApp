import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.scss']
})
export class PriorityComponent implements OnInit {

  name = '';
  // priorities: any;
  priorityid = '';
  priorityname = '';
  public priorities: Observable<any>;

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
    addPriority(value) {
      this.authService.addReferralPriority(value);
     }

//    Priority(value) {
//      this.authService.ReferralPriority(value);

//      this.priorities = this.authService.PriorityResult;
//      console.log( 'results is :  ' + this.priorities);
//      console.log(  this.priorities);
// }
Priority(value) {
  if (value.name == undefined || value.name =='') {
  value.name=' ';
  } 

  this.authService.ReferralPriority(value).then(
    responseprioritydata => {this.priorities = responseprioritydata ;
     console.log( this.priorities );
  });
}

  ngOnInit() {
  }

}

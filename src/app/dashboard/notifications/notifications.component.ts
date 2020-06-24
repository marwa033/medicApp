import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ms-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  tries: any;
  nTitle: any;
  type: any;
  nBody: any; 
  constructor(public translate: TranslateService,
    public authService: AuthService,
    private spinner: NgxSpinnerService,
   private pageTitleService: PageTitleService ,
     config: NgbModalConfig,
      private modalService: NgbModal) {}

  notification(value){
    this.spinner.show();
    this.authService.sendNotification(value).
              then( sendNotificationResult => { this.tries = sendNotificationResult;
                setTimeout(() => {
                  this.spinner.hide();
                }, this.tries);
              });
  }  
  ngOnInit() {
  }

}

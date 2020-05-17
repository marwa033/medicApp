import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ms-update-subscription',
  templateUrl: './update-subscription.component.html',
  styleUrls: ['./update-subscription.component.scss']
})
export class UpdateSubscriptionComponent implements OnInit {
  tries: any;
  id: any;
  doctorid: any;
  startDate: Date;
  endDate: any;
  selectedstartDate: any;
  selectedendDate: any;


  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService ,
     config: NgbModalConfig,
     private route: ActivatedRoute,
      private modalService: NgbModal) {
    }

    Update(value){
      this.authService.UpdateSubscription(value).
                then( responseupDistrictdata => { this.tries = responseupDistrictdata;
                });
    }  

  ngOnInit() {
  this.route.params.subscribe(params =>{
  this.id = params.id;
  this.doctorid = params.vendorId;
  this.startDate = new Date (params.startDate);
  this.endDate = new Date (params.endDate);

});
  }

}

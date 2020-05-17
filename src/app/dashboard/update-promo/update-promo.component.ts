import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ms-update-promo',
  templateUrl: './update-promo.component.html',
  styleUrls: ['./update-promo.component.scss']
})
export class UpdatePromoComponent implements OnInit {

  id: string;
  tries: any;
  editCode: any;
  editDate: any;
  editDays: any;
  editUsers: any;
  editAmount: any;


  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService ,
     config: NgbModalConfig,
     private route: ActivatedRoute,
      private modalService: NgbModal) {
    }

    Update(value){
      this.authService.UpdatePromo(value).
                then( responseupPromo => { this.tries = responseupPromo;
                  console.log(this.tries);
                });
    }  
  ngOnInit() {
this.route.params.subscribe(params =>{
  this.id = params.id;
  this.editCode = params.code;
  this.editDate = new Date (params.startDate);
  this.editDays = params.day;
  this.editUsers = params.max;
  this.editAmount = params.amount;
});
  }

}

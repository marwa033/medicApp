import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-promo',
  templateUrl: './add-promo.component.html',
  styleUrls: ['./add-promo.component.scss']
})
export class AddPromoComponent implements OnInit {

  tries: any;
  code: string='';
  Code: string='';
  Date: string='';
  Period: string='';
  Users: string='';
  Amount: string='';
  doctors: any;
  selectedDoctor: any;
   //today's date
todayDate:Date = new Date();

  constructor(public translate: TranslateService,
    private spinner: NgxSpinnerService,
    public authService: AuthService,
   private pageTitleService: PageTitleService ,
     config: NgbModalConfig,
      private modalService: NgbModal) {}
 
      Doctor(){
        this.authService.GetDoctor().
                  then( responsegetDoctor => { this.doctors = responsegetDoctor.data;
                  });
      }
      Add(value){
        console.log(this.selectedDoctor)
        let doc = this.selectedDoctor
        this.spinner.show();
        this.authService.AddPromo(value , doc).
                  then( responseAddPromo => { this.tries = responseAddPromo;
                  });
                  setTimeout(() => {
                    this.spinner.hide();
                  }, this.tries);
      }  
  ngOnInit() {
    this.Doctor()
  }

}

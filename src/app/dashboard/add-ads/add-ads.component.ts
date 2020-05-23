import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ms-add-ads',
  templateUrl: './add-ads.component.html',
  styleUrls: ['./add-ads.component.scss']
})
export class AddAdsComponent implements OnInit {
  tries: any;
  doctors: any;
  ETitle: string = '';
  ATitle: string = '';
  selectedDoctor: string= '';
  image : string= '' ;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService ,
     config: NgbModalConfig,
      private modalService: NgbModal) {}
      
  Add(value){
    this.authService.AddAds(value).
              then( responseAdsresult => { this.tries = responseAdsresult;
              });
  } 
  Doctor(){
    this.authService.GetDoctor().
              then( responsegetDoctor => { this.doctors = responsegetDoctor.data;
                console.log('doctor grt ' + this.doctors);
              });
  } 
  ngOnInit() {
    this.Doctor();
  }

}

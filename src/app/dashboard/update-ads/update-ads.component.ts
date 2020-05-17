import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ms-update-ads',
  templateUrl: './update-ads.component.html',
  styleUrls: ['./update-ads.component.scss']
})
export class UpdateAdsComponent implements OnInit {
  tries: any;
  id: any;
  doctorId: any;
  editETitle: any;


  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService ,
     config: NgbModalConfig,
     private route: ActivatedRoute,
      private modalService: NgbModal) {
    }

    Update(value){
      this.authService.UpdateAds(value).
                then( responseUpAds => { this.tries = responseUpAds;
                });
    }  
    
  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.id = params.id;      
      this.editETitle = params.title;
      this.doctorId = params.vendorid;
    });
  }

}

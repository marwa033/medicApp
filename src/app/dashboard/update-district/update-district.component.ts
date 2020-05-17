import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ms-update-district',
  templateUrl: './update-district.component.html',
  styleUrls: ['./update-district.component.scss']
})
export class UpdateDistrictComponent implements OnInit {

  id: string;
  tries: any;
  editEName: any;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService ,
     config: NgbModalConfig,
     private route: ActivatedRoute,
      private modalService: NgbModal) {
    }

    Update(value){
      this.authService.UpdateDistrict(value).
                then( responseupDistrictdata => { this.tries = responseupDistrictdata;
                });
    }  

  ngOnInit() {
this.route.params.subscribe(params =>{
  this.id = params.id;
  this.editEName = params.name;

});
  }

}

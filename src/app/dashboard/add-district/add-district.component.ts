import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ms-add-district',
  templateUrl: './add-district.component.html',
  styleUrls: ['./add-district.component.scss']
})
export class AddDistrictComponent implements OnInit {
Ename: string='';
Aname: string='';
  tries: any;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService ,
     config: NgbModalConfig,
      private modalService: NgbModal) {}

      Add(value){
        this.authService.AddDistrict(value).
                  then( getAddDistrict => { this.tries = getAddDistrict;
                  });
      }  
  ngOnInit() {
  }

}

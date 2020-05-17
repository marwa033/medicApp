import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ms-update-admins',
  templateUrl: './update-admins.component.html',
  styleUrls: ['./update-admins.component.scss']
})
export class UpdateAdminsComponent implements OnInit {

  id: string;
  tries: any;
  editName: any;
  editEmail: any;
  editPhone: any;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService ,
     config: NgbModalConfig,
     private route: ActivatedRoute,
      private modalService: NgbModal) {
    }

    Update(value){
      this.authService.UpdateAdmins(value).
                then( responseUpAdmins => { this.tries = responseUpAdmins;
                });
    }  
    
  ngOnInit() {
this.route.params.subscribe(params =>{
  this.id = params.id;
  this.editName = params.name;
  this.editEmail = params.email;
  this.editPhone = params.phone;
});
  }

}

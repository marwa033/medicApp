import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  tries: any;
  name: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  selectedRole:  string='';
  roles = JSON.parse(localStorage.getItem('adminRole'));

  constructor(public translate: TranslateService,
    public authService: AuthService,
    private spinner: NgxSpinnerService,
   private pageTitleService: PageTitleService ,
     config: NgbModalConfig,
      private modalService: NgbModal) {}
      
  Add(value){
    this.spinner.show();
    this.authService.AddAdmin(value).
              then( responseAdmin => { this.tries = responseAdmin;
                setTimeout(() => {
                  this.spinner.hide();
                }, this.tries);
              });
  }  
  ngOnInit() {
  }

}

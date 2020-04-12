import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {

  rcname = '';
  rcactive = '';
  // clinics;
  clinicspeciality= '';
  clinicname= '';
  clinicincharge= '';
  clinicfax= '';
  clinicemail= '';
  clinicphone= '';
  clinicaddress= '';
  clinicactive2= '';
  clinicweblogin= '';
  clinicwebpassword= '';
  clinicid= '';
  phone= '';
  clinicpriority: any;
  public clinics: Observable<any>;


  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService,
   config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    }
    openSm(content) {
      this.modalService.open(content, { size: 'lg' });
    }
    addClinic(value) {
      this.authService.AddReferralClinic(value);
     }
     async ClinicPriority(value) {
      // await this.authService.GetClinicPriority(value);
      // this.clinicpriority = this.authService.Cpriority.priorities;
      this.authService.GeneralPriority(value).then( getpriorityrsponse => {
        this.clinicpriority = getpriorityrsponse.priorities;
     });
     }
     async ClinicSpeciality(value) {
      // await this.authService.GetClinicSpeciality(value);
      // this.clinicspeciality = this.authService.Cspeciality.specialities;
      this.authService.GetClinicSpeciality(value).then( getclinicspecrsponse => {
        this.clinicspeciality = getclinicspecrsponse.specialities;
     });
     }


Clinic(value) {
  if (value.rcname == undefined || value.rcname =='') {
  value.rcname=' ';
  } 
  if (value.active == undefined || value.active =='') {
  value.active='2';
  } 
  this.authService.ReferralClinic(value).then(
    responseclinicdata => {this.clinics = responseclinicdata;
     console.log( this.clinics );
  });
}
  ngOnInit() {
    this.ClinicPriority('input');
    this.ClinicSpeciality('input');

  }

}

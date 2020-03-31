import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  rdname = '';
  rdactive = '';
  doctorspeciality= '';
  firstname= '';
  middlename= '';
  lastname= '';
  fax= '';
  email= '';
  address= '';
  doctoractive= '';
  weblogin= '';
  webpassword= '';
  doctorid= '';
  phone= '';
  // doctors: any;
  public doctors: Observable<any>;

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
    addDoctor(value) {
      this.authService.AddReferralDoctor(value);
     }
     async ClinicSpeciality(value) {
      await this.authService.GetClinicSpeciality(value);
      this.doctorspeciality = this.authService.Cspeciality.specialities;
     }

//    Doctor(value) {
//      this.authService.ReferralDoctor(value);

//      this.doctors = this.authService.DoctorResult;
//      console.log( 'results is :  ' + this.doctors);
//      console.log(  this.doctors);
// }
Doctor(value) {
  if (value.rdname == undefined || value.rdname =='') {
  value.rdname = ' ';
  }
  if (value.rdactive == undefined || value.rdactive =='') {
  value.rdactive = '2';
  }

  this.authService.ReferralDoctor(value).then(
    responsedoctordata => {this.doctors = responsedoctordata;
     console.log( this.doctors );
  });
}
  ngOnInit() {
    this.ClinicSpeciality('input');

  }

}
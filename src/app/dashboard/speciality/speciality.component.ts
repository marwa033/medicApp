import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss']
})
export class SpecialityComponent implements OnInit {

  rsname = '';
  idss = '';
  namess = '';
  // specialities: any;
  public specialities: Observable<any>;

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
    addSpeciality(value) {
      this.authService.addReferralSpeciality(value);
     }

//    Speciality(value) {
//      this.authService.ReferralSpeciality(value);
//      this.specialities = this.authService.SpecialityResult;
//      console.log( 'results is :  ' + this.specialities);
//      console.log(  this.specialities);
// }
Speciality(value) {
  if (value.name == undefined || value.name =='') {
  value.name=' ';
  } 

  this.authService.ReferralSpeciality(value).then(
    responsespecialitydata => {this.specialities = responsespecialitydata;
     console.log( this.specialities );
  });
}
  ngOnInit() {
  }

}
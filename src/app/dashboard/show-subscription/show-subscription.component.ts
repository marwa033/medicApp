import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-show-subscription',
  templateUrl: './show-subscription.component.html',
  styleUrls: ['./show-subscription.component.scss']
})
export class ShowSubscriptionComponent implements OnInit {
  
  x = JSON.parse(localStorage.getItem('editDoctor'));
  image : string='';
  name: string='';
  bio: string='';
  address : string='';
  title: string='';
  logo : string='';
  price : string='';
  district : string='';
  booking : string='';
  work: any;
  ABio: any;
  AName: any;
  ATitle: any;
  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService ,
   private toastr: ToastrService,
     config: NgbModalConfig,
     private spinner: NgxSpinnerService,
      private modalService: NgbModal) {
       config.backdrop = 'static';
       config.keyboard = false;
    }  
    // Detials(){
//       this.authService.GetIDDoctor().
// then( responseDoctorID => { this.x = responseDoctorID;
//   console.log(this.x)

//   this.name = this.x.name.en
//   this.AName = this.x.name.ar
//   this.title =this.x.title.en
//   this.bio = this.x.bio.en
//   this.address =this.x.address.en
//   this.ATitle =this.x.title.ar
//   this.ABio = this.x.bio.ar
//   // this.AAddress =this.x.address.ar
//   this.price = this.x.price
//   // this.lat = this.x.lat
//   // this.lang = this.x.lng
//   // this.time = this.x.estimateTime
//   // this.selectedCategory = this.x.categoryId
//   this.district = this.x.district.name.en
//   // this.cphone = this.x.clinicPhones
//   this.image = this.x.image
//   this.logo = this.x.logo
//   // this.name = this.x.user.name
//   // this.phone = this.x.user.phone
//   this.work = this.x.workingHours
//   this.booking = this.x.numberOfBookingDays
//   // this.id = this.x._id
//   // this.startDate = new Date(this.x.subscription.startDate)
//   // this.endDate = new Date(this.x.subscription.endDate)
//   // this.subID = this.x.subscription._id
//   setTimeout(() => {
//     this.spinner.hide();
//   }, this.x);
// });
// }
  ngOnInit() {   
    // this.Detials();
    this.spinner.show();
  }

}
 
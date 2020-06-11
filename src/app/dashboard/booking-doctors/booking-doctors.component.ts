import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-booking-doctors',
  templateUrl: './booking-doctors.component.html',
  styleUrls: ['./booking-doctors.component.scss']
})
export class BookingDoctorsComponent implements OnInit {
  x : any;
  EName: any;
  ETitle: any;
  EBio: any;
  EAddress: any;
  price: any;
  lat: any;
  lang: any;
  time: any;
  selectedCategory: any;
  selecteddistricts: any;
  categories: any;
  districts: any;
  cphone: any;
  imageSrc: any;
  imageSrcLogo: any;
  name: any;
  phone: any;
  day: any;
  from: any;
  to: any;
  max: any;
  booking: any;
  selectedFeatures: any=[];
  tries: any;
  id: any;
  try: any;
  AName: any;
  ATitle: any;
  ABio: any;
  AAddress: any;
  endDate: any;
  startDate: any;
  subID: any;
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

    onAdd() {
      this.selectedFeatures.push({day:this.day , from:this.from , to:this.to , max:this.max});
      
      this.modalService.dismissAll(); 
      this.UpdateWork(this.selectedFeatures);
    }
    onRemove(element){
      console.log(element);
      this.selectedFeatures.pop(element);
    }
    UpdateWork(value) {
      localStorage.setItem('upwork', JSON.stringify(value));
      var upwork = JSON.parse(localStorage.getItem('upwork'));
      console.log(upwork)    
    }
    handleInputChange(e) {
      var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      }
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
    _handleReaderLoaded(e) {
      let reader = e.target;
      this.imageSrc = reader.result;
      console.log(this.imageSrc)
    }
  
    handleInput(e) {
      var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      }
      reader.onload = this._handleReaderLoadedlogo.bind(this);
      reader.readAsDataURL(file);
    }
    _handleReaderLoadedlogo(e) {
      let reader = e.target;
      this.imageSrcLogo = reader.result;
      console.log(this.imageSrcLogo)
    }
  
    openLg(content) {
      this.modalService.open(content, { size: 'lg' });
    }

    Category(){
      this.authService.GetCategories().
                then( responsedata => { this.categories = responsedata.data;
                });
    } 

    District(){
      this.authService.GetDistrict().
                then( responsedistrictdata => { this.districts = responsedistrictdata.data;
                });
    }
    Update(value){   
      this.authService.UpdateDoctor(value).
                then( getUpdateDoctor => { this.tries = getUpdateDoctor;
                });
    } 

    UpdateSub(value){
      console.log('**********')   
      this.authService.UpdateSubscription(value).
                then( getAddSubscription => { this.tries = getAddSubscription;
                });
    }  

    getVendoeIdUpdate(value) {
      localStorage.setItem('upVendor', JSON.stringify(value));
    //   var x = JSON.parse(localStorage.getItem('upVendor'));
    // console.log(x)
    }
    Detials(){
      this.authService.GetIDDoctor().
then( responseDoctorID => { this.x = responseDoctorID;
  console.log(this.x)

  this.getVendoeIdUpdate(this.x._id)
  this.EName = this.x.name.en
  this.AName = this.x.name.ar
  this.ETitle =this.x.title.en
  this.ATitle =this.x.title.ar
  this.EBio = this.x.bio.en
  this.EAddress =this.x.address.en
  this.ATitle =this.x.title.ar
  this.ABio = this.x.bio.ar
  this.AAddress =this.x.address.ar
  this.price = this.x.price
  this.lat = this.x.lat
  this.lang = this.x.lng
  this.time = this.x.estimateTime
  this.selectedCategory = this.x.categoryId
  this.selecteddistricts = this.x.districtId
  this.cphone = this.x.clinicPhones
  this.imageSrc = this.x.image
  this.imageSrcLogo = this.x.logo
  this.name = this.x.user.name
  this.phone = this.x.user.phone
  this.selectedFeatures = this.x.workingHours
  this.booking = this.x.numberOfBookingDays
  this.id = this.x._id
  this.startDate = new Date(this.x.subscription.startDate)
  this.endDate = new Date(this.x.subscription.endDate)
  this.subID = this.x.subscription._id
  setTimeout(() => {
    this.spinner.hide();
  }, this.x);
});
}
  ngOnInit() {
    this.spinner.show();
    this.Detials();
    this.Category();
    this.District();
  }

}

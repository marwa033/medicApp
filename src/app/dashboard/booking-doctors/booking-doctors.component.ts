import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

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
  selectedPhone: any[];
  phoneAdd: any;
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
  null: any;
  selectedID: any;
  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService ,
   private toastr: ToastrService,
     config: NgbModalConfig,
     private route: ActivatedRoute,
     private spinner: NgxSpinnerService,
      private modalService: NgbModal) {
       config.backdrop = 'static';
       config.keyboard = false;
    } 
    opensm(contentsm) {
      this.modalService.open(contentsm , { size: 'sm' });
    }
    checkDate() {
      const dateSendingToServer = new DatePipe('en-US').transform(this.startDate, 'dd/MM/yyyy')
      console.log(dateSendingToServer);
    }
    onAdd() {
      this.selectedFeatures.push({day:this.day , from:this.from , to:this.to , max:this.max});
      this.modalService.dismissAll(); 
      this.UpdateWork(this.selectedFeatures);
      this.day="";
      this.from="";
      this.to="";
      this.max="";
    }
    addPhone() {
      this.selectedPhone.push(this.phoneAdd);
      console.log(this.selectedPhone)
      this.modalService.dismissAll(); 
      this.UpdatePhone(this.selectedPhone);
      this.phoneAdd="";
    }
    removeItem(index) {
      this.selectedFeatures.splice(index, 1);
      alert("Are you want to delete that date ?")
      this.UpdateWork(this.selectedFeatures);
    }
    removePhone(index){
      this.selectedPhone.splice(index, 1);
      alert("Are you want to delete that phone?")
      this.UpdatePhone(this.selectedPhone);
    }
    UpdateWork(value) {
      localStorage.setItem('editWork', JSON.stringify(value));
      var upwork = JSON.parse(localStorage.getItem('editWork'));
      console.log(upwork)    
    }
    UpdatePhone(value) {
      localStorage.setItem('editPhone', JSON.stringify(value));
      var upPhone = JSON.parse(localStorage.getItem('editPhone'));
      // console.log(upwork)    
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
      this.spinner.show();
      this.authService.UpdateDoctor(value).
                then( getUpdateDoctor => { this.tries = getUpdateDoctor;
                  setTimeout(() => {
                    this.spinner.hide();
                  }, this.tries);
                });
    } 
 

    getVendoeIdUpdate(value) {
      localStorage.setItem('upVendor', JSON.stringify(value));
    }
    Detials(){

}

AddSub(value){
  this.spinner.show();
  if(this.null == null){
    var val =this.id
  this.authService.editAddSubscription(value , val).
            then( getAddSubscription => { this.tries = getAddSubscription;
              setTimeout(() => {
                this.spinner.hide();
              }, this.tries);
              console.log('ADD');
            });
          }else{
            var val =this.id
            this.authService.UpdateSubscription(value , val).
            then( getUpSubscription => { this.tries = getUpSubscription;
              setTimeout(() => {
                this.spinner.hide();
              }, this.tries);
              console.log('UPDATE');
            });
          }
}  
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id
      let val = this.id;
      this.authService.GetIDDoctor(val).then( responseDoctorID => { this.x = responseDoctorID;
        setTimeout(() => {
          this.spinner.hide();
        }, this.x);
        console.log(this.x)
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
this.selectedPhone = this.x.clinicPhones
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
this.null = this.x.subscription
console.log(this.null);
      });
    })


// console(this.checkDate)
    this.spinner.show();
    this.checkDate();
    this.Category();
    this.District();
  }

}

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ms-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {
  imageSrc: string = '';
  imageSrcLogo : string = '';
  EName: string='';
  AName: string='';
  ETitle: any;
  ATitle: any;
  EBio: any;
  ABio: any;
  EAddress: string='';
  AAddress: string='';
  tries: any;
  price: number;
  lat: number;
  lang: number;
  time: any;
  cphone: any;
  selectedCategory:any;
  selecteddistricts: any;
  name : string='';
  phone : number;
  password : string='';
  day: any;
  from: any;
  categories: any;
  districts: any;
  selectedFeatures: any = [];  
  work: any;
  dayy: any;
  froom: any;
  too: any;
  x = JSON.parse(localStorage.getItem('work'));
  max: any;
  result: any;
  to: any;
  booking: any;
  startDate: any;
  endDate: any;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService ,
     config: NgbModalConfig,
      private modalService: NgbModal) {}
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
      openLg(content) {
        this.modalService.open(content, { size: 'lg' });
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

  
  onAdd() {
  this.selectedFeatures.push({day:this.day , from:this.from , to:this.to , max:this.max});
  console.log(this.selectedFeatures)
  this.modalService.dismissAll(); 
  this.getWork(this.selectedFeatures);
}
getWork(value) {
  localStorage.setItem('Hours', JSON.stringify(value));
  var x = JSON.parse(localStorage.getItem('Hours'));
console.log(x)
}

  Add(value){   
    console.log(this.AName)
    this.authService.DoctorAdd(value).
              then( getDoctoradd => { this.tries = getDoctoradd;
              });
  }  

  AddSub(value){
    console.log('**********')   
    this.authService.AddSubscription(value).
              then( getAddSubscription => { this.tries = getAddSubscription;
              });
  }  

  ngOnInit() {
    console.log(this.selectedFeatures)
    this.Category();
    
    this.District();
  
   
  }

}

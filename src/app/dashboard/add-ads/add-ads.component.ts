import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ms-add-ads',
  templateUrl: './add-ads.component.html',
  styleUrls: ['./add-ads.component.scss']
})
export class AddAdsComponent implements OnInit {
  tries: any;
  doctors: any;
  ETitle: string = '';
  ATitle: string = '';
  selectedDoctor: string= '';
  image : string= '' ;
  imageSrc: any;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService ,
     config: NgbModalConfig,
      private modalService: NgbModal) {}
      
  Add(value){
    this.authService.AddAds(value).
              then( responseAdsresult => { this.tries = responseAdsresult;
              });
  } 
  Doctor(){
    this.authService.GetDoctor().
              then( responsegetDoctor => { this.doctors = responsegetDoctor.data;
                console.log('doctor grt ' + this.doctors);
              });
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
  ngOnInit() {
    this.Doctor();
  }

}

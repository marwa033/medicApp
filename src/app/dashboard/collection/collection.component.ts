import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  center2: any;
  selectedcenter;
  forder: string='';
  torder: string='';
  status;
  selectedstatus;
  patient:string='';
  visite:string='';
  sample:string='';
  name: string='';
  mrn: string='';
  UserData: any;
  detials: any;
  public collections: Observable<any>;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService) { }

   async Center(value) {
    this.authService.CenterCollection(value).then( getcenterrsponse => {
      this.center2 = getcenterrsponse.centers;
   });
   }
   
   async Status(value) {
    this.authService.GetStatus(value).then( getgetstatusrsponse => {
      this.status = getgetstatusrsponse.testStatuses;
   });
   }


Collection(value) {
  if (value.forder == undefined || value.forder =='') {
    value.forder =' ';
    } 
  
    if (value.torder == undefined || value.torder =='') {
    value.torder = " ";
    } 
  
    if (value.center2 == undefined || value.center2 =='') {
    value.center2= '0';
    }
  
    if (value.status == undefined || value.status =='') {
    value.status='0';
    }
  
    if (value.patient == undefined || value.patient =='') {
    value.patient="0";
    }
  
    if (value.visite == undefined || value.visite =='') {
    value.visite = "0";
    }
  
    if (value.sample == undefined || value.sample =='') {
    value.sample ='0';
    } 
  
    if (value.name == undefined || value.name =='') {
    value.name = " ";
    }
  
    if (value.mrn == undefined || value.mrn =='') {
    value.mrn =" ";
    }
  this.authService.SampleCollection(value).then(
      responsecollectiondata => {this.collections = responsecollectiondata;
     console.log( this.collections );
  });
}
// OrderDetials(value) {
//   this.authService.CollectionDetials(value).then(
//       responsecollectiondetialsdata => {this.detials = responsecollectiondetialsdata;
//      console.log( this.detials );
//   });
// }
async OrderDetials(value) {
  
}

  async selectCompany(item) {
  console.log("****************************");

  var obj = await this.authService.CollectionDetials(item).then(
    responsecollectiondetialsdata => {this.detials = responsecollectiondetialsdata;
   console.log( this.detials );
  });
}
    //  var item = await this.authService.CollectionDetials(value);
    // // this.detials = this.authService.detialsResult.loadVisitTests;


  ngOnInit() {
    this.Status('input');
    this.Center('input');
    // this.OrderDetials('input');
  }

}

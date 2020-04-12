import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  // locations: any;
  stores: any;
  centers: any;
  locationname= '';
  locationactive= '';
  locationsite= '';
  addid= '';
  addname= '';
  addactive= '';
  public locations: Observable<any>;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService,
   config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false; }

    async StoreMode(value) {
      // await this.authService.GetStoreMode(value);
      // this.stores = this.authService.StoreResult.inventory_StoreModes;
      this.authService.GetStoreMode(value).then( getGetstorersponse => {
        this.stores = getGetstorersponse.inventory_StoreModes;
     });
     }

     async Center(value) {
      this.authService.CenterCollection(value).then( getcenterrsponse => {
        this.centers = getcenterrsponse.centers;
     });
     }
    Add(value) {
      this.authService.AddLocation(value);
     }

     openSm(content) {
      this.modalService.open(content, { size: 'lg' });
    }


//   Location(value) {
//     this.authService.InventryLocation(value);

//     this.locations = this.authService.searchlocation;
//     console.log( 'results is :  ' + this.locations);
//     console.log(  this.locations);
//  }
Location(value) {
  if (value.locationname == undefined || value.locationname =='') {
  value.locationname=' ';
  } 
  if (value.centers == undefined || value.centers =='') {
  value.centers=' ';
  } 
  if (value.locationactive == undefined || value.locationactive =='') {
  value.locationactive='2';
  } 

  this.authService.InventryLocation(value).then(
    responselocationdata => {this.locations = responselocationdata;
     console.log( this.locations );
  });
}
  ngOnInit() {
    this.StoreMode('input');
    this.Center('input');
  }

}

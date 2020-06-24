import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth-service/auth.service';
import { PageTitleService } from '../../core/page-title/page-title.service';
import * as $ from 'jquery';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ms-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.scss']
})

export class CrmComponent implements OnInit {
   tries: any;
   activeAdmin: any;
   inactiveAdmin: any;
   superAdmin: any;
   ControbuterAdmin: any;
   activeControbuter: any;
   inactiveControbuter: any;
   activeEditor: any;
   inactiveEditor: any;
   editorAdmin: any;
   inactiveGroup: any;
   activeClient: any;
   inactiveClient: any;
   client: any;
   activeVendor: any;
   inactiveVendor: any;
   Vendor: any;
   activeGroup: any;
   Group: any;
   inactiveAds: any;
   activeAds: any;
   Ads: any;
   activeBooking: any;
   inactivebooking: any;
   Booking: any;
   activeCategories: any;
   inactiveCategories: any;
   Categories: any;
   activePromo: any;
   activeReviews: any;
   reviews: any;
   inactivePromo: any;
   promocodes: any;

   constructor(public translate: TranslateService,
      public authService: AuthService,
     private pageTitleService: PageTitleService ,
     private spinner: NgxSpinnerService) {}
            
            
              Home(){
               this.authService.homeAnalytics().
                         then( getHomeAnalytics => { this.tries = getHomeAnalytics;
                           this.activeAdmin = this.tries.activeSuperAdmins;
                           this.inactiveAdmin = this.tries.inActiveSuperAdmins;
                           this.superAdmin = this.tries.superAdmins;
                           this.activeControbuter = this.tries.activeContributerAdmins;
                           this.inactiveControbuter = this.tries.inActiveContributerAdmins;
                           this.ControbuterAdmin = this.tries.contributerAdmins;
                           this.activeEditor = this.tries.activeEditorAdmins;
                           this.inactiveEditor = this.tries.inActiveEditorAdmins;
                           this.editorAdmin = this.tries.editorAdmins;

                           this.activeClient = this.tries.activeClients;
                           this.inactiveClient = this.tries.inActiveClients;
                           this.client = this.tries.clients;
                           this.activeVendor = this.tries.activeVendors;
                           this.inactiveVendor = this.tries.inActiveVendors;
                           this.Vendor = this.tries.vendors;
                           this.activeGroup = this.tries.activeGroups;
                           this.inactiveGroup = this.tries.inActiveGroups;
                           this.Group = this.tries.groups;

                           this.activeAds = this.tries.activeAds;
                           this.inactiveAds = this.tries.inActiveAds;
                           this.Ads = this.tries.ads;
                           this.activeBooking = this.tries.activeBookings;
                           this.inactivebooking = this.tries.inActiveBookings;
                           this.Booking = this.tries.bookings;
                           this.activeCategories = this.tries.activeCategories;
                           this.inactiveCategories = this.tries.inActiveCategories;
                           this.Categories = this.tries.categories;

                           this.activeReviews = this.tries.activeReviews;
                           this.reviews = this.tries.reviews;
                           this.activePromo = this.tries.activePromocodes;
                           this.inactivePromo = this.tries.inActivePromocodes;
                           this.promocodes = this.tries.promocodes;
                           setTimeout(() => {
                               this.spinner.hide();
                             }, this.tries);
                           });
             }
 
   ngOnInit() {
      this.spinner.show()  
      this.pageTitleService.setTitle('CRM');
this.Home()
 
   }

} 

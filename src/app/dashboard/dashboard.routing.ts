import { Routes } from '@angular/router';
import { SaasComponent } from './saas/saas.component';
import { CrmComponent } from './crm/crm.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ShowDistrictComponent } from './show-district/show-district.component';
import { AddDistrictComponent } from './add-district/add-district.component';
import { GetAdminComponent } from './get-admin/get-admin.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { BookingDoctorsComponent } from './booking-doctors/booking-doctors.component';
import { BookingClientsComponent } from './booking-clients/booking-clients.component';
import { ShowAdsComponent } from './show-ads/show-ads.component';
import { AddAdsComponent } from './add-ads/add-ads.component';
import { ShowPromoComponent } from './show-promo/show-promo.component';
import { AddPromoComponent } from './add-promo/add-promo.component';
import { ShowSubscriptionComponent } from './show-subscription/show-subscription.component';
import { AddSubscriptionComponent } from './add-subscription/add-subscription.component';
import { ProfileComponent } from './profile/profile.component';
import { ShowDoctorComponent } from './show-doctor/show-doctor.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { ShowClientsComponent } from './show-clients/show-clients.component';
import { BookingComponent } from './booking/booking.component';
import { MessagesComponent } from './messages/messages.component';
import { GroupComponent } from './group/group.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TryComponent } from './try/try.component';


export const DashboardRoutes: Routes = [
   {
      path: '',
      redirectTo: 'crm',
      pathMatch: 'full'
   },
   {
      path: '',
      children: [
         {
            path: 'showcategory',
            component: SaasComponent
         },
         {
            path: 'crm',
            component : CrmComponent
         },
         {
            path: 'addcategory',
            component : AddCategoryComponent
         },
         {
            path: 'showdistrict',
            component : ShowDistrictComponent
         },
         {
            path: 'adddistrict',
            component : AddDistrictComponent
         },
         {
            path: 'showadmins',
            component : GetAdminComponent
         },
         {
            path: 'addadmins',
            component : AddAdminComponent
         },
         {
            path: 'bookingdoctor/:id',
            component : BookingDoctorsComponent
         },
         {
            path: 'bookingclient',
            component : BookingClientsComponent
         },
         {
            path: 'showads',
            component : ShowAdsComponent
         },
         {
            path: 'addads',
            component : AddAdsComponent
         },
         {
            path: 'showpromo',
            component : ShowPromoComponent
         },
         {
            path: 'addpromo',
            component : AddPromoComponent
         },
         {
            path: 'showsubscription',
            component : ShowSubscriptionComponent
         },
         {
            path: 'addsubscription',
            component : AddSubscriptionComponent
         },
         {
            path: 'profile',
            component : ProfileComponent
         },
         {
            path: 'showdoctors',
            component : ShowDoctorComponent
         },
         {
            path: 'adddoctor',
            component : AddDoctorComponent
         },
         {
            path: 'showclient',
            component : ShowClientsComponent
         },
         {
            path: 'booking',
            component : BookingComponent
         },
         {
            path: 'booking/:id',
            component : BookingComponent
         },
          {
            path: 'bookingVendor/:vendorId',
            component : BookingComponent
         }
         ,
         {
            path: 'group',
            component : GroupComponent
         },
         {
            path: 'message/:id/:name',
            component : MessagesComponent
         },
         {
            path: 'notification',
            component : NotificationsComponent
         },
         {
            path: 'try',
            component : TryComponent
         }
      ]
   }
];

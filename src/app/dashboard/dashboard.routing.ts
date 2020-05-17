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
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { UpdateDistrictComponent } from './update-district/update-district.component';
import { UpdateAdminsComponent } from './update-admins/update-admins.component';
import { UpdatePromoComponent } from './update-promo/update-promo.component';
import { ShowSubscriptionComponent } from './show-subscription/show-subscription.component';
import { AddSubscriptionComponent } from './add-subscription/add-subscription.component';
import { UpdateAdsComponent } from './update-ads/update-ads.component';
import { UpdateSubscriptionComponent } from './update-subscription/update-subscription.component';
import { ProfileComponent } from './profile/profile.component';
import { ShowDoctorComponent } from './show-doctor/show-doctor.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';


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
            path: 'bookingdoctor',
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
            path: 'updatecategory/:id',
            component : UpdateCategoryComponent
         },
         {
            path: 'updatedistrict/:name/:id',
            component : UpdateDistrictComponent
         },
         {
            path: 'updateadmins/:name/:id/:email/:phone',
            component : UpdateAdminsComponent
         },
         {
            path: 'updatepromo/:id/:code/:startdate/:day/:max/:amount',
            component : UpdatePromoComponent
         },
         {
            path: 'updateads/:id/:title/:vendorid',
            component : UpdateAdsComponent
         },
         {
            path: 'updatesubscription/:id/:startDate/:endDate/:vendorId',
            component : UpdateSubscriptionComponent
         }
         ,
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
         }
      ]
   }
];

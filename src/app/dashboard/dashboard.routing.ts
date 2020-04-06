import { Routes } from '@angular/router';
import { SaasComponent } from './saas/saas.component';
import { CrmComponent } from './crm/crm.component';
import { OrderEntryComponent } from './order-entry/order-entry.component';
import { CollectionComponent } from './collection/collection.component';
import { AcceptanceComponent } from './acceptance/acceptance.component';
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';
import { SearchInoviceComponent } from './search-inovice/search-inovice.component';
import { GeneralLabComponent } from './general-lab/general-lab.component';
import { ExplanatoryComponent } from './explanatory/explanatory.component';
import { BacteriologyComponent } from './bacteriology/bacteriology.component';
import { TestCategoryComponent } from './test-category/test-category.component';
import { TestSubCategoryComponent } from './test-sub-category/test-sub-category.component';
import { TestMethodologyComponent } from './test-methodology/test-methodology.component';
import { ContainerComponent } from './container/container.component';
import { SampleTypeComponent } from './sample-type/sample-type.component';
import { TestComponent } from './test/test.component';
import { ResultFieldComponent } from './result-field/result-field.component';
import { TestQuestionComponent } from './test-question/test-question.component';
import { ProfileComponent } from './profile/profile.component';
import { CurrencyComponent } from './currency/currency.component';
import { PayerComponent } from './payer/payer.component';
import { GrossPricelistComponent } from './gross-pricelist/gross-pricelist.component';
import { ClientCategoryComponent } from './client-category/client-category.component';
import { CountryComponent } from './country/country.component';
import { StateComponent } from './state/state.component';
import { CityComponent } from './city/city.component';
import { PriorityComponent } from './priority/priority.component';
import { SpecialityComponent } from './speciality/speciality.component';
import { ClinicComponent } from './clinic/clinic.component';
import { DoctorComponent } from './doctor/doctor.component';
import { TryCatchStmt } from '@angular/compiler';
import { TryComponent } from './try/try.component';
import { PriceInvoiceComponent } from './price-invoice/price-invoice.component';
import { ArchivingComponent } from './archiving/archiving.component';

import { LocationComponent } from './location/location.component';
import { SupplierComponent } from './supplier/supplier.component';

import { ItemComponent } from './item/item.component';
import { PurchaseorderComponent } from './purchaseorder/purchaseorder.component';
import { StoremodeComponent } from './storemode/storemode.component';
import { UomComponent } from './uom/uom.component';
import { LabInfoComponent } from './lab-info/lab-info.component';
import { BranchComponent } from './branch/branch.component';

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
            path: 'saas',
            component: SaasComponent
         },
         {
            path: 'crm',
            component : CrmComponent
         },
         {
            path: 'orderentry/:id',
            component : OrderEntryComponent,
         },
         {
            path: 'collection',
            component : CollectionComponent
         },
         {
            path: 'acceptance',
            component : AcceptanceComponent
         },
         {
            path: 'generateinvoice',
            component : GenerateInvoiceComponent
         },
         {
            path: 'searchinvoice',
            component : SearchInoviceComponent
         },
         {
            path: 'priceinvoice',
            component : PriceInvoiceComponent
         },
         {
            path: 'explanatory',
            component : ExplanatoryComponent
         },
         {
            path: 'generallab',
            component : GeneralLabComponent
         },
         {
            path: 'bacteriology',
            component : BacteriologyComponent
         },
         {
            path: 'testcategory',
            component : TestCategoryComponent
         },
         {
            path: 'testsubcategory',
            component : TestSubCategoryComponent
         },
         {
            path: 'testmethodology',
            component : TestMethodologyComponent
         },
         {
            path: 'testquestion',
            component : TestQuestionComponent
         },
         {
            path: 'container',
            component : ContainerComponent
         },
         {
            path: 'sampletype',
            component : SampleTypeComponent
         },
         {
            path: 'test',
            component : TestComponent
         },
         {
            path: 'resultfield',
            component : ResultFieldComponent
         },
         {
            path: 'profile',
            component : ProfileComponent
         },
         {
            path: 'currency',
            component : CurrencyComponent
         },
         {
            path: 'payer',
            component : PayerComponent
         },
         {
            path: 'grosspricelist',
            component : GrossPricelistComponent
         },
         {
            path: 'clientcategory',
            component : ClientCategoryComponent
         },
         {
            path: 'country',
            component : CountryComponent
         },
         {
            path: 'state',
            component : StateComponent
         },
         {
            path: 'city',
            component : CityComponent
         },
         {
            path: 'priority',
            component : PriorityComponent
         },
         {
            path: 'speciality',
            component : SpecialityComponent
         },
         {
            path: 'clinic',
            component : ClinicComponent
         },
         {
            path: 'doctor',
            component : DoctorComponent
         },
         {
            path: 'try',
            component : TryComponent
         },
         {
            path: 'archiving',
            component : ArchivingComponent
         },
         {
            path: 'storemode',
            component : StoremodeComponent
         },
         {
            path: 'location',
            component : LocationComponent
         },
         {
            path: 'supplier',
            component : SupplierComponent
         },
         {
            path: 'uom',
            component : UomComponent
         },
         {
            path: 'item',
            component : ItemComponent
         },
         {
            path: 'purchaseorder',
            component : PurchaseorderComponent
         },
         {
            path: 'labinfo',
            component : LabInfoComponent
         },
         {
            path: 'branch',
            component : BranchComponent
         }
      ]
   }
];

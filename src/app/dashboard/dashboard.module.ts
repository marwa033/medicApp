import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatIconModule,
			MatButtonModule,
			MatTabsModule,
			MatCardModule,
			MatMenuModule,
			MatCheckboxModule,
			MatDividerModule,
			MatProgressBarModule,
         MatInputModule,      
			MatFormFieldModule,
			MatTableModule,
			MatListModule, 
			MatPaginatorModule,
			MatChipsModule,
			MatSortModule,
			MatSelectModule,
			MatDialogModule,
			MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';
			import { GridModule, PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ChartsModule } from 'ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmCoreModule } from '@agm/core';
import { EasyPieChartModule } from 'ng2modules-easypiechart';
import { TranslateModule } from '@ngx-translate/core';
import { DocumentEditorContainerAllModule } from '@syncfusion/ej2-angular-documenteditor';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { DashboardRoutes } from './dashboard.routing';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { WidgetComponentModule } from '../widget-component/widget-component.module';
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
import { TestQuestionComponent } from './test-question/test-question.component';
import { TestMethodologyComponent } from './test-methodology/test-methodology.component';
import { ContainerComponent } from './container/container.component';
import { SampleTypeComponent } from './sample-type/sample-type.component';
import { TestComponent } from './test/test.component';
import { ResultFieldComponent } from './result-field/result-field.component';
import { ProfileComponent } from './profile/profile.component';
import { CurrencyComponent } from './currency/currency.component';
import { GrossPricelistComponent } from './gross-pricelist/gross-pricelist.component';
import { PayerComponent } from './payer/payer.component';
import { ClientCategoryComponent } from './client-category/client-category.component';
import { CountryComponent } from './country/country.component';
import { StateComponent } from './state/state.component';
import { CityComponent } from './city/city.component';
import { PriorityComponent } from './priority/priority.component';
import { SpecialityComponent } from './speciality/speciality.component';
import { ClinicComponent } from './clinic/clinic.component';
import { DoctorComponent } from './doctor/doctor.component';
import { TryComponent } from './try/try.component';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PriceInvoiceComponent } from './price-invoice/price-invoice.component';
import { StoremodeComponent } from './storemode/storemode.component';
import { LocationComponent } from './location/location.component';
import { ItemComponent } from './item/item.component';
import { SupplierComponent } from './supplier/supplier.component';
import { UomComponent } from './uom/uom.component';
import { PurchaseorderComponent } from './purchaseorder/purchaseorder.component';
import { ArchivingComponent } from './archiving/archiving.component';
import { LabInfoComponent } from './lab-info/lab-info.component';
import { BranchComponent } from './branch/branch.component';
// import { ModalModule } from '@bit/valor-software.ngx-bootstrap.modal';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';


@NgModule({
	declarations: [
		SaasComponent,
		CrmComponent,
		OrderEntryComponent,
		CollectionComponent,
		AcceptanceComponent,
		GenerateInvoiceComponent,
		SearchInoviceComponent,
		PriceInvoiceComponent,
		GeneralLabComponent,
		ExplanatoryComponent,
		BacteriologyComponent,
		TestCategoryComponent,
		TestSubCategoryComponent,
		TestQuestionComponent,
		TestMethodologyComponent,
		ContainerComponent,
		SampleTypeComponent,
		TestComponent,
		ResultFieldComponent,
		ProfileComponent,
		CurrencyComponent,
		GrossPricelistComponent,
		PayerComponent,
		ClientCategoryComponent,
		CountryComponent,
		StateComponent,
		CityComponent,
		PriorityComponent,
		SpecialityComponent,
		ClinicComponent,
		DoctorComponent,
		TryComponent,
		StoremodeComponent,
		LocationComponent,
		ItemComponent,
		SupplierComponent,
		UomComponent,
		PurchaseorderComponent,
		ArchivingComponent,
		LabInfoComponent,
		BranchComponent
	],
	imports: [ GridModule,
		ListViewModule ,
		MatTableModule ,
		ButtonModule,
		MatDatepickerModule,
		ChartModule ,
		RichTextEditorAllModule,
		MatExpansionModule,
		DocumentEditorContainerAllModule,
		MatDialogModule,
		CommonModule,
		MatTableModule,
		MatSelectModule,
		FlexLayoutModule,
		WidgetComponentModule,
		EasyPieChartModule,
		MatPaginatorModule,
		MatChipsModule,
      TranslateModule,
      PerfectScrollbarModule,
		RouterModule.forChild(DashboardRoutes),
		MatIconModule,
		MatButtonModule,
		MatTabsModule,
		MatCardModule,
		MatMenuModule,
		MatListModule,
		MatCheckboxModule,
		MatDividerModule,
		ChartsModule,
		NgxDatatableModule,
		MatProgressBarModule,
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
		ReactiveFormsModule,
		MatSortModule,
		AgmCoreModule.forRoot({apiKey: 'AIzaSyD4y2luRxfM8Q8yKHSLdOOdNpkiilVhD9k'})
	],
	providers: [
		PageService, SortService, FilterService, GroupService,
		{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
		NgbModalConfig, NgbModal
	  ]
})
export class DashboardModule { }

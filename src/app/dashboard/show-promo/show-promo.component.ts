import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-show-promo',
  templateUrl: './show-promo.component.html',
  styleUrls: ['./show-promo.component.scss']
})
export class ShowPromoComponent implements OnInit {
  
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = [ 'count' , 'code' ,
   'startDate',  'daysPeriod'  , 'maxNumberOfUses' , 'amount' , 'type' , 'forAllClients' , 'forAllVendors' , 'action'];


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  results: any;
  tries: any;
  id: any;
  editCode: any;
  editDate: any;
  editDays: any;
  editUsers: any;
  editAmount: any;
  editType: any;
  editClient: any;
  editDoctor: any;
  startDate = new Date()
  selectedDoctor: any;
  doctors: any;
  
  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService ,
   private toastr: ToastrService,
     config: NgbModalConfig,
     private spinner: NgxSpinnerService,
      private modalService: NgbModal) {
       config.backdrop = 'static';
       config.keyboard = false;
    } 
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    PromoCodes(){
      this.authService.GetPromo().
                then( responsegetpromo => { this.results =responsegetpromo;
                   this.dataSource = new MatTableDataSource(responsegetpromo.data);
                   this.dataSource.paginator = this.paginator;
                   this.dataSource.sort = this.sort; 
                  //  console.log( this.results );
                   setTimeout(() => {
                    this.spinner.hide();
                  }, this.results);
                }); }
                
                Update(value){
                  let doc = this.selectedDoctor
                  this.authService.UpdatePromo(value , doc).
                            then( responseupPromo => { this.tries = responseupPromo;
                              // console.log(this.tries);
                              let message = responseupPromo.message;
                                if (message) {
                                  this.toastr.error(message);
                                  }else{
                                    this.toastr.success('Successfully Updated');
                                    this.Close();
                                    }
                            });
                }  
                
      Doctor(){
        this.authService.GetDoctor().
                  then( responsegetDoctor => { this.doctors = responsegetDoctor.data;
                  });
      }
                Close(){ 
                  this.modalService.dismissAll(); 
                  this.spinner.show();
                  window.location.reload();
                   } 

 openLg(content) {
  this.modalService.open(content, { size: 'lg' });
}


selectedRow(element){
  console.log(element)
  this.id = element._id;
  this.editCode = element.code;
  this.editDate =  new Date (element.startDate);
  this.editDays = element.daysPeriod;
  this.editUsers = element.maxNumberOfUses;
  this.editAmount = element.amount;
  this.editType = element.type;
  this.editClient = element.forAllClients;
  this.editDoctor = element.forAllVendors;
  this.selectedDoctor = element.vendorIds
}
  ngOnInit() {
this.PromoCodes();
this.Doctor()
this.spinner.show();
  }

}

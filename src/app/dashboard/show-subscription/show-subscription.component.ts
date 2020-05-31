import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-show-subscription',
  templateUrl: './show-subscription.component.html',
  styleUrls: ['./show-subscription.component.scss']
})
export class ShowSubscriptionComponent implements OnInit {

  startDate = new Date();
  endDate = new Date();

  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = [ 'startDate' , 'endDate','action'];


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  results: any;
  tries: any;
  doctorid: any;
  id: any;
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
    
    Close(){ 
      this.modalService.dismissAll(); 
      this.spinner.show();
      window.location.reload();
       } 

    Subscription(){
      this.authService.GetSubscription().
                then( responseSubscription => { this.results = responseSubscription;
                   this.dataSource = new MatTableDataSource(responseSubscription.data);
                   this.dataSource.paginator = this.paginator;
                   this.dataSource.sort = this.sort; 
                  //  console.log( this.results );
                   setTimeout(() => {
                    this.spinner.hide();
                  }, this.results);
                });
               }

               selectedRow(element){
                 this.id = element._id;
                 this.doctorid = element.vendorId;
                 this.startDate = new Date (element.startDate);
                 this.endDate = new Date (element.endDate);
               }

               Update(value){
                this.authService.UpdateSubscription(value).
                          then( responseUpSubscription => { this.tries = responseUpSubscription;
                            let message = responseUpSubscription.message;
                              if (message) {
                                    this.toastr.error(message);
                                    }   else{
                                          this.toastr.success('Successfully Updated');
                                          this.Close();
                                          }
                          });
              }  
              Doctor(){
                this.authService.GetDoctor().
                          then( responsegetDoctor => { this.doctors = responsegetDoctor.data;
                            // console.log('doctor grt ' + this.doctors);
                          });
              }                                              


Active(element){
  this.authService.DistrictActive(element).
  then( responseActivedistrict => { this.tries = responseActivedistrict;
    element.state = this.tries.state;

  });
}

openLg(content) {
  this.modalService.open(content, { size: 'lg' });
}
  ngOnInit() {
    this.spinner.show();
    this.Doctor();
this.Subscription();
  }

}

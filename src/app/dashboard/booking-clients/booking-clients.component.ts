import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-booking-clients',
  templateUrl: './booking-clients.component.html',
  styleUrls: ['./booking-clients.component.scss']
})
export class BookingClientsComponent implements OnInit {



  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = [ 'completed' , 'state',  'date' , 'from' , 'to'];


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  results: any;
  tries: any;
 
  
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
    Clients(){
      this.authService.GetBookingClients().
                then( responseBookClient => { this.results = responseBookClient;
                   this.dataSource = new MatTableDataSource(responseBookClient.data);
                   this.dataSource.paginator = this.paginator;
                   this.dataSource.sort = this.sort; 
                  //  console.log( this.results );
                   setTimeout(() => {
                    this.spinner.hide();
                  }, this.results);
                });
 } 
 Close(){ 
  window.location.reload();
  this.modalService.dismissAll;
   } 
  ngOnInit() {
    this.Clients();
    this.spinner.show();
  }
}

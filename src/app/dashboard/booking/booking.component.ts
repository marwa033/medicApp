import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  updatedAt = new Date();
  date = new Date();
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['count' , 'vname',   'cname' ,'date', 'price' , 'complete', 'action'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  results: any;
  tries: any;
  day: any;
  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService ,
   private toastr: ToastrService,
   config: NgbModalConfig,
   private router: Router,
     private spinner: NgxSpinnerService,
      private modalService: NgbModal) { }

      
      bookings(){
        this.authService.GetBooking().
        then( responsegetbooks => { this.results = responsegetbooks;
           this.dataSource = new MatTableDataSource(responsegetbooks.data);
           this.dataSource.paginator = this.paginator;
           this.dataSource.sort = this.sort; 
          //  console.log( this.results );
           setTimeout(() => {
            this.spinner.hide();
          }, this.results);
        });}

        FilterBooking(value){
          this.spinner.show();
          this.authService.GetBookingfilter(value).
          then( responsegetbooksfilter => { this.tries = responsegetbooksfilter.data;
             setTimeout(() => {
              this.spinner.hide();
            }, this.tries);
          });}

          editRow(element){
            this.router.navigate(['/dashboard/bookingclient']);
            this.setID(element);
          }

          setID(value) {
            localStorage.setItem('book', JSON.stringify(value));
            var x = JSON.parse(localStorage.getItem('book'));
            // for(let i=0 ; i<x.vendor.workingHours.size ; i++)
            // {
            //   console.log(i);
            // }
            
            this.day = x.vendor['workingHours'];
          console.log(x.vendor.workingHours);
          console.log(x);
          }

  ngOnInit() {
    
    this.bookings();
    this.spinner.show();
  }

}

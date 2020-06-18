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
  book = JSON.parse(localStorage.getItem('book'));  
  cname : string='';
  cphone : string='';
  price: string='';
  date = new Date();
  from : any;
  to: any;
  name: any;
  phone: any;
  title: any;
  address: any;
  district: any;
  phone1: any;
  work: any;
  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService ,
   private toastr: ToastrService,
     config: NgbModalConfig,
     private spinner: NgxSpinnerService,
      private modalService: NgbModal) { } 
    
  ngOnInit() {
    // this.cname = this.book.client.user.name;
    // this.cphone = this.book.client.user.phone;
    this.price = this.book.price;
    this.to = this.book.to;
    this.from = this.book.from;

    this.name = this.book.vendor.name;
    this.phone = this.book.vendor.clinicPhones[0];
    this.phone1 = this.book.vendor.clinicPhones[1];
    this.title = this.book.vendor.title;
    this.address = this.book.vendor.address;
    this.title = this.book.vendor.title;
    this.district = this.book.vendor.district.name;
    
    this.work = this.book.vendor.workingHours;
    this.date = new Date(this.book.date);
    console.log(this.book);
  }
}

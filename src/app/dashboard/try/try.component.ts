import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-try',
  templateUrl: './try.component.html',
  styleUrls: ['./try.component.scss']
})
export class TryComponent implements OnInit {


  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['count' , 'vname',   'Client'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  results: any;
  tries: any;
  day: any;
  selectedID: any;
  vendorID: any;
  constructor(public translate: TranslateService,
    public authService: AuthService,
   private router: Router,
   private spinner: NgxSpinnerService,
   private route: ActivatedRoute,) { }

   bookings(){
    this.authService.TryBooking().
    then( tryResponse => { 
       this.dataSource = new MatTableDataSource(tryResponse.data);
       this.dataSource.paginator = this.paginator;
       setTimeout(() => {
        this.spinner.hide();
      }, tryResponse);
    });
  }

  ngOnInit() {
    this.spinner.show()
    this.bookings()
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { Router } from '@angular/router';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {


  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = [ 'count' ,'name', 'phone' , 'action'];


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  results: any;
 
  constructor(public translate: TranslateService,
    public authService: AuthService,
    private router: Router,
   private pageTitleService: PageTitleService ,
   private toastr: ToastrService,
     config: NgbModalConfig,
     private spinner: NgxSpinnerService,
      private modalService: NgbModal) {
       config.backdrop = 'static';
       config.keyboard = false;
    }       


    Messages(){
      this.authService.GetMessages().
                then( responsegetMessage => { this.results = responsegetMessage;
                   this.dataSource = new MatTableDataSource(responsegetMessage.data);
                   this.dataSource.paginator = this.paginator;
                   this.dataSource.sort = this.sort; 
                  //  console.log( this.results );
                   setTimeout(() => {
                    this.spinner.hide();
                  }, this.results);
                });
               }
               

  ngOnInit() {
    this.spinner.show();
    this.Messages();
  }

}

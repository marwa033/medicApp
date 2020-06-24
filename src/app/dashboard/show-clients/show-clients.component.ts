import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'ms-show-clients',
  templateUrl: './show-clients.component.html',
  styleUrls: ['./show-clients.component.scss']
})
export class ShowClientsComponent implements OnInit {
  updatedAt = new Date();
  createdAt = new Date();
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['count' ,   'name' ,'phone', 'createdAt', 'updatedAt' ,'action'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  results: any;
  tries: any;
  status: any;
  selectedstatus: any;
  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService ,
   private toastr: ToastrService,
   config: NgbModalConfig,
     private spinner: NgxSpinnerService,
      private modalService: NgbModal) { }

                 Clients(){
                  this.authService.GetClients().
                  then( responsegetClients => { this.results = responsegetClients;
                     this.dataSource = new MatTableDataSource(responsegetClients.data);
                     this.dataSource.paginator = this.paginator;
                     this.dataSource.sort = this.sort; 
                    //  console.log( this.results );
                     setTimeout(() => {
                      this.spinner.hide();
                    }, this.results);
                  });}


                  FilterClients(value){
                    this.spinner.show();
                    this.authService.GetFilterClients(value).
                    then( responsegetClientsFilter => { this.results = responsegetClientsFilter;
                       this.dataSource = new MatTableDataSource(responsegetClientsFilter.data);
                       this.dataSource.paginator = this.paginator;
                       this.dataSource.sort = this.sort; 
                      //  console.log( this.results );
                       setTimeout(() => {
                        this.spinner.hide();
                      }, this.results);
                    });}

                  Close(){ 
                    this.modalService.dismissAll(); 
                    this.spinner.show();
                    window.location.reload();
                     }  
                     Active(element){
    
                      this.authService.AdminActivation(element).
                      then( responseActiveAdmindata => { this.tries = responseActiveAdmindata;
                        //  console.log("state is = " + this.tries.state);
                         element.state = this.tries.state;
                         this.Close();   
                      });
                   }

  ngOnInit() {
    this.Clients();
    this.spinner.show();
  }

}

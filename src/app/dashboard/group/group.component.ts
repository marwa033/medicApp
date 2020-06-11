import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

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


    Group(){
      this.authService.GetGroup().
                then( getGroupResults => { this.results = getGroupResults;
                   this.dataSource = new MatTableDataSource(getGroupResults);
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
    this.Group();
  }

}

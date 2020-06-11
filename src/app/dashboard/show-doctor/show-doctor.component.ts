import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'ms-show-doctor',
  templateUrl: './show-doctor.component.html',
  styleUrls: ['./show-doctor.component.scss']
})
export class ShowDoctorComponent implements OnInit {

  id: string = '';
  editeName: string= '';
  upaName: string = '';
  createdAt = new Date();
  updatedAt = new Date();

  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = [ 'count' ,'name', 'district' , 'title' , 'bookings' , 'action'];


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  results: any;
  tries: any;
  filter: any;
  editEName: any;
  editAName: any;
  editATitle: any;
  editABio: any;
  editAAddress: any;
  try: any;
  
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
    openLg(content) {
      this.modalService.open(content, { size: 'lg' });
    }

    detialRow(element){
      this.router.navigate(['/dashboard/showsubscription']);
      this.setID(element._id);
    }
    editRow(element){
this.setID(element._id);
      this.router.navigate(['/dashboard/bookingdoctor']);
      
    }
    setID(value) {
      localStorage.setItem('editDoctor', JSON.stringify(value));
      var x = JSON.parse(localStorage.getItem('editDoctor'));
    console.log(x);
    console.log('x => ' + x);
    }
 
    Doctor(){
      this.authService.GetDoctor().
                then( responsegetDoctor => { this.results = responsegetDoctor;
                   this.dataSource = new MatTableDataSource(responsegetDoctor.data);
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

Active(element){

}
  ngOnInit() {
    this.spinner.show();
    this.Doctor();
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-get-admin',
  templateUrl: './get-admin.component.html',
  styleUrls: ['./get-admin.component.scss']
})
export class GetAdminComponent implements OnInit {
  public isCollapsed = false;
  role = JSON.parse(localStorage.getItem('adminRole'));

  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['count' , 'name' , 'role' , 'email',  'phone' , 'action'];


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  results: any;
  tries: any;
  editPhone: any;
  id: any;
  editName: any;
  editEmail: any;
  editpassword: any;
  password: any;
  selectedstatus: any;
  selectedRole: any;
  roles = JSON.parse(localStorage.getItem('adminRole'));
  leeh = JSON.parse(localStorage.getItem('try'));
  delete: any;
  
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

    Admins(){
      this.authService.GetAdmins().
                then( responseAdminsData => { this.results = responseAdminsData;
                   this.dataSource = new MatTableDataSource(responseAdminsData.data);
                   this.dataSource.paginator = this.paginator;
                   this.dataSource.sort = this.sort; 
                   console.log( this.dataSource);
                   setTimeout(() => {
                    this.spinner.hide();
                  }, this.results);
                });
               }

               
FilterAdmins(value){
  this.spinner.show();
  this.authService.GetAdminsFilter(value).
            then( responseAdminsfilter => { this.results = responseAdminsfilter;
               this.dataSource = new MatTableDataSource(responseAdminsfilter.data);
               this.dataSource.paginator = this.paginator;
               this.dataSource.sort = this.sort;
               setTimeout(() => {
                this.spinner.hide();
              }, this.results);
            });}
               
               Update(value){
                this.authService.UpdateAdmins(value).
                          then( responseUpAdmins => { this.tries = responseUpAdmins;
                            let message = responseUpAdmins.message;
                            if (message) {
                              this.toastr.error(message);
                            
                            }
                             else{
                              this.toastr.success('Successfully Updated');            
                              this.Close();               
                            }  
                          });
              }  
              Close(){ 
                this.modalService.dismissAll(); 
                this.spinner.show();
                window.location.reload();
                 }  
                 Active(element){

                  this.authService.AdminActivation(element).
                  then( responseActiveAdmindata => { this.tries = responseActiveAdmindata;
                     console.log(element);
                     this.Close();   
                  });
               }

               deleteRow(element){
                if(confirm("Are you sure you want to delete this Admin?")){
                this.authService.AdminDelete(element).
                then( responseDelete => { this.delete = responseDelete;
                  //  console.log(element);
                  let message = this.delete.message
                  if(message){
                    this.toastr.error(message);
                  }else{
                    this.toastr.info('Successfully Delete');
                    this.Close();   
                  }
                });}else{}
               }

 openLg(content) {
  this.modalService.open(content, { size: 'lg' });
}

 editRow(element){
  this.id = element._id;
  this.editName = element.user.name;
  this.editEmail = element.user.email;
  this.editPhone = element.user.phone;
  this.selectedRole = element.role
}
// Active(element){
//   this.authService.AdminsActive(element).
//   then( responseActiveAdmins => { this.tries = responseActiveAdmins;
//   });
// }
  ngOnInit() {  
    this.Admins();
    this.spinner.show();
// console.log(this.role);
  }

}

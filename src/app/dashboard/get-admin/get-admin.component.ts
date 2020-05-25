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

  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = [ 'name' , 'email','state',  'phone' , 'action'];


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
    Admins(){
      this.authService.GetAdmins().
                then( responseAdminsData => { this.results = responseAdminsData;
                   this.dataSource = new MatTableDataSource(responseAdminsData.data);
                   this.dataSource.paginator = this.paginator;
                   this.dataSource.sort = this.sort; 
                   console.log( this.results );
                   setTimeout(() => {
                    this.spinner.hide();
                  }, this.results);
                });
               }
               
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
                     console.log("state is = " + this.tries.state);
                     element.state = this.tries.state;
                    //  this.Close();   
                  });
               }

 openLg(content) {
  this.modalService.open(content, { size: 'lg' });
}

 editRow(element){
  this.id = element._id;
  this.editName = element.user.name;
  this.editEmail = element.user.email;
  this.editPhone = element.user.phone;
  this.password = "";
}
// Active(element){
//   this.authService.AdminsActive(element).
//   then( responseActiveAdmins => { this.tries = responseActiveAdmins;
//   });
// }
  ngOnInit() {
    this.Admins();
    this.spinner.show();

  }

}

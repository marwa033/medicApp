import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-show-ads',
  templateUrl: './show-ads.component.html',
  styleUrls: ['./show-ads.component.scss']
})
export class ShowAdsComponent implements OnInit {


  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['image', 'state' , 'title' , 'action'];


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  status: any;
  results: any;
  tries: any;
  updated: any;
  toastr: any;
  editETitle: any;
  id: any;
  doctorId: any;
  editimage: any;
  delete: any;
  doctors: string;
  imageSrc: any;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService ,
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

Ads(){
    this.authService.GetAds().
              then( responsegetads => { this.results = responsegetads;
                 this.dataSource = new MatTableDataSource(responsegetads.data);
                 this.dataSource.paginator = this.paginator;
                 this.dataSource.sort = this.sort; 
                 console.log( this.results );
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.results);
              });}
              Close(){ 
                this.modalService.dismissAll(); 
                this.spinner.show();
                window.location.reload();
                 } 
                 Update(value){
                  this.authService.UpdateAds(value).
                            then( responseUpAds => { this.tries = responseUpAds;
                              let message = responseUpAds.message;
                              if (message) {
                                this.toastr.error(message);
                              
                              }
                               else{
                                this.toastr.success('Successfully Updated');
                                this.Close();
                               }
                            });
                }  
                Doctor(){
                  this.authService.GetDoctor().
                            then( responsegetDoctor => { this.doctors = responsegetDoctor.data;
                              console.log('doctor grt ' + this.doctors);
                            });
                } 
                handleInputChange(e) {
                  var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
                  var pattern = /image-*/;
                  var reader = new FileReader();
                  if (!file.type.match(pattern)) {
                    alert('invalid format');
                    return;
                  }
                  reader.onload = this._handleReaderLoaded.bind(this);
                  reader.readAsDataURL(file);
                }
                _handleReaderLoaded(e) {
                  let reader = e.target;
                  this.imageSrc = reader.result;
                  console.log(this.imageSrc)
                }
               



Active(element){
  this.authService.AdsActivation(element).
  then( responseAds => { this.tries = responseAds;
    //  element.state = this.tries.state;
  });
}
Delete(element){
  this.authService.DeleteAds(element).
  then( responseAdsDelete => { this.delete = responseAdsDelete;
    //  element.state = this.tries.state;
  });
}

selectedRow(element){
  console.log('edit*********');
  this.id = element._id;
  this.doctorId = element.vendorId;
  this.editETitle = element.title;
}
openLg(content) {
  this.modalService.open(content, { size: 'lg' });
}

  ngOnInit() {
    this.Ads();
    this.Doctor();
    this.spinner.show();
  }

}

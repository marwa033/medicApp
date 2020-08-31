import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'ms-show-ads',
  templateUrl: './show-ads.component.html',
  styleUrls: ['./show-ads.component.scss']
})
export class ShowAdsComponent implements OnInit {
  // endDate = new Date();

  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['count' , 'image',   'title' ,'endDate', 'action'];


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  status: any;
  results: any;
  tries: any;
  updated: any;
  editETitle: any;
  id: any;
  doctorId: any;
  editimage: any;
  delete: any;
  doctors: string;
  imageSrc: any;
  editDate: any;
  selectedstatus: any;
  endDate:any;
  try: any;
  editATitle: any;
  selectedDoctor: any;
  imgResultBeforeCompress;
  imgResultAfterCompress;
  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService ,
   private toastr: ToastrService,
   config: NgbModalConfig,
     private spinner: NgxSpinnerService,
      private modalService: NgbModal,
      private imageCompress: NgxImageCompressService) {
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
                //  console.log( this.results );
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.results);
              });}

              
FilterAds(value){
  this.spinner.show();
  this.authService.GetAdsFilter(value).
            then( responsegetadsfilter => { this.results = responsegetadsfilter;
               this.dataSource = new MatTableDataSource(responsegetadsfilter.data);
               this.dataSource.paginator = this.paginator;
               this.dataSource.sort = this.sort; 
              //  console.log( this.results );
               setTimeout(() => {
                this.spinner.hide();
              }, this.results);
            });}
              
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
                              // console.log('doctor grt ' + this.doctors);
                            });
                } 
                
      uploadFile(){
        this.imageCompress.uploadFile().then(({image, orientation}) => {
           
             this.imgResultBeforeCompress = image;
             console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
             this.imageCompress.compressFile(image, null, 60, 60).then(
               result => {
                 this.imageSrc = result;
                 this.imgResultAfterCompress = result;
                 console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
                 console.log(result)
               }
             );
           });
         }
               



Active(element){
  this.authService.AdsActivation(element).
  then( responseAds => { this.tries = responseAds;
    //  element.state = this.tries.state;
    this.Close();
  });
}
Delete(element){
  if(confirm('Are you sure you want to delete this Advertising ?')){
  this.authService.DeleteAds(element).
  then( responseAdsDelete => { this.delete = responseAdsDelete;
    this.Close();
  });}else{}
}
Close(){ 
  this.modalService.dismissAll(); 
  this.spinner.show();
  window.location.reload();   
   } 
selectedRow(element){
  this.spinner.show();
  this.authService.GetIDAds(element).
  then( responseAdsID => { this.try = responseAdsID;
    console.log(this.try)
 this.editATitle = this.try.title.ar;
  this.id = this.try._id;
  this.selectedDoctor = this.try.vendorId;
  this.editETitle = this.try.title.en;
  this.editDate = new Date(this.try.endDate);
  this.imageSrc = this.try.image;
  setTimeout(() => {
    this.spinner.hide();
  }, this.try);
});
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

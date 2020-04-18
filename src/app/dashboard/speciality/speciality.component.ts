import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'ms-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss']
})
export class SpecialityComponent implements OnInit {

  rsname = '';
  idss = '';
  namess = '';
  // specialities: any;
  public specialities: Observable<any>;
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['ID', 'Name', 'CreateDT'];
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService,
   config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    }
    openSm(content) {
      this.modalService.open(content, { size: 'lg' });
    }
    addSpeciality(value) {
      this.authService.addReferralSpeciality(value);
     }

//    Speciality(value) {
//      this.authService.ReferralSpeciality(value);
//      this.specialities = this.authService.SpecialityResult;
//      console.log( 'results is :  ' + this.specialities);
//      console.log(  this.specialities);
// }
Speciality(value) {
  if (value.name == undefined || value.name =='') {
  value.name=' ';
  } 

  this.authService.ReferralSpeciality(value).then(
    responsespecialitydata => {this.specialities = responsespecialitydata;
      this.dataSource = new MatTableDataSource(responsespecialitydata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     console.log( this.specialities );
  });
}
  ngOnInit() {
  }

}

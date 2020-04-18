import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'ms-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
  cities: any;
  countries: any;
  states: any;
  branches: any;
  name: string ='';
  active: false;
  editid: any;
  editname: any;
  searchName: any;
  selectedcountry: any;
  selectedcity: any;
  selectedstate: any;
  editactive: any;
  searcActive: any;
  selectedactive: any;
  newbranch: any;
  upbranches: any;
  searchActive: any;
  clinics: any;
  payers: any;
  selectedactivee: any;
  selectedcountryy: any;
  selectedcityy: any;
  selectedstatee: any;

  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = [ 'Name', 'Country' , 'State' , 'City' , 'Established' , 'Active' , 'symbol'];
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService,
   config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false; }


     async Country(value) {
      this.authService.AddCountry(value).then( getcountryrsponse => {
        this.countries = getcountryrsponse.country;
     });
     }

     async State(value) {
      this.authService.AddState(value).then( getstatersponse => {
        this.states = getstatersponse.states;
     });
     }
    
     openSm(content) {
      this.modalService.open(content, { size: 'lg' });
    } 
    openLg  (edit) {
      this.modalService.open(edit, { size: 'lg' });
    }
    async City(value) {
  
      this.authService.AddCity(value).then( getcityrsponse => {
         this.cities = getcityrsponse.cities;
      });
     }
     AddBranch(value) {
     this.authService.AddBranch(value);

     }
  
     UpBranch(value) {
      // this.authService.UpdateBranch(value);
      this.authService.UpdateBranch(value).then(
        getupBranchResponse => {this.upbranches = getupBranchResponse;
      });
    }
 
     Branch(value) {
      if(value.name == undefined|| value.name=="")
      value.name=' ';
    
      this.authService.SearchBranch(value).then(
        responsebranches => {this.branches = responsebranches;
          this.dataSource = new MatTableDataSource(responsebranches);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      });
    }
    editRow(element){
      console.log("///*************//////////");
      this.editid = element.ID;
      this.editname = element.Name;
      this.selectedcountryy = element.CountryID;
      this.selectedcityy = element.CityID;
      this.selectedstatee = element.StateID;
      this.selectedactivee = element.Active;
      // this.searcActive = branch.Active;
    }
    async GeneratePayer(value) {
      this.authService.GeneratePayerInvoice(value).then( getpayerrsponse => {
        this.payers = getpayerrsponse.clients;
     });
     }
     
      async GenerateClinic(value) {
        await this.authService.GenerateClinicInvoice(value);
        this.clinics = this.authService.clinic.ClinicList;
        // console.log(this.clinicsss);
       }

  ngOnInit() {
    this.Country('input');
    this.City('input');
    this.State('input');
    this.GeneratePayer('input');
    this.GenerateClinic('input');
  }

}

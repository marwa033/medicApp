import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';

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

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService,
   config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false; }


     async Country(value) {
      await this.authService.AddCountry(value);
      this.countries = this.authService.countries.country;
     }

     async State(value) {
      await this.authService.AddState(value);
      this.states = this.authService.states.states;
     }
    
     openSm(content) {
      this.modalService.open(content, { size: 'lg' });
    } 
    openLg  (edit) {
      this.modalService.open(edit, { size: 'lg' });
    }
    async City(value) {
      await this.authService.AddCity(value);
      this.cities = this.authService.cities.cities;
     }
     AddBranch(value) {
     this.authService.AddBranch(value);

     }
  
     UpBranch(value) {
      // this.authService.UpdateBranch(value);
      this.authService.UpdateBranch(value).then(
        getupBranchResponse => {this.upbranches = getupBranchResponse;
         console.log( this.upbranches );
      });
    }
 
     Branch(value) {
      if(value.name == undefined|| value.name=="")
      value.name=' ';
    
      this.authService.SearchBranch(value).then(
        responsebranches => {this.branches = responsebranches;
         console.log( this.branches );
      });
    }
    editRow(branch){
      console.log("///*************//////////");
      this.editid = branch.ID;
      this.editname = branch.Name;
      this.selectedcountry = branch.CountryID;
      this.selectedcity = branch.CityID;
      this.selectedstate = branch.StateID;
      this.selectedactive = branch.Active;
      // this.searcActive = branch.Active;
    }

  ngOnInit() {
    this.Country('input');
    this.City('input');
    this.State('input');
  }

}

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
    async City(value) {
      await this.authService.AddCity(value);
      this.cities = this.authService.cities.cities;
     }
     AddBranch(value) {
      this.authService.AddBranch(value);
     
     }
     Branch(value) {
      if(value.name == undefined|| value.name=="")
      value.name=' ';
    
      this.authService.SearchBranch(value).then(
        responsebranches => {this.branches = responsebranches;
         console.log( this.branches );
      });
    }

  ngOnInit() {
    this.Country('input');
    this.City('input');
    this.State('input');
  }

}

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ms-archiving',
  templateUrl: './archiving.component.html',
  styleUrls: ['./archiving.component.scss']
})
export class ArchivingComponent implements OnInit {
 rack: string='';
 rackid: string ='';
 aactive: string='';
  rackss: any;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService,
   config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false; }

    addRack(value) {
      this.authService.addRackArchiving(value);
     }
    
     openSm(content) {
      this.modalService.open(content, { size: 'lg' });
    } 
    Rack(value) {
      if (value.rack == undefined || value.rack =='') {
        value.rack = ' ';
        }
      if (value.aactive == undefined || value.aactive =='') {
        value.aactive = 2 ;
      }
      this.authService.SearchRack(value).then(
        responserackdata => {this.rackss = responserackdata;
         console.log( this.rackss );
      });
    }

  ngOnInit() {
  }

}

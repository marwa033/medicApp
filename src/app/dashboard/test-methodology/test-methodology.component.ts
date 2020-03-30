import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { observable, Observable } from 'rxjs';

@Component({
  selector: 'ms-test-methodology',
  templateUrl: './test-methodology.component.html',
  styleUrls: ['./test-methodology.component.scss']
})
export class TestMethodologyComponent implements OnInit {

  methodactive= '';
  methodname= '';
  testmid= '';
  testmname= '';
  public  methodology: Observable<any>;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService,
   config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false; }

   addMethodology(value) {
    this.authService.addTestMethodology(value);
   }

   openSm(content) {
    this.modalService.open(content, { size: 'lg' });
  }


  //  Methodology(value) {
  //    this.authService.TestMethodolgy(value);

  //    this.methodology = this.authService.MethodologyResult;
  //    console.log( 'results is :  ' + this.methodology);
  //    console.log(  this.methodology);
  //   }

  Methodology(value) {
    if (value.methodname == undefined || value.methodname == '') {
    value.methodname = ' ';
    }

    this.authService.TestMethodolgy(value).then(
      responsemethoddata => {this.methodology = responsemethoddata;
       console.log( this.methodology );
    });
  }

  ngOnInit() {
  }

}

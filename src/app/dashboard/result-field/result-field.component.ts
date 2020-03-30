import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-result-field',
  templateUrl: './result-field.component.html',
  styleUrls: ['./result-field.component.scss']
})
export class ResultFieldComponent implements OnInit {

  rname= '';
  // fresults: any;
  public fresults: Observable<any>;


  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService) { }

//    Result(value) {
//     this.authService.ResultField(value);

//     this.fresults = this.authService.ResultSearch;
//     console.log( 'results is :  ' + this.fresults);
//     console.log(  this.fresults);
//  }

Result(value) {
  if (value.rname == undefined || value.rname =='') {
  value.rname = ' ';
  }

  this.authService.ResultField(value).then(
    responseresultdata => {this.fresults = responseresultdata;
     console.log( this.fresults );
  });
}
  ngOnInit() {
  }

}

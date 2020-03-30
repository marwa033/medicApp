import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-test-question',
  templateUrl: './test-question.component.html',
  styleUrls: ['./test-question.component.scss']
})
export class TestQuestionComponent implements OnInit {
  question= '';
  // questions:any;
  public questions: Observable<any>;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService,
   config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false; }


    addQuestion(value) {
      this.authService.addTestQuestion(value);
     }

     openSm(content) {
      this.modalService.open(content, { size: 'lg' });
    }


//    Question(value) {
//      this.authService.TestQuestion(value);

//      this.questions = this.authService.QuestionResult;
//      console.log( 'results is :  ' + this.questions);
//      console.log(  this.questions);
//  }
Question(value) {
  if (value.question == undefined || value.question =='') {
  value.question = ' ';
  }
  this.authService.TestQuestion(value).then(
    responsequestiondata => {this.questions = responsequestiondata;
     console.log( this.questions );
  });
}

  ngOnInit() {
  }

}

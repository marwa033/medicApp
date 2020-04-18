import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'ms-test-question',
  templateUrl: './test-question.component.html',
  styleUrls: ['./test-question.component.scss']
})
export class TestQuestionComponent implements OnInit {
  question= '';
  // questions:any;
  public questions: Observable<any>;
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['ID', 'Question', 'CreateDT'];
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

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

Question(value) {
  if (value.question == undefined || value.question =='') {
  value.question = ' ';
  }
  this.authService.TestQuestion(value).then(
    responsequestiondata => {this.questions = responsequestiondata;
      this.dataSource = new MatTableDataSource(responsequestiondata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  });
}

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-sample-type',
  templateUrl: './sample-type.component.html',
  styleUrls: ['./sample-type.component.scss']
})
export class SampleTypeComponent implements OnInit {
  samplename= '';
  sampleid= '';
  samplename2= '';
  samplecontainer= '';
  container;
  selectedcontainer;
  UserData: any;
  // samples: any
  public samples: Observable<any>;


  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService,
   config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false; }

    addSample(value) {
      this.authService.addSampleType(value);
     }

     openSm(content) {
      this.modalService.open(content, { size: 'lg' });
    }

   async Container(value) {
    await this.authService.SampleContainer(value);
    this.container = this.authService.containers.containerModels;
   }

//    Sample(value) {
//     this.authService.SampleType(value);

//     this.samples = this.authService.SampleResult;
//     console.log( 'results is :  ' + this.samples);
//     console.log(  this.samples);
//  }
Sample(value) {
  if (value.samplename == undefined || value.samplename =='') {
  value.samplename=' ';
  }
if (value.container == undefined || value.container =='') {
  value.container=' ';
}

  this.authService.SampleType(value).then(
    responsesampledata => {this.samples = responsesampledata;
     console.log( this.samples );
  });
}
  ngOnInit() {
    this.Container('input');

  }

}
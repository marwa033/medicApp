import { Component, ViewChild, OnInit, AfterViewInit  } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SaasComponent } from '../saas/saas.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ms-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit   {

  id: string;
  tries: any;
  SelectedID: any;
  results: any;
  updates : any
  upEName: any;
  editEName: any;
  editColor: any;
  editimage: any;
  imageSrc: any;
  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService ,
     config: NgbModalConfig,
     private route: ActivatedRoute,
      private modalService: NgbModal) {
    }

    Update(value){
      this.authService.editCategories(value).
                then( editresponse => { this.tries = editresponse;
                });
    }  
    handleInputChange(e) {
      var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      }
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
    _handleReaderLoaded(e) {
      let reader = e.target;
      this.imageSrc = reader.result;
      console.log(this.imageSrc)
    }
    ngOnInit() {

this.route.params.subscribe(params =>{
  this.id = params.id;
  this.editEName = params.name;
  this.editColor = params.color;
  this.editimage = params.image;
});
  }

}

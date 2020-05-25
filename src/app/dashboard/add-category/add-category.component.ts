import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ms-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
selectedFile = null;
EName: string='';
AName: string='' ;
Color: string= '';
image: string= '';
imageSrc: string = '';


constructor(public translate: TranslateService,
  public authService: AuthService,
 private pageTitleService: PageTitleService ,
   config: NgbModalConfig,
    private modalService: NgbModal) {}

  onFileSelected(event){
this.selectedFile = event.target.files[0];
  }

  Add(value){
    if(this.imageSrc == ""){
      this.imageSrc = "https://node-doctors.herokuapp.com/public/images/d2f20d8e-c560-4f89-8d55-8cccaa08f143.png"
    }
    this.authService.ADDCategory(value);
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
  }

}

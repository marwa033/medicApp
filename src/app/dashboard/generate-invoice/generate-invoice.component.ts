import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.scss']
})
export class GenerateInvoiceComponent implements OnInit {
  bfrom: string = '';
  bto: string = '';
  gpayer;
  gclinic;
  selectedpayer;
  selectedclinic;
  // invoices: any;
  public invoices: Observable<any>;
  public UserData: any;


  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService) { }

//    Generate(value) {
//     this.authService.GenerateInvoice(value);

//     this.invoices = this.authService.GenerateInvoiceResult;
//     console.log( 'results is :  ' + this.invoices);
//     console.log(  this.invoices);

//  }

Generate(value) {
  
  if (value.bfrom == undefined || value.bfrom =='') {
    value.bfrom = ' ';
    }
  
    if (value.bto == undefined || value.bto =='') {
    value.bto = ' ';
    }
  
    if (value.gpayer == undefined || value.gpayer =='') {
    value.gpayer = '0';
    }
  
    if (value.clinic == undefined || value.clinic =='') {
    value.clinic = '0';
    }
  this.authService.GenerateInvoice(value).then(
      responsecollectiondata => {this.invoices = responsecollectiondata;
     console.log( this.invoices );
  });
}

 async GeneratePayer(value) {
  await this.authService.GeneratePayerInvoice(value);
  this.gpayer = this.authService.clients.clients;
 }

 async GenerateClinic(value) {
  await this.authService.GenerateClinicInvoice(value);
  this.UserData = this.authService.userData;

  console.log(this.UserData);
  this.gclinic = this.UserData.ClinicList;
  console.log(this.gclinic);
 }

  ngOnInit() {
    this.GeneratePayer('input');
    this.GenerateClinic('input');
  }
}

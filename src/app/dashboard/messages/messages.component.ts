import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { socket } from 'socket.io';
// import * as io from 'socket.io'

@Component({
  selector: 'ms-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {


  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = [ 'count' ,'name', 'phone' , 'action'];


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  results: any;
  selectedID: any;
  tries: any;
  text: any;
  time: any;
  name: any;
  message : any;
  yourMessage: any;
  sendMessage: any = [];
  userId: any;
  currentTime = new Date();
  adminID = JSON.parse(localStorage.getItem('adminId'));

  constructor(public translate: TranslateService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
   private pageTitleService: PageTitleService ,
   private toastr: ToastrService,
  //  private socket:Socket.io,
     config: NgbModalConfig,
     private spinner: NgxSpinnerService,
      private modalService: NgbModal) {
       config.backdrop = 'static';
       config.keyboard = false;
    }       
    onEnter(){
      let val = this.selectedID 
    this.sendMessage.push(this.message);
    // this.sendMessage.reverse();
    this.sendYourMessage();
      this.authService.sendMessage(this.message , val , this.name ,this.userId,this.time);
      this.message='';
    }
sendYourMessage(){
  let val = this.selectedID 
  let text = this.message
  let time = this.currentTime
  this.authService.sendYourMessage(val , text , time).then(sendMessageResult => { this.tries = sendMessageResult;});
}


  ngOnInit() {
    let val = this.selectedID 
    this.authService.onNewMessage(val).subscribe(msg => {
      console.log('got a msg: ' + msg);
      location.reload()
    });
    
    /////////////////////////////////////////////////
    this.route.params.subscribe(params => {
      if (this.selectedID = params.id,this.name = params.name){
       let val = this.selectedID   
       this.spinner.show();
       this.authService.getMessages(val).
       then( responseGetMessages => { this.tries = responseGetMessages.data;
         setTimeout(() => {
          this.spinner.hide();
        }, this.tries);
        this.tries.reverse()
       });
      }
      })

  }

}

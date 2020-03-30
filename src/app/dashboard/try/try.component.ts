import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ms-try',
  templateUrl: './try.component.html',
  encapsulation: ViewEncapsulation.None,

  styles: [` .dark-modal .modal-content {
    background-color: #292b2c;
    color: white;
  }
  .dark-modal .close {
    color: white;
  }
  .light-blue-backdrop {
    background-color: #18191a;
  }

  `]})
export class TryComponent implements OnInit {
  closeResult: string;
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }

  ngOnInit() {
  }

}

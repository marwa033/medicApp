import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { pipe } from 'rxjs';
import { json } from 'd3';
const baseURL = 'https://node-doctors.herokuapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService
 , private http: HttpClient) {
this.user = firebaseAuth.authState;
}


}

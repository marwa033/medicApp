import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Http, Headers  } from '@angular/http';
import { pipe } from 'rxjs';
import { json } from 'd3';
const baseURL = 'https://node-doctors.herokuapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	user: Observable<firebase.User>;
	userData: any;
   isLoggedIn = false;
  getCategoryResult: any;
  addCategoryResult: any;
  editcategoryresult: any;
  getDistrictResult: any;
  upDistrictresult: any;
  districts: any;
  activeCategory: any;
  activeDistrict: any;
  dataUser: any;
  getAdminsResults: any;
  upAdminsResults: any;
  activeAdmins: any;
  Admin: any;
  bookingDoctorResult: any;
  bookingClientsResult: any;
  getAdsResults: any;
  upAdsTesult: any;
  getPromoResult: any;
  upPromoResult: any;
  PromoCode: any;
  activeAds: any;
  addAds: any;
  getSubscriptionResult: any;
  Subscription: any;
  upSubscription: any;
  getProfileResults: any;
  upProfileResults: any;
  getDoctorResults: any;
  adsDelete: any;
  activeAdmin: any;
 


   constructor(private firebaseAuth: AngularFireAuth,
               private router: Router,
               private toastr: ToastrService
            , private http: HttpClient) {
          this.user = firebaseAuth.authState;
   }

   /*
    *  getLocalStorageUser function is used to get local user profile data.
    */
   getLocalStorageUser() {
      this.userData = JSON.parse(localStorage.getItem('userProfile'));
      if (this.userData) {
         this.isLoggedIn = true;
         return true;
      } else {
         this.isLoggedIn = false;
         return false;
      }
   }

/////////////////////////////////////////
async AddDistrict(value) {
  let log =this.userData['x-auth-token'];
  const data = {name:{ en: value.Ename , ar: value.Aname}};

  const bodyobj = JSON.stringify(data);
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/districts', {
    method: 'POST',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

const response = await fetch( request);
const getAddDistrict = await response.json();
let message = getAddDistrict.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Added');
  this.router.navigate(['/dashboard/showdistrict']);
}
this.districts = getAddDistrict;
return this.districts;
}
/////////////////////////////////////////
async AddSubscription(value) {
  let log =this.userData['x-auth-token'];
  const data = { startDate: value.startDate , endDate: value.endDate , vendorId : value.doctors};

  const bodyobj = JSON.stringify(data);
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'payments/Subscriptions', {
    method: 'POST',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

const response = await fetch( request);
const responseAddSubscription = await response.json();
let message = responseAddSubscription.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Added');
  this.router.navigate(['/dashboard/showsubscription']);
}
this.Subscription = responseAddSubscription;
return this.Subscription;
}
/////////////////////////////////////////
async AddPromo(value) {
  let log =this.userData['x-auth-token'];
  const data = {code: value.Code ,  startDate : value.Date , daysPeriod: value.Period , maxNumberOfUses: value.Users,
    amount: value.Amount , type : value.Type , forAllClients : value.Client , forAllVendors: value.Doctor};

  const bodyobj = JSON.stringify(data);
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'payments/promocodes', {
    method: 'POST',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

const responseAddPromo = await fetch( request);
const getAddDistrict = await responseAddPromo.json();
let message = getAddDistrict.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Added');
  this.router.navigate(['/dashboard/showpromo']);
}
this.PromoCode = getAddDistrict;
return this.PromoCode;
}
/////////////////////////////////////////
async AddAdmin(value) {
  console.log(value.name);
  console.log(value.email);
  console.log(value.phone);
  console.log(value.password);
  let log =this.userData['x-auth-token'];
  const data = {user:{ name: value.name , email: value.email ,phone: value.phone , password: value.password }};
// Role
  const bodyobj = JSON.stringify(data);
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'auth/admins', {
    method: 'POST',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

const response = await fetch( request);
const responseAdmin = await response.json();
let message = responseAdmin.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Added');
  this.router.navigate(['/dashboard/showadmins']);

}
this.Admin = responseAdmin;
return this.Admin;
}
/////////////////////////////////////////
async AddAds(value) {

  let log =this.userData['x-auth-token'];
  const data = {title:{ en: value.ETitle , ar: value.ATitle} ,image : value.imageSrc , vendorId: value.doctors};

  const bodyobj = JSON.stringify(data);
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/ads', {
    method: 'POST',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

const response = await fetch( request);
const responseAdsresult = await response.json();
let message = responseAdsresult.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Added');
  this.router.navigate(['/dashboard/showads']);

}
this.addAds = responseAdsresult;
return this.addAds;
}
/////////////////////////////////////////
async ADDCategory(value) {
  let log =this.userData['x-auth-token'];
const data = { image: value.imageSrc, color: value.Color , "name": { en : value.EName , ar : value.AName} 
 };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'components/categories',
{
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

await fetch( request)
.then(response => response.json())
.then(json => this.getAddCategoryResponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getAddCategoryResponse( resposne) {
console.log(resposne);
let message = resposne.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Added');
  this.router.navigate(['/dashboard/showcategory']);
}this.addCategoryResult = resposne;
}

/////////////////////////////////////////


async editCategories(value) {
  let log =this.userData['x-auth-token'];

const data = {_id:value.id, image: value.imageSrc , color: value.upColor , "name": { en : value.upEName , ar : value.upAName}};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'components/categories',
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

        const response = await fetch( request);
  const editresponse = await response.json();
  // if(value.imageSrc == ""){
  //   value.imageSrc == editresponse.data[value.id].image;
  // }

 console.log(value.imageSrc);
  this.editcategoryresult = editresponse;
  return this.editcategoryresult;
}
/////////////////////////////////////////
async UpdateDistrict(value) {
  let log =this.userData['x-auth-token'];
  const data = {_id:value.id, "name": { en : value.upEName , ar : value.upAName} 
};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'components/districts',
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

        const response = await fetch( request);
  const responseupDistrictdata = await response.json();
  this.upDistrictresult = responseupDistrictdata;
  return this.upDistrictresult;
}
/////////////////////////////////////////
async UpdateSubscription(value) {
  let log =this.userData['x-auth-token'];
  const data = {_id:value.id, vendorId : value.doctorid , startDate: value.startDate , endDate: value.endDate};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'payments/Subscriptions',
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

        const response = await fetch( request);
  const responseUpSubscription = await response.json();
  
  this.upSubscription = responseUpSubscription;
  return this.upSubscription;
}

/////////////////////////////////////////
async UpdatePromo(value) {
  console.log(value.upid);
  let log =this.userData['x-auth-token'];
  const data = { _id:value.id , code : value.upCode , startDate: value. upDate , daysPeriod : value.upDays , maxNumberOfUses: value.upUsers,
    amount: value.upAmount };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'payments/promocodes',
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

        const response = await fetch( request);
  const responseupPromo = await response.json();
  
  this.upPromoResult = responseupPromo;
  return this.upPromoResult;
}
/////////////////////////////////////////
async UpdateAdmins(value) {
  let log =this.userData['x-auth-token'];
  const data = {_id:value.id, "user": { name : value.upName , email : value.upEmail , phone: value.upPhone , password : value.password} };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'auth/admins',
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

        const response = await fetch( request);
  const responseUpAdmins = await response.json();
 
  this.upAdminsResults = responseUpAdmins;
  
  return this.upAdminsResults;
}
/////////////////////////////////////////
async UpdateProfile(value) {
  let log =this.userData['x-auth-token'];
  const data = { name : value.name , email : value.email , phone: value.phone};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'auth/users/editProfile',
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

        const response = await fetch( request);
  const responseUpProfile = await response.json();
  let message = responseUpProfile.message;
  if (message) {
    this.toastr.error(message);
  
  }
   else{
    this.toastr.success('Successfully Updated');
    // this.router.navigate(['/dashboard/showadmins']);
  
  }  
  this.upProfileResults = responseUpProfile;
  
  return this.upProfileResults;
}


/////////////////////////////////////////
async UpdateAds(value) {
  console.log(value.id);
  console.log(value.upETitle);
  console.log(value.upATitle);
  console.log(value.editimage);
  console.log(value.doctorId);

  let log =this.userData['x-auth-token'];
  const data = {_id:value.id, title: { en : value.upETitle , ar : value.upATitle} ,
      image : value.upimage ,
       vendorId: value.updoctorId};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'components/ads',
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

        const response = await fetch( request);
  const responseUpAds = await response.json();
    this.upAdsTesult = responseUpAds;
  return this.upAdsTesult;
}
/////////////////////////////////////////
async Activation(element) {
  let log =this.userData['x-auth-token'];
  const data = {_id:element._id};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'components/categories/changeState',
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);
console.log(log);
        const response = await fetch( request);
  const responseActivedata = await response.json();
  this.activeCategory = responseActivedata;
  this.toastr.info('Change State');
  // this.router.navigate(['/dashboard/showcategory']);
  return this.activeCategory;
}
/////////////////////////////////////////
async AdminActivation(element) {
  let log =this.userData['x-auth-token'];
  const data = {_id:element._id};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'auth/users/changeState',
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);
console.log(log);
        const response = await fetch( request);
  const responseActiveAdmindata = await response.json();
  this.activeAdmin = responseActiveAdmindata;
  console.log(this.activeAdmin);
  this.toastr.info('Change State');
  // this.router.navigate(['/dashboard/showadmin']);
  return this.activeAdmin;
}
/////////////////////////////////////////
async AdsActivation(element) {
  let log =this.userData['x-auth-token'];
  const data = {_id:element._id};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'components/ads/changeState',
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);
console.log(log);
        const response = await fetch( request);
  const responseAds = await response.json();
  // let message = responseAds.message;

    this.toastr.info('Change State');
    this.router.navigate(['/dashboard/showads']);
  this.activeAds = responseAds;

  return this.activeAds;
}
/////////////////////////////////////////
async DeleteAds(element) {
  let log =this.userData['x-auth-token'];
  const data = {};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'api/components/ads/' + element._id,
{
method: 'DELETE',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);
console.log(log);
        const response = await fetch( request);
  const responseAdsDelete = await response.json();
  let message = responseAdsDelete.message;
  this.toastr.info(message);
    this.router.navigate(['/dashboard/showads']);
  this.adsDelete = responseAdsDelete;

  return this.adsDelete;
}
/////////////////////////////////////////
async DistrictActive(element) {
  let log =this.userData['x-auth-token'];  
  const data = {_id:element._id};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'components/districts/changeState',

{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);
// request.params.append('state', element.filter)

        const response = await fetch( request);
  const responseActivedistrict = await response.json();
  this.activeDistrict = responseActivedistrict;
  console.log(this.activeDistrict);
  this.toastr.info('Change State');
  this.router.navigate(['/dashboard/showdistrict']);
  return this.activeDistrict;
}
/////////////////////////////////////////
async GetProfile() {
  let log =this.userData['x-auth-token'];
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'auth/users/me',
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
        request.headers.append('x-auth-token', log);
        const response = await fetch( request);
  const responsegetProfile = await response.json();

  this.getProfileResults = responsegetProfile;
  return this.getProfileResults;
}
/////////////////////////////////////////
async GetDoctor() {
  let log =this.userData['x-auth-token'];
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'auth/vendors/subscriptions?pageNumber=1&pageSize=100&state=active',
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', 'ar');
        const response = await fetch( request);
  const responsegetDoctor = await response.json();

  this.getDoctorResults = responsegetDoctor;
  return this.getDoctorResults;
}
/////////////////////////////////////////
async GetCategories(element) {
  const date = {}
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/categories?pageNumber=1&pageSize=100&state=active&name=' + element.name,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('lang', 'en');
        const response = await fetch( request);
  const responsedata = await response.json();
  console.log('from the another function categories');
  this.getCategoryResult = responsedata;
  return this.getCategoryResult;
}

/////////////////////////////////////////
async GetAds() {
  
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/ads?state=active',
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('lang', 'en');
        const response = await fetch( request);
  const responsegetads = await response.json();
  console.log('from the another function categories');
  this.getAdsResults = responsegetads;
  return this.getAdsResults;
}

////////////////////////////+/////////////responsegetpromo
async GetDistrict() {
  
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/districts?pageNumber=1&pageSize=100&state=active' ,
  { method: 'GET',}
  );
        request.headers.delete('Content-Type');
        request.headers.append('lang', 'en');
        const response = await fetch( request);
  const responsedistrictdata = await response.json();
  
  this.getDistrictResult = responsedistrictdata;
  return this.getDistrictResult;
}
/////////////////////////////////////////
async GetSubscription() {
  let log =this.userData['x-auth-token'];
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'payments/Subscriptions?pageNumber=1&pageSize=100',
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('lang', 'en');
        request.headers.append('x-auth-token', log);
        const response = await fetch( request);
  const responseSubscription = await response.json();
  
  this.getSubscriptionResult = responseSubscription;
  return this.getSubscriptionResult;
}
/////////////////////////////////////////
async GetPromo() {
  let log =this.userData['x-auth-token'];

  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'payments/promocodes?pageNumber=1&pageSize=100',
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('x-auth-token', log );
        const response = await fetch( request);
  const responsegetpromo = await response.json();
  
  this.getPromoResult = responsegetpromo;
  return this.getPromoResult;
}
/////////////////////////////////////////
async GetAdmins() {
  let log =this.userData['x-auth-token'];
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'auth/admins?pageNumber=1&pageSize=100&state=active',
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('x-auth-token', log );
        const response = await fetch( request);
  const responseAdminsData = await response.json();
  this.getAdminsResults = responseAdminsData;
  return this.getAdminsResults;
}
/////////////////////////////////////////
async GetBookingDoctors() {
  let log =this.userData['x-auth-token'];
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/bookings/vendor/5ead9a1af87af0111ca7fa58?pageNumber=1&pageSize=100&completed=true',
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('x-auth-token', log );
        const response = await fetch( request);
  const responseBookDoctor = await response.json();
  this.bookingDoctorResult = responseBookDoctor;
  console.log(this.bookingDoctorResult);
  return this.bookingDoctorResult;
}
/////////////////////////////////////////
async GetBookingClients() {
  let log =this.userData['x-auth-token'];
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/bookings/client/5ead9a1af87af0111ca7fa58?pageNumber=1&pageSize=100&completed=true',
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('x-auth-token', log );
        const response = await fetch( request);
  const responseBookClient = await response.json();
  this.bookingClientsResult = responseBookClient;
  console.log(this.bookingClientsResult);
  return this.bookingClientsResult;
}


////////////////////////////////////////
  async loginUser(value) {
      console.log(value.username);
      console.log(value.password);
      console.log(value.centers);

      const data = {email: value.email, password: value.password};
      const bodyobj = JSON.stringify(data);
      const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
      const request = new Request(baseURL + 'auth/users/login/email', {
        method: 'POST',
        body: bodyobj
    });
     request.headers.delete('Content-Type');
    request.headers.append('Content-Type', 'application/json');
    const response = await fetch( request);
    const responsedata = await response.json();
    let message = responsedata.message;
    if (message) {
      this.toastr.error(message);
      this.router.navigate(['/session/login']);

    }
     else{
      this.getrsponse(responsedata);
    }

   }
   getrsponse(resposne) {
 
      this.setLocalUserProfile(resposne);
 this.toastr.success('Successfully Logged In!');
 this.router.navigate(['/']);
    
    //  this.userData = resposne;
    //  console.log("--> = "+ this.userData);
    this.userData = resposne['x-auth-token'];
console.log('userdata = ' + this.userData);
console.log('response["x-auth-token"]');
  }




   logOut() {
      this.firebaseAuth
      .auth
      .signOut();
      localStorage.removeItem('userProfile');
      this.isLoggedIn = false;
      this.toastr.success('Successfully logged out!');
      this.router.navigate(['/session/login']);
   }

   /*
    * setLocalUserProfile function is used to set local user profile data.
    */
   setLocalUserProfile(value) {
   	localStorage.setItem('userProfile', JSON.stringify(value));
      this.getLocalStorageUser();
      this.isLoggedIn = true;
   }
}

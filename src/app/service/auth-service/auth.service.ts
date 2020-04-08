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
const baseURL = 'http://husseinelkadi-001-site3.atempurl.com/api/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	user: Observable<firebase.User>;
	userData: any;
   isLoggedIn = false;
   nationalities: any;
   searchresult: Observable<any>;
   collectionresult: any;
   AcceptanceResult: any;
   LabResult: any;
   SearchInvoiceResult: any;
   GenerateInvoiceResult: any;
   TestCategoryResult: any;
   SubCategoryResult: any;
   QuestionResult: any;
   MethodologyResult: any;
   ContainerResult: any;
   SampleResult: any;
   ResultSearch: any;
   TestResult: any;
   ProfileResult: any;
   CurrencyResult: any;
   PricelistResult: any;
   PayerResult: any;
   ClientCategoryResult: any;
   PriorityResult: any;
   SpecialityResult: any;
   ClinicResult: any;
   DoctorResult: any;
   addQuestion: any;
   subCategory: any;
   testCategory: any;
   addMethodology: any;
   addContainer: any;
   addSample: any;
   addCurency: any;
   addClientCategory: any;
   addDoctorResult: any;
   addClinicResult: any;
   addSpeciality: any;
   addPriority: any;
   addPricelist: any;
   addPayer: any;
   addProfile: any;
   addTest: any;
   bloodGroups: any;
   cities: any;
   countries: any;
   states: any;
   titles: any;
   genders: any;
   centers: any;
   workcenters: any;
   categories: any;
   clients: any;
   priorities: any;
   minstatus: any;
   maxstatus: any;
   tests: any;
   getstatus: any;
   containers: any;
   subcategory: any;
   samples: any;
   result: any;
   bacteriology: any;
   explanatoryResult: any;
   VisitTypeResult: any;
   GetDoctor: any;
   contractresult: any;
   orderresult: any;
   patients: any;
   logininfo: any;
   RackResult: any;
   addRackResult: any;
   storeresult: any;
   addstoreresult: any;
   searchlocation: any;
   addlocation: any;
   StoreResult: any;
   supplyresult: any;
   addsupplyresult: any;
   getcurrancy: any;
   uomresult: any;
   adduom: any;
  itemresult: any;
  loadvisitresult: any;
  GetOrderDoctor: any;
  purchaseorder: any;
  addpurchaseorder: any;
  historyresult: any;
  SupplyOrder: any;
  ItemOrder: any;
  detialsResult: any;
  currency: any;
  GetPrice: any;
  Cpriority: any;
  Cspeciality: any;
  generaldetials : any;
  loadprofileresult: any;
  branches: any;
  getBranch: any;
  providers: any;
  GetLab: any;
  addBranch: any;
  Branches: any;
  labinfo: any;
  upBranch: any;
  Labs: any;
  getlab: any;
  noarray: any;
  uplab: any;

  // search result :any; ===> searchresult: new Observable<any>();


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
   ////////////////////////////////////////
   async OrderEntryDoctor(value) {
    // console.log(value);
    this.userData = JSON.parse(localStorage.getItem('userProfile'));

    const data = {clinicID: value.clinics.ID };
    // const data = { LabId : this.userData.LabID };
   const bodyobj = JSON.stringify(data);

   const request = new Request(baseURL + 'ClinicDoctor/ClinicDoctor', {
   method: 'POST',
   body: bodyobj
   });
   request.headers.delete('Content-Type');
   request.headers.append('Content-Type', 'application/json');

   await fetch( request)
   .then(response => response.json())
   .then(json => this.getorderdoctorrsponse(json))
   .catch(err => {
    this.toastr.error(err.message);
   });

   }
   getorderdoctorrsponse( resposne) {
   console.log('from function get notionality' + resposne);
   this.GetOrderDoctor = resposne;
   }
   ////////////////////////////////////////

   async CollectionDetials(item) {
    // this.detialsResult = JSON.parse(localStorage.getItem('userProfile'));

    const data = {VisitID: item.VisitId , StatusID: item.StatusID };
    // const data = { LabId : this.userData.LabID };
   const bodyobj = JSON.stringify(data);

   const request = new Request(baseURL + 'VisitTest/HPS_LoadVisitTest', {
   method: 'POST',
   body: bodyobj
   });
   request.headers.delete('Content-Type');
   request.headers.append('Content-Type', 'application/json');
   const response = await fetch( request);
const responsecollectiondetialsdata = await response.json();
this.detialsResult = responsecollectiondetialsdata.loadVisitTests;
return this.detialsResult;
}
   ////////////////////////////////////////

   async OrderHistory(item) {
    // this.detialsResult = JSON.parse(localStorage.getItem('userProfile'));

    const data = {PatientID: item.PatientID };
    // const data = { LabId : this.userData.LabID };
   const bodyobj = JSON.stringify(data);

   const request = new Request(baseURL + 'OrderHistory/OrderHistory', {
   method: 'POST',
   body: bodyobj
   });
   request.headers.delete('Content-Type');
   request.headers.append('Content-Type', 'application/json');
   const response = await fetch( request);
const responseorderhistory = await response.json();
this.detialsResult = responseorderhistory.orderHistory_Outputs;
return this.detialsResult;
}

async GeneralDetials(item) {

  const data = {FromDate: item.afrom,           ToDate: item.ato,
  VisitID: item.VisitId,                          SampleID: item.VisitId,
  WorkCenterID: item.wcenter,                      CategoryID: item.ecategory,
  TestID: item.test ,                          MaxStatusID: item.maxstatus,
  MinStatusID: item.minstatus,                      ClinicID: item.clinic,
  RegCenterID: item.center,                     PriorityID: item.priority,
  ResultModule: 1 };
  // const data = { LabId : this.userData.LabID };
 const bodyobj = JSON.stringify(data);

 const request = new Request(baseURL + 'VisitTestResult/LoadTestDetailes', {
 method: 'POST',
 body: bodyobj
 });
 request.headers.delete('Content-Type');
 request.headers.append('Content-Type', 'application/json');
 const response = await fetch( request);
const responsegeneraldetialsdata = await response.json();
this.generaldetials = responsegeneraldetialsdata.loadTests;
return this.generaldetials;
}
  //  await fetch( request)
  //  .then(response => response.json())
  //  .then(json => this.getloaddetialsrsponse(json))
  //  .catch(err => {
  //   this.toastr.error(err.message);
  //  });

  //  }
  //  getloaddetialsrsponse( resposne) {
  //  console.log('Second Table in Sample Collection' + resposne);
  //  this.detialsResult = resposne;
  //  }

     ////////////////////////////////////////



   async OrderContract(value) {
  // console.log(value);
  // this.userData = JSON.parse(localStorage.getItem('userProfile'));

  const data = { };
  // const data = { LabId : this.userData.LabID };
 const bodyobj = JSON.stringify(data);

 const request = new Request(baseURL + 'Contract/Get', {
 method: 'POST',
 body: bodyobj
 });
 request.headers.delete('Content-Type');
 request.headers.append('Content-Type', 'application/json');

 await fetch( request)
 .then(response => response.json())
 .then(json => this.getcontractrsponse(json))
 .catch(err => {
  this.toastr.error(err.message);
 });

 }
 getcontractrsponse( resposne) {
 console.log('from function get notionality' + resposne);
 this.contractresult = resposne;
 }
 ////////////////////////////////////////
async GetCurrancy(value) {
  // console.log(value);
  // this.userData = JSON.parse(localStorage.getItem('userProfile'));

  const data = { };
  // const data = { LabId : this.userData.LabID };
 const bodyobj = JSON.stringify(data);

 const request = new Request(baseURL + 'Currency/get', {
 method: 'POST',
 body: bodyobj
 });
 request.headers.delete('Content-Type');
 request.headers.append('Content-Type', 'application/json');

 await fetch( request)
 .then(response => response.json())
 .then(json => this.getcurrancyresponse(json))
 .catch(err => {
  this.toastr.error(err.message);
 });
 }
 getcurrancyresponse( resposne) {
 console.log('from function get notionality' + resposne);
 this.getcurrancy = resposne;
 }
//////////////////////////////////////////
async PurchaseOrder(value) {
  // console.log(value.pname);
  // console.log(value.pactive);
  // console.log(value.category);

  const data = { From: value.from , To: value.to , P_O_ID: value.poid , SupplierID: value.supplier ,
     StatusID: value.status };
const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'PurchaseOrder/Search_PurchaseOrder', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responseorderdata = await response.json();
this.purchaseorder = responseorderdata.pO_Searches;
return this.purchaseorder;
}

  ////////////////////////////////////////
// async PurchaseOrder(value) {
//   // console.log(value);

//   const data = { From: value.from , To: value.to , P_O_ID: value.poid , SupplierID: value.supplier ,
//      StatusID: value.status };
//   // const data = { LabId : this.userData.LabID };
//  const bodyobj = JSON.stringify(data);

//  const request = new Request(baseURL + 'PurchaseOrder/Search_PurchaseOrder', {
//  method: 'POST',
//  body: bodyobj
//  });
//  request.headers.delete('Content-Type');
//  request.headers.append('Content-Type', 'application/json');

//  await fetch( request)
//  .then(response => response.json())
//  .then(json => this.getpurchaseresponse(json.pO_Searches))
//  .catch(err => {
//   this.toastr.error(err.message);
//  });

//  }
//  getpurchaseresponse( resposne) {
//  console.log('from function get notionality' + resposne);
//  this.purchaseorder = resposne;
//  }

/////////////////////////////////////////
 async AddPurchaseOrder(value) {
  // console.log(value);

  const data = {PO: {ID: value.addid , POstatusID: value.addstatus,
    SupplierID : value.supplier , Comment: value.comment} };
  // const data = { LabId : this.userData.LabID };
 const bodyobj = JSON.stringify(data);

 const request = new Request(baseURL + 'PurchaseOrder/Post', {
 method: 'POST',
 body: bodyobj
 });
 request.headers.delete('Content-Type');
 request.headers.append('Content-Type', 'application/json');

 await fetch( request)
 .then(response => response.json())
 .then(json => this.getaddpurchaseresponse(json))
 .catch(err => {
  this.toastr.error(err.message);
 });

 }
 getaddpurchaseresponse( resposne) {
 console.log('from function get notionality' + resposne);
 this.addpurchaseorder = resposne;
 }
 ////////////////////////////////////////
async GetStoreMode(value) {
  this.userData = JSON.parse(localStorage.getItem('userProfile'));
  const data = { };
  // const data = { LabId : this.userData.LabID };
 const bodyobj = JSON.stringify(data);

 const request = new Request(baseURL + 'StoreMode/get', {
 method: 'POST',
 body: bodyobj
 });
 request.headers.delete('Content-Type');
 request.headers.append('Content-Type', 'application/json');

 await fetch( request)
 .then(response => response.json())
 .then(json => this.getGetstorersponse(json))
 .catch(err => {
  this.toastr.error(err.message);
 });

 }
 getGetstorersponse( resposne) {
 console.log('from function get notionality' + resposne);
 this.StoreResult = resposne;
 }
   ////////////////////////////////////////

   async PurchaseSupply(value) {
    // this.userData = JSON.parse(localStorage.getItem('userProfile'));
    const data = { };
    // const data = { LabId : this.userData.LabID };
   const bodyobj = JSON.stringify(data);

   const request = new Request(baseURL + 'Supplier/get', {
   method: 'POST',
   body: bodyobj
   });
   request.headers.delete('Content-Type');
   request.headers.append('Content-Type', 'application/json');

   await fetch( request)
   .then(response => response.json())
   .then(json => this.getsupplyorderrsponse(json))
   .catch(err => {
    this.toastr.error(err.message);
   });

   }
   getsupplyorderrsponse( resposne) {
   console.log('from function get notionality' + resposne);
   this.SupplyOrder = resposne;
   }

 ////////////////////////////////////////

 async PurchaseItem(value) {
  this.userData = JSON.parse(localStorage.getItem('userProfile'));
  const data = {};
  // const data = { LabId : this.userData.LabID };
 const bodyobj = JSON.stringify(data);

 const request = new Request(baseURL + 'Item/get', {
 method: 'POST',
 body: bodyobj
 });
 request.headers.delete('Content-Type');
 request.headers.append('Content-Type', 'application/json');

 await fetch( request)
 .then(response => response.json())
 .then(json => this.getitemorderrsponse(json))
 .catch(err => {
  this.toastr.error(err.message);
 });

 }
 getitemorderrsponse( resposne) {
 console.log('from function get notionality' + resposne);
 this.ItemOrder = resposne;
 }


 ////////////////////////////////////////


   async Doctor(value) {
  // console.log(value);
  this.userData = JSON.parse(localStorage.getItem('userProfile'));

  const data = { LabId : 1 };
  // const data = { LabId : this.userData.LabID };
 const bodyobj = JSON.stringify(data);

 const request = new Request(baseURL + 'Doctor/get', {
 method: 'POST',
 body: bodyobj
 });
 request.headers.delete('Content-Type');
 request.headers.append('Content-Type', 'application/json');

 await fetch( request)
 .then(response => response.json())
 .then(json => this.getdoctorgetrsponse(json))
 .catch(err => {
  this.toastr.error(err.message);
 });

 }
 getdoctorgetrsponse( resposne) {
 console.log('from function get notionality' + resposne);
 this.GetDoctor = resposne;
 }


////////////////////////////////////////
async AddNationality(value) {
 // console.log(value);
 this.userData = JSON.parse(localStorage.getItem('userProfile'));

 const data = { LabId : 1 };
 // const data = { LabId : this.userData.LabID };
console.log('Get Nationality issss  :' + data);
const bodyobj = JSON.stringify(data);
console.log('Get Nationality issss  :' + bodyobj);

const request = new Request(baseURL + 'Nationality/get', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getNationalrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getNationalrsponse( resposne) {
console.log('from function get notionality' + resposne);
this.nationalities = resposne;
}
////////////////////////////////////////
async AddBloodGroup(value) {
 // console.log(value);
 this.userData = JSON.parse(localStorage.getItem('userProfile'));

 const data = { LabId : 1 };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'BloodGroup/get', {
method: 'POST',
 body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getbloodgrouprsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getbloodgrouprsponse( resposne) {
console.log(resposne);
console.log('from function blood group');
this.bloodGroups = resposne;
}

////////////////////////////////////////
async AddState(value) {
  // this.userData = JSON.parse(localStorage.getItem('userProfile'));

const data = { };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'State/get', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getstatersponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getstatersponse( resposne) {
console.log(resposne);
console.log('from function state');
this.states = resposne;
}


////////////////////////////////////////
async AddTitle(item) {
  this.userData = JSON.parse(localStorage.getItem('userProfile'));

const data = { GenderID: item.ID };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'Title/get', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.gettitlersponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
gettitlersponse( resposne) {
console.log(resposne);
console.log('from function state');
this.titles = resposne;
}
////////////////////////////////////////
async AddGender(value) {
  this.userData = JSON.parse(localStorage.getItem('userProfile'));

const data = { LabId: 1 };
const bodyobj = JSON.stringify(data);
const request = new Request(baseURL + 'Gender/get', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
await fetch( request)
.then(response => response.json())
.then(json => this.getGenderrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});
}
getGenderrsponse( resposne) {
console.log(resposne);
console.log('from function state');
this.genders = resposne;
}
////////////////////////////////////////
async AddCity(value) {
  this.userData = JSON.parse(localStorage.getItem('userProfile'));

const data = { LabId: 1 };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'City/get', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getcityrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getcityrsponse( resposne) {
console.log(resposne);
console.log('from function state');
this.cities = resposne;
}

////////////////////////////////////////
async AddCountry(value) {
  // this.userData = JSON.parse(localStorage.getItem('userProfile'));

const data = { };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'Country/get', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getcountryrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getcountryrsponse( resposne) {
console.log(resposne);
console.log('from function state');
this.countries = resposne;
}

//////////////////////////////////
// async GetLabInformation(value) {
//   // this.userData = JSON.parse(localStorage.getItem('userProfile'));

// const data = { };
// const bodyobj = JSON.stringify(data);

// const request = new Request(baseURL + 'Lab/get', {
// method: 'POST',
// body: bodyobj
// });
// request.headers.delete('Content-Type');
// request.headers.append('Content-Type', 'application/json');

// await fetch( request)
// .then(response => response.json())
// .then(json => this.LabInformationrespnse(json))
// .catch(err => {
//  this.toastr.error(err.message);
// });

// }
// LabInformationrespnse( resposne) {
// console.log(resposne);
// this.getlab = resposne;
// }


/////////////////////////////////////////
async GetLabInformation(value) {


  const data = {labs:{ id : 1}};

  const bodyobj = JSON.stringify(data);
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'Lab/get', {
    method: 'POST',
    body: bodyobj
});
 request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const LabInformationrespnse = await response.json();
this.getlab
 = LabInformationrespnse;
return this.getlab;
}

////////////////////////////////////////
async LabWithOutArray(value) {
  // this.userData = JSON.parse(localStorage.getItem('userProfile'));

const data = { };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'Lab/GetOneRowLab', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.responsewithoutarray (json))
.catch(err => {
 this.toastr.error(err.message);
});

}
responsewithoutarray( resposne) {
console.log(resposne);
this.noarray = resposne;
}


//////////////////////////////
async AddPatient(value) {
      console.log(value.fname);
      console.log(value.mname);
      console.log(value.lname);
      console.log(value.plabID);
      console.log(value.gender);
      console.log(value.title);
      console.log(value.dob);
      console.log(value.idno);
      console.log(value.mnumber);
      console.log(value.pnumber);
      console.log(value.nation);
      console.log(value.passportno);
      console.log(value.email);
      console.log(value.bgroup);
      console.log(value.country);
      console.log(value.state);
      console.log(value.city);
      console.log(value.detials);

  const data = {patientM: {FName: value.fname, MName: value.mname,
                           LName: value.lname, LabID: value.plabID,
                           GenderID: value.gender, TitleID: value.title,
                           DOB: value.dob,    ID: value.idno,
                           Mobile: value.mnumber, Phone: value.pnumber,
                           NationalityID: value.nation, PassportNo: value.passportno,
                           Email: value.email, BloodGroupID: value.bgroup,
                           country: value.country, state: value.state,
                           AddressCityID: value.city, AddressDetails: value.detials}};
  const bodyobj = JSON.stringify(data);
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'Patient/Post', {
    method: 'POST',
    body: bodyobj
});
 request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

 await fetch( request)
.then(response => response.json())
.then(json => this.getaddrsponse(json))
  .catch(err => {
     this.toastr.error(err.message);
  });
}
getaddrsponse( resposne) {
 console.log(resposne);
 console.log('from function');
 this.userData = resposne;
 this.toastr.success('Added Successfully');

}



////////////////////////////////////////
async GeneralTest(value) {
  this.userData = JSON.parse(localStorage.getItem('userProfile'));

const data = { LabId : 1};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'Test/Get', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.gettestrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
gettestrsponse( resposne) {
console.log(resposne);
console.log('from function state');
this.tests = resposne;
}

////////////////////////////////////////
async GetStatus(value) {
  this.userData = JSON.parse(localStorage.getItem('userProfile'));

const data = { LabId : 1};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'Status/get', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getgetstatusrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getgetstatusrsponse( resposne) {
console.log(resposne);
console.log('from function state');
this.getstatus = resposne;
}

////////////////////////////////////////
async GeneralPriority(value) {
  this.userData = JSON.parse(localStorage.getItem('userProfile'));
const data = { };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'Priority/Get', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getpriorityrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getpriorityrsponse( resposne) {
console.log(resposne);
console.log('from function state');
this.priorities = resposne;
}


////////////////////////////////////////
async GeneralWCenter(value) {
  this.userData = JSON.parse(localStorage.getItem('userProfile'));

  const data = { LabId: 1 };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'WorkCenter/get', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getWcenterrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getWcenterrsponse( resposne) {
console.log(resposne);
console.log('from function state');
this.workcenters = resposne;
}

////////////////////////////////////////
async MaximumStatus(value) {
  // this.userData = JSON.parse(localStorage.getItem('userProfile'));

  const data = { LabId: 1 };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'TestStatus/get', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getmaxstatusrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getmaxstatusrsponse( resposne) {
console.log(resposne);
console.log('from function state');
this.maxstatus = resposne;
}
////////////////////////////////////////
async GetCurrency(value) {
  // this.userData = JSON.parse(localStorage.getItem('userProfile'));

  const data = { LabId: 1 };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'Currency/get', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getcurrancygetrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getcurrancygetrsponse( resposne) {
console.log(resposne);
console.log('from function state');
this.currency = resposne;
}
//////////////////////////



async MinimumStatus(value) {
  this.userData = JSON.parse(localStorage.getItem('userProfile'));

  const data = { LabId: 1 };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'TestStatus/get', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getminstatusrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getminstatusrsponse( resposne) {
console.log(resposne);
console.log('from function state');
this.minstatus = resposne;
}

////////////////////////////////////////
async GeneralGategory(value) {
  // this.userData = JSON.parse(localStorage.getItem('userProfile'));

const data = {  };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'ClientCategory/get', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getgategoryrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getgategoryrsponse( resposne) {
console.log(resposne);
console.log('from function state');
this.categories = resposne;
}

////////////////////////////////////////
async GetPriceList(value) {
  // this.userData = JSON.parse(localStorage.getItem('userProfile'));

const data = {  };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'PriceList/get', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getpricersponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getpricersponse( resposne) {
console.log(resposne);
console.log('from function state');
this.GetPrice = resposne;
}


/////////////////////////////////////
async GeneralLab(value) {

  const data = {  FromDate_date: value.afrom,     ToDate_date: value.ato,
 CategoryID: value.ecategory,                  TestID: value.test,
 PriorityID: value.priority,                   ResultModule: 1,
 ProCenterID: 1,                                WorkCenterID: value.wcenter, 
 VisitId: value.visitid,                  SampleId: value.sampleid, 
 RegCenterId: value.center,               ClinicID: value.clinic,
 MinStatusID: value.minstatus,             MaxStatusID: value.maxstatus};

  // const data = {  FromDate_date:"2020-03-02T14:43:10.0912815+01:00", ToDate_date: "2020-03-02T14:43:10.0912815+01:00",
  //  PatientId: 1, CategoryID: 1,
  //   TestID: 1, PriorityID: 1, ResultModule: 1,
  //  TestStatusID: 18, ProCenterID: 1, WorkCenterID: 1, VisitId: 1,
  //   SampleId: 1, RegCenterId: 1, ClinicID: 1,
  //  StatusID: 1, MinStatusID: 1, MaxStatusID: 1};
  const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'VisitTestResult/Search_Validation',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responsegeneraldata = await response.json();
this.LabResult = responsegeneraldata.searchValidtions;
return this.LabResult;
}


//////////////////////////////////////
async Bacteriology(value) {
  console.log(value.bfrom);
  console.log(value.bto);
  console.log(value.bcenter);
  console.log(value.bwcenter);
  console.log(value.bcategory);
  console.log(value.btest);
  console.log(value.bminstatus);
  console.log(value.bmaxstatus);
  console.log(value.clinic);
  console.log(value.bpriority);
  console.log(value.bvisitid);
  console.log(value.bsampleid);

const data = {  FromDate_date: value.bfrom,       ToDate_date: value.bto,
CategoryID: value.bcategory,      TestID: value.btest,
PriorityID: value.bpriority,      ResultModule: 3,
ProCenterID: 0,                   WorkCenterID: value.bwcenter,
VisitId: value.bvisitid,          SampleId: value.bsampleid,
RegCenterId: value.bcenter,       ClinicID: value.clinic,
MinStatusID: value.bminstatus,    MaxStatusID: value.bmaxstatus};

 const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'VisitTestResult/Search_Validation',
                  {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responsebackdata = await response.json();
this.bacteriology = responsebackdata.searchValidtions;
return this.bacteriology;
}

/////////////////////////////////////////////

async Explanatory(value) {
  console.log('fromdate' + value.efrom);
  console.log('ToDate' + value.eto);
  console.log('RegCenter' + value.ecenter);
  console.log('WorkCenterID' + value.ewcenter);
  console.log('CategoryID' + value.ecategory);
  console.log('TestID' + value.etest);
  console.log('MinStatusID' + value.eminstatus);
  console.log('MaxStatusID' + value.emaxstatus);
  console.log('ClinicID' + value.clinic);
  console.log('PriorityID' + value.epriority);
  console.log('VisitId' + value.evisitid);
  console.log('SampleId' + value.esampleid);
  const data = {  FromDate_date: value.efrom,      ToDate_date: value.eto,
     CategoryID: value.ecategory,
     TestID: value.etest,                          PriorityID: value.epriority,
     ResultModule: 2,                              ProCenterID: 0,
     WorkCenterID: value.ewcenter,
     VisitId: value.evisitid,                      SampleId: value.esampleid,
     RegCenterId: value.ecenter,                   ClinicID: value.clinic,
     MinStatusID: value.eminstatus,
     MaxStatusID: value.emaxstatus,               };

const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'VisitTestResult/Search_Validation',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responseexplandata = await response.json();
this.explanatoryResult = responseexplandata.searchValidtions;
return this.explanatoryResult;
}
///////////////////////////////
async TestCategory(value) {
  console.log(value.testname);
  console.log(value.testactive);

  const data = {Name : value.testname, Active : value.testactive};
  // const data = {Name : 1, Active : 1};

  const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'TestCategory/DosearchTestCategory',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responsecategorydata = await response.json();
this.TestCategoryResult = responsecategorydata.testCategoryModels;
return this.TestCategoryResult;
}

///////////////////////////////
async SupplierInventry(value) {
  console.log(value.supplyname);
  console.log(value.supplysactive);
  // const data = {active: '1' , SearchName: "sample string 2"};
  const data = {active: value.supplysactive , SearchName: value.supplyname};
  const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Supplier/Dosearch_Supplier',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responsesupplydata = await response.json();
this.supplyresult = responsesupplydata.inventory_Suppliers;
return this.supplyresult;
}
// await fetch( request)
// .then(response => response.json())
// .then(json => this.getSupplyresponse(json.inventory_Suppliers))
// .catch(err => {
//  this.toastr.error(err.message);
// });

// }
// getSupplyresponse( resposne) {
// console.log(resposne);
// console.log('from function');
// this.supplyresult = resposne;
// console.log(this.TestCategoryResult);

// }


///////////////////////////////
async AddSupplyInventry(value) {
  console.log(value.currencies);
  console.log(value.supplyid);
  console.log(value.addname);
  console.log(value.supplyaddress);
  console.log(value.vat);
  console.log(value.contanctname);
  console.log(value.supplyphone);
  console.log(value.supplymail);
  console.log(value.supplypayment);
  console.log(value.supplypname);
  console.log(value.supplyactive);
  // const data = {active: '1' , SearchName: "sample string 2"};
  const data = {inventory_Supplier: {ID: value.supplyid, Name : value.addname, Address : value.supplyaddress,
    VatRegNo: value.vat , ContactName: value.contanctname , Mail: value.supplymail, Phone : value.supplyphone,
    PaymentDays: value.supplypname , CurrencyID : value.currencies , PaymentTypeID : value.supplypayment,
    Active: value.supplyactive  }};
  const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Supplier/Post',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getaddSupplyresponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getaddSupplyresponse( resposne) {
console.log(resposne);
console.log('from function');
this.addsupplyresult = resposne;
this.toastr.success('Successfully Added!');

}
///////////////////////////////
async InventryLocation(value) {
  console.log(value.locationname);
  console.log(value.locationactive);
  console.log(value.locationsite);
  const data = {Name: value.locationname , active : value.locationactive , SiteID : value.centers};
  const bodyobj = JSON.stringify(data);
const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Location/SearchLocation',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responselocationdata = await response.json();
this.searchlocation = responselocationdata.locations;
return this.searchlocation;
}
// await fetch( request)
// .then(response => response.json())
// .then(json => this.getlocationryrsponse(json.locations))
// .catch(err => {
//  this.toastr.error(err.message);
// });
// }
// getlocationryrsponse( resposne) {
// console.log(resposne);
// console.log('from function');
// this.searchlocation = resposne;
// console.log(this.searchlocation);
// }

///////////////////////////////
async AddLocation(value) {
  // console.log(value.locationname);
  // console.log(value.locationactive);
  // console.log(value.locationsite);
  const data = {location : {ID: value.addid  , Name: value.addname,
  StoreModeID: value.stores , SiteID: value.centers , Active: value.addactive , CreateUID: '7' , ModifyUID: '9'}};
  const bodyobj = JSON.stringify(data);
const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Location/Post',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getaddlocationryrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});
}
getaddlocationryrsponse( resposne) {
console.log(resposne);
console.log('from function');
this.addlocation = resposne;
this.toastr.success('Successfully Added!');
console.log(this.addlocation);
}


///////////////////////////////
async InventryItem(value) {
  console.log(value.nameitem);
  console.log(value.activeitem);
  const data = {Name: value.nameitem , active: value.activeitem };
  //  const data = {Name: 'sample string 2' , active: '1' };
  const bodyobj = JSON.stringify(data);
const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Item/Dosearch_Item',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responseitemdata = await response.json();
this.itemresult = responseitemdata.Items;
return this.itemresult;
}
// await fetch( request)
// .then(response => response.json())
// .then(json => this.getitemresponse(json.Items))
// .catch(err => {
//  this.toastr.error(err.message);
// });
// }
// getitemresponse( resposne) {
// console.log(resposne);
// console.log('from function');
// this.itemresult = resposne;
// console.log(this.uomresult);
// }

///////////////////////////////
async AddItemInventry(value) {
  console.log(value.nameitem);
  console.log(value.activeitem);
  const data = {item : { ID : value.id , Name : value.addname , Description: value.description , ReferenceNo: value.refno,
    SupplierID: value.supplier , Price : value.listprice , Active: value.supplyactive , PackSize: value.packsize ,
    PrimaryUOMID: value.primary , UOMfactor: value.factor , SecondaryUOMID: value.secondry , OpenBalance: value.openbalance,
    MinLevel: value.minlevel , SecurityLevel: value.securitylevel , ExpirationControlled:  value.expiration,
    ExpiryDays: value.days , LotControlled: value.lot} };
  //  const data = {Name: 'sample string 2' , active: '1' };
  const bodyobj = JSON.stringify(data);
const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Item/Post',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getadditemresponse(json.Items))
.catch(err => {
 this.toastr.error(err.message);
});
}
getadditemresponse( resposne) {
console.log(resposne);
console.log('from function');
this.itemresult = resposne;
console.log(this.uomresult);
}


///////////////////////////////
async InventryUOM(value) {
  console.log(value.uname);
  console.log(value.uactive);
  const data = {Name: value.uname , active: value.uactive };
  //  const data = {Name: 'sample string 1' , active: '2' };
  const bodyobj = JSON.stringify(data);
const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'UOM/Dosearch_UOM',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responseuomdata = await response.json();
this.uomresult = responseuomdata.UOM_Models;
return this.uomresult;
}
// await fetch( request)
// .then(response => response.json())
// .then(json => this.getuomresponse(json.UOM_Models))
// .catch(err => {
//  this.toastr.error(err.message);
// });
// }
// getuomresponse( resposne) {
// console.log(resposne);
// console.log('from function');
// this.uomresult = resposne;
// console.log(this.uomresult);
// }

///////////////////////////////
async AddUOMInventry(value) {
  console.log(value.addid);
  console.log(value.addname);
  console.log(value.addactive);
  const data = {UOM: {Name: value.addname , Active: value.addactive , ID: value.addid }};
  //  const data = {Name: 'sample string 1' , active: '2' };
  const bodyobj = JSON.stringify(data);
const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'UOM/Post',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getadduomresponse(json))
.catch(err => {
 this.toastr.error(err.message);
});
}
getadduomresponse( resposne) {
console.log(resposne);
console.log('from function');
this.adduom = resposne;
this.toastr.success('Successfully Added!');

}

//////////////////////////////////

async addCategory(value) {
  console.log(value.testid);
  console.log(value.testname2);
  console.log(value.testprint);
  console.log(value.active2);

  const data = {testCategoryModel: {ID : value.testid , Name : value.testname2 , PrintName : value.testprint ,
    Active: value.active2 }};
  const bodyobj = JSON.stringify(data);
const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'TestCategory/Post',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
await fetch( request)
.then(response => response.json())
.then(json => this.getAddCategoryrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});
}
getAddCategoryrsponse( resposne) {
console.log(resposne);
console.log('from function');
this.toastr.success('Successfully Added!');
this.testCategory = resposne;
}

//////////////////////////////////

async addSubCategory(value) {
  console.log(value.subid);
  console.log(value.subname2);
  console.log(value.subprint);
  console.log(value.suborder);

  const data = {testSubCategoryModel: {ID : value.subid , Name : value.subname2 , PrintName : value.subprint,
     DisplayOrde: value.suborder}};
  const bodyobj = JSON.stringify(data);
const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'TestSubCategory/Post',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
await fetch( request)
.then(response => response.json())
.then(json => this.getAddSubCategoryrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});
}
getAddSubCategoryrsponse( resposne) {
console.log(resposne);
console.log('from function');
this.toastr.success('Successfully Added!');
this.subCategory = resposne;
}


//////////////////////////////////

async addTestQuestion(value) {
  console.log(value.tid);
  console.log(value.tquestion);

  const data = {Question: {ID : value.tid , Question : value.tquestion}};
  const bodyobj = JSON.stringify(data);
const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Question/Post',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
await fetch( request)
.then(response => response.json())
.then(json => this.getAddQuestionrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});
}
getAddQuestionrsponse( resposne) {
console.log(resposne);
console.log('from function');
this.toastr.success('Successfully Added!');
this.addQuestion = resposne;
}


//////////////////////////////////

async addTestMethodology(value) {
  console.log(value.testmid);
  console.log(value.testmname);

  const data = {TestMethodologyModel: {ID : value.testmid , Name : value.testmname}};
  const bodyobj = JSON.stringify(data);
const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'TestMethodology/Post',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
await fetch( request)
.then(response => response.json())
.then(json => this.getAddMethodologyrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});
}
getAddMethodologyrsponse( resposne) {
console.log(resposne);
console.log('from function');
this.toastr.success('Successfully Added!');
this.addMethodology = resposne;
}


//////////////////////////////////

async addSampleType(value) {
  console.log(value.sampleid);
  console.log(value.samplename2);
  console.log(value.samplecontainer);

  const data = {sampleTypeModel: {ID : value.sampleid, ContainerID: value.samplecontainer , Name : value.samplename2}};
  const bodyobj = JSON.stringify(data);
const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'SampleType/Post',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
await fetch( request)
.then(response => response.json())
.then(json => this.getAddSampleTypersponse(json))
.catch(err => {
 this.toastr.error(err.message);
});
}
getAddSampleTypersponse( resposne) {
console.log(resposne);
console.log('from function');
this.toastr.success('Successfully Added!');
this.addSample = resposne;
}


//////////////////////////////////

async AddPricingCurrency(value) {
  console.log(value.currencyid);
  console.log(value.currencycode);
  console.log(value.currencyname);
  console.log(value.currencyactive);

  const data = {currencyModel: {ID : value.currencyid , ISOcode: value.currencycode ,
     Name : value.currencyname  , Active : value.currencyactive}};
  const bodyobj = JSON.stringify(data);
const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Currency/Post',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
await fetch( request)
.then(response => response.json())
.then(json => this.getAddCurrencyrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});
}
getAddCurrencyrsponse( resposne) {
console.log(resposne);
console.log('from function');
this.toastr.success('Successfully Added!');
this.addCurency = resposne;
}

//////////////////////////////////
async AddBranch(value) {
const data = {branch: {id : value.upid , 
  country_id: value.upcountries , state_id : value.upstates , 
  city_id : value.upcities , name : value.upname , active : value.upactive}};
  const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Branch/Post', {
method: 'POST',
body: bodyobj
});

request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
await fetch( request)
.then(response => response.json())
.then(json => this.getBranchResponse(json))
.catch(err => {
this.toastr.error(err.message);
});
}
getBranchResponse( resposne) {
console.log(resposne);
console.log('from function');
this.toastr.success('Successfully Added!');
this.addBranch = resposne;
}
//////////////////////////////////
async UpdateBranch(value) {
const data = {branch: {id : value.upid , 
      country_id: value.upcountries , state_id : value.upstates , 
      city_id : value.upcities , name : value.upname , active : value.upactive}};const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Branch/Edit', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const getupBranchResponse = await response.json();
this.upBranch = getupBranchResponse.branch;
this.toastr.success('Successfully updated!');

return this.upBranch;
}


//////////////////////////////////
async UpdateLabInfo(value) {
  const data = {Lab: { id: 1,
    name: value.labname , 
    address : value.labaddress , 
    mobile : value.labmobile , 
    phone : value.labphone ,
    fax : value.labfax ,
    hotline : value.hotline , 
    website  : value.website ,
    webresult : value.webresult}};
        
        const bodyobj = JSON.stringify(data);
  
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'Lab/Edit', {
  method: 'POST',
  body: bodyobj
  });
  request.headers.delete('Content-Type');
  request.headers.append('Content-Type', 'application/json');
  const response = await fetch( request);
  const getuplabResponse = await response.json();
  this.uplab = getuplabResponse.Lab;
  this.toastr.success('Successfully updated!');
  
  return this.uplab;
  }
  
//////////////////////////////////
async addclientCategory(value) {
  console.log(value.clientid);
  console.log(value.clientname);
  console.log(value.clientactive);

  const data = {clientCategory: {ID : value.clientid , ISOcode: '1' , Name : value.clientname , Active : value.clientactive}};
  const bodyobj = JSON.stringify(data);
const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'ClientCategory/Post',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
await fetch( request)
.then(response => response.json())
.then(json => this.getAddClientrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});
}
getAddClientrsponse( resposne) {
console.log(resposne);
console.log('from function');
this.toastr.success('Successfully Added!');
this.addClientCategory = resposne;
}
///////////////////////////////////////////
async AddProfile(value) {
  console.log(value.idprofile);
  console.log(value.nameprofile);
  console.log(value.genderprofile);
  console.log(value.activeprofile);
  console.log(value.cptprofile);
  console.log(value.printprofile);

  const data = {profileModel: {ID : value.idprofile , PrintName: value.printprofile ,
     Name : value.nameprofile , Active : value.activeprofile , GenderID: value.genderprofile, HIS_Code: value.cptprofile}};
  const bodyobj = JSON.stringify(data);
const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Profile/Post',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
await fetch( request)
.then(response => response.json())
.then(json => this.getAddprofilersponse(json))
.catch(err => {
 this.toastr.error(err.message);
});
}
getAddprofilersponse( resposne) {
console.log(resposne);
console.log('from function');
this.toastr.success('Successfully Added!');
this.addProfile = resposne;
}


//////////////////////////////////////////
async AddTest(value) {
  // console.log(value.idprofile);
  // console.log(value.nameprofile);
  // console.log(value.genderprofile);
  // console.log(value.activeprofile);
  // console.log(value.cptprofile);
  // console.log(value.testname);

  const data = {testModel: {ID : value.testid ,
     HIS_Code: value.testcpt ,
     Name : value.testname ,
     PrintName : value.testprint ,
     GenderID: value.testgender ,
     ShortName: value.testshort,
     TestFooter: value.testfooter ,
     TestInstruction: value.testinstructor ,
     Active : value.testactive ,
     Requestable: value.testrequest ,
     SupressName : value.testsup ,
     SeperatePage : value.testpage ,
     NoOfBarCode: value.testbar ,
     ResultDue:  value.testresult,
     DisplayOrder: value.testdisplay ,
     TestCategoryID: value.testcategory,
     TestSubCategoryID : value.testsub ,
     SampleTypeID: value.testsample ,
    PrintPrvRslt : value.testprevious ,
    ResultReportID: value.testreport ,
   ResultEntryModuleID: value.testresult}};

  const bodyobj = JSON.stringify(data);
const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Test/Post',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
await fetch( request)
.then(response => response.json())
.then(json => this.getAddtestrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});
}
getAddtestrsponse( resposne) {
console.log(resposne);
console.log('from function');
this.toastr.success('Successfully Added!');
this.addTest = resposne;
}
//////////////////////////////////

async AddReferralDoctor(value) {
  console.log(value.doctorspeciality);
  console.log(value.doctoractive);
  console.log(value.firstname);
  console.log(value.middlename);
  console.log(value.lastname);
  console.log(value.fax);
  console.log(value.email);
  console.log(value.address);
  console.log(value.weblogin);
  console.log(value.webpassword);
  console.log(value.doctorid);
  console.log(value.clientactive);
  console.log(value.phone);

  const data = {doctor: {ID : value.doctorid , FName: value.firstname , MName : value.middlename , LName : value.lastname,
                         Fax : value.fax , Phone: value.phone , EMail : value.email , Address : value.address,
                         SpecialityID : value.doctorspeciality , Active: value.doctoractive ,
                          WebUID : value.weblogin , WebPass : value.webpassword}};
  const bodyobj = JSON.stringify(data);
const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Doctor/Post',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
await fetch( request)
.then(response => response.json())
.then(json => this.getAdddoctorrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});
}
getAdddoctorrsponse( resposne) {
console.log(resposne);
console.log('from function');
this.toastr.success('Successfully Added!');
this.addDoctorResult = resposne;
}


//////////////////////////////////

async AddPricingPayer(value) {
  console.log(value.payerid);
  console.log(value.payername);
  console.log(value.payerpricelist);
  console.log(value.payercurrency);
  console.log(value.payerdiscount);
  console.log(value.payeractive);
  console.log(value.payercategory);
  console.log(value.payerweblogin);
  console.log(value.payerwebpassword);
  console.log(value.payerallow);
  console.log(value.payeradvanced);

  const data = {client: {ID : value.payerid , Name: value.payername , PricelistID : value.payerpricelist ,
   AllowDiscount : value.payerallow, AdvanceAmount : value.payeradvanced , WebUserID: value.payerweblogin
    , WebPassword : value.payerwebpassword , Active : value.payeractive}};
  const bodyobj = JSON.stringify(data);
const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Client/Post',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
await fetch( request)
.then(response => response.json())
.then(json => this.getAddpayerrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});
}
getAddpayerrsponse( resposne) {
console.log(resposne);
console.log('from function');
this.toastr.success('Successfully Added!');
this.addPayer = resposne;
}

//////////////////////////////////

async AddReferralClinic(value) {
  console.log(value.clinicspeciality);
  console.log(value.clinicactive2);
  console.log(value.clinicname);
  console.log(value.clinicincharge);
  console.log(value.clinicphone);
  console.log(value.clinicfax);
  console.log(value.clinicemail);
  console.log(value.clinicaddress);
  console.log(value.clinicweblogin);
  console.log(value.clinicwebpassword);
  console.log(value.clinicid);
  console.log(value.clinicpriority);


  const data = {clinic: {ID : value.clinicid , Name: value.clinicname , DoctorInCharge : value.clinicincharge ,
   Phone : value.clinicphone, Fax : value.clinicfax , PriorityID: value.clinicpriority,
    Email : value.clinicemail , Address : value.clinicaddress,  SpecialityID : value.clinicspeciality ,
    Active: value.clinicactive2 , WebUID : value.clinicweblogin , WebPass : value.clinicwebpassword}};
  const bodyobj = JSON.stringify(data);
const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Clinic/PostClinic',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
await fetch( request)
.then(response => response.json())
.then(json => this.getAddClinicrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});
}
getAddClinicrsponse( resposne) {
console.log(resposne);
console.log('from function');
this.toastr.success('Successfully Added!');
this.addClinicResult = resposne;
}

//////////////////////////////////

async addReferralSpeciality(value) {
  console.log(value.idss);
  console.log(value.namess);


  const data = {speciality: {ID : value.idss , Name: value.namess}};
  const bodyobj = JSON.stringify(data);
const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Speciality/Post',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
await fetch( request)
.then(response => response.json())
.then(json => this.getAddspecialityrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});
}
getAddspecialityrsponse( resposne) {
console.log(resposne);
console.log('from function');
this.toastr.success('Successfully Added!');
this.addSpeciality = resposne;
}

//////////////////////////////////

async addReferralPriority(value) {
  console.log(value.priorityname);
  console.log(value.priorityname);


  const data = {priority: {ID : value.priorityname , Name: value.priorityname}};
  const bodyobj = JSON.stringify(data);
const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Priority/Post',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
await fetch( request)
.then(response => response.json())
.then(json => this.getAddPriorityrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});
}
getAddPriorityrsponse( resposne) {
console.log(resposne);
console.log('from function');
this.toastr.success('Successfully Added!');
this.addPriority = resposne;
}

//////////////////////////////////

async addGrossPricelist(value) {
  console.log(value.namepricelist);
  console.log(value.idpricelist);
  console.log(value.currencypricelist);
  console.log(value.activepricelist);


  const data = {pricelist: {ID : value.idpricelist , Name: value.namepricelist ,
    CurrencyID: value.currencypricelist , Active: value.activepricelist}};
  const bodyobj = JSON.stringify(data);
const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'PriceList/Post',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
await fetch( request)
.then(response => response.json())
.then(json => this.getAddPricelistrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});
}
getAddPricelistrsponse( resposne) {
console.log(resposne);
console.log('from function');
this.toastr.success('Successfully Added!');
this.addPricelist = resposne;
}
//////////////////////////////////

async AddLabInfo(value) {

  const data = {Lab: {name: value.labname , website: value.website , webresult: value.webresult,
    hotline: value.hotline , address :  value.labaddress , fax: value.labfax , phone: value.labphone,
    mobile: value.labmobile}};
  const bodyobj = JSON.stringify(data);
const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Lab/Post',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
await fetch( request)
.then(response => response.json())
.then(json => this.getLabInforsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});
}
getLabInforsponse( resposne) {
console.log(resposne);
console.log('from function');
this.toastr.success('Successfully Added!');
this.labinfo = resposne;
}
//////////////////////////////////

async addTestContainer(value) {
  console.log(value.idcontainer);
  console.log(value.namecontainer);
  console.log(value.capcontainer);

  const data = {containerModel: {ID : value.idcontainer , CAPcolor: value.capcontainer, Name : value.namecontainer}};
  const bodyobj = JSON.stringify(data);
const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Container/Post',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
await fetch( request)
.then(response => response.json())
.then(json => this.getAddContainerrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});
}
getAddContainerrsponse( resposne) {
console.log(resposne);
console.log('from function');
this.toastr.success('Successfully Added!');
this.addContainer = resposne;
}

///////////////////////////////
async SubCategory(value) {
  console.log(value.subname);

const data =   {Search_Name : value.subname };
const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'TestSubCategory/DosearchTestSubCategory',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responsesubcategorydata = await response.json();
this.SubCategoryResult = responsesubcategorydata.testSubCategoryModels;
return this.SubCategoryResult;
}
// await fetch( request)
// .then(response => response.json())
// .then(json => this.gettestsubrsponse(json.testSubCategoryModels))
// .catch(err => {
//  this.toastr.error(err.message);
// });

// }
// gettestsubrsponse( resposne) {
// console.log(resposne);
// console.log('from function');
// this.SubCategoryResult = resposne;
// console.log(this.SubCategoryResult);

// }

///////////////////////////////
async TestQuestion(value) {
  console.log(value.question);

const data = {Question_Search : value.question , testid : '1'};
const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'TestQuestion/SeatchTestQuestion',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responsequestiondata = await response.json();
this.QuestionResult = responsequestiondata.testQuestionModels;
return this.QuestionResult;
}
// await fetch( request)
// .then(response => response.json())
// .then(json => this.gettestquestionrsponse(json.testQuestionModels))
// .catch(err => {
//  this.toastr.error(err.message);
// });

// }
// gettestquestionrsponse( resposne) {
// console.log(resposne);
// console.log('from function');
// this.QuestionResult = resposne;
// console.log(this.QuestionResult);

// }

///////////////////////////////
async TestMethodolgy(value) {
  console.log(value.methodname);
const data =  {Search_Name : value.methodname };
const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'TestMethodology/DosearchTestMethedology',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responsemethoddata = await response.json();
this.MethodologyResult = responsemethoddata.testMethodologyModels;
return this.MethodologyResult;
}
// await fetch( request)
// .then(response => response.json())
// .then(json => this.gettestmethodersponse(json.testMethodologyModels))
// .catch(err => {
//  this.toastr.error(err.message);
// });

// }
// gettestmethodersponse( resposne) {
// console.log(resposne);
// console.log('from function');
// this.MethodologyResult = resposne;
// console.log(this.MethodologyResult);

// }
///////////////////////////////
async TestContainer(value) {
  console.log(value.containername);

  const data = {Search_Name : value.containername};
const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Container/DosearchContainer',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responsecontainerdata = await response.json();
this.ContainerResult = responsecontainerdata.containerModels;
return this.ContainerResult;
}
// await fetch( request)
// .then(response => response.json())
// .then(json => this.getcontainerrsponse(json.containerModels))
// .catch(err => {
//  this.toastr.error(err.message);
// });

// }
// getcontainerrsponse( resposne) {
// console.log(resposne);
// console.log('from function');
// this.ContainerResult = resposne;
// console.log(this.ContainerResult);

// }

///////////////////////////////
async SampleType(value) {
  console.log(value.samplename);
  console.log(value.container);

  const data = {Search_Name : value.samplename , ContainerID : value.container};
const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'SampleType/Search_SampleType',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responsesampledata = await response.json();
this.SampleResult = responsesampledata.search_Samples;
return this.SampleResult;
}
// await fetch( request)
// .then(response => response.json())
// .then(json => this.getsamplersponse(json.sampleTypeModels))
// .catch(err => {
//  this.toastr.error(err.message);
// });

// }
// getsamplersponse( resposne) {
// console.log(resposne);
// console.log('from function');
// this.SampleResult = resposne;
// console.log(this.SampleResult);
// }

////////////////////////////////////////
async SampleContainer(value) {
  this.userData = JSON.parse(localStorage.getItem('userProfile'));

const data = { LabId: 1 };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'Container/Get', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getsamplecontainerrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getsamplecontainerrsponse( resposne) {
console.log(resposne);
console.log('from function state');
this.containers = resposne;
}

////////////////////////////////////////
async TestSubCategory(value) {
  this.userData = JSON.parse(localStorage.getItem('userProfile'));

const data = { LabId: 1 };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'TestSubCategory/get', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.gettestsubcategoryrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
gettestsubcategoryrsponse( resposne) {
console.log(resposne);
console.log('from function state');
this.subcategory = resposne;
}
////////////////////////////////////////
async TestSample(value) {
  // this.userData = JSON.parse(localStorage.getItem('userProfile'));

const data = { LabId: 1 };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'SampleType/get', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.gettestsamplersponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
gettestsamplersponse( resposne) {
console.log(resposne);
console.log('from function state');
this.samples = resposne;
}
////////////////////////////////////////
async ResultReport(value) {
  // this.userData = JSON.parse(localStorage.getItem('userProfile'));

const data = { LabId: 1 };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'ResultReport/get', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getresultreportrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getresultreportrsponse( resposne) {
console.log(resposne);
console.log('from function state');
this.result = resposne;
}
////////////////////////////////////////
async GetClinicPriority(value) {
  // this.userData = JSON.parse(localStorage.getItem('userProfile'));

const data = { };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'Priority/get', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getclinicpriorityrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getclinicpriorityrsponse( resposne) {
console.log(resposne);
console.log('from function state');
this.Cpriority = resposne;
}
////////////////////////////////////////
async GetClinicSpeciality(value) {
const data = { };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'Speciality/GetSpeciality', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getclinicspecrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});
}
getclinicspecrsponse( resposne) {
console.log(resposne);
console.log('from function state');
this.Cspeciality = resposne;
}
///////////////////////////////
async ResultField(value) {
  console.log(value.rname);

  const data = {Search_Name : value.rname };
const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'ResultField/DosearchResultField',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responseresultdata = await response.json();
this.ResultSearch = responseresultdata.resultFieldModel;
return this.ResultSearch;
}
// await fetch( request)
// .then(response => response.json())
// .then(json => this.getresultrsponse(json.resultFieldModel))
// .catch(err => {
//  this.toastr.error(err.message);
// });

// }
// getresultrsponse( resposne) {
// console.log(resposne);
// console.log('from function');
// this.ResultSearch = resposne;
// console.log(this.ResultSearch);
// }


///////////////////////////////
async ConfigTest(value) {
  console.log(value.tname);
  console.log(value.cpt);
  console.log(value.testcategory);
  console.log(value.tactive);

  const data = {search_Name : value.tname , Active : value.tactive, CatID : value.testcategory  , CPT : value.cpt};
const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Test/DosearchTest',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responsetestdata = await response.json();
this.TestResult = responsetestdata.testModels;
return this.TestResult;
}
// await fetch( request)
// .then(response => response.json())
// .then(json => this.gettestresponse(json.testModels))
// .catch(err => {
//  this.toastr.error(err.message);
// });

// }
// gettestresponse( resposne) {
// console.log(resposne);
// console.log('from function');
// this.TestResult = resposne;
// console.log(this.TestResult);

// }

//////////////////////////////////////////
async ConfigProfile(value) {
  console.log(value.pname);
  console.log(value.pcpt);
  console.log(value.pactive);


  const data = { Search_Name: value.pname, CPT: value.pcpt, Active: value.pactive};

  const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Profile/DosearchProfile', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responseprofiledata = await response.json();
this.ProfileResult = responseprofiledata.profileModels;
return this.ProfileResult;
}


//////////////////////////////////////////
async StoreMode(value) {
  console.log(value.modename);
  console.log(value.modeactive);

  // const data = { active: '1', SearchName: 'sample string 2'};
  const data = { active: value.modeactive, SearchName: value.modename};
  const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'StoreMode/Dosearch_StoreMode', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responsestoredata = await response.json();
this.storeresult = responsestoredata.StoreModes;
return this.storeresult;
}
// await fetch( request)
// .then(response => response.json())
// .then(json => this.getstorersponse(json.StoreModes))
// .catch(err => {
//  this.toastr.error(err.message);
// });

// }
// getstorersponse( resposne) {
// console.log(resposne);
// console.log('from function');
// this.storeresult = resposne;
// console.log(this.storeresult);
// }
//////////////////////////////////////////
async addStoreMode(value) {
  console.log(value.storeid);
  console.log(value.storename);
  console.log(value.storeactive);

  // const data = { addStoreMode: { ID : value.storeid, LabID : '5' , Name : value.storename , Active : value.storeactive ,
  // CreateUID : '5' , ModifyUID : '7' }};
  const data = { storeMode: { ID : value.storeid, Name : value.storename , Active : value.storeactive}};

  const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'StoreMode/Post', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
await fetch( request)
.then(response => response.json())
.then(json => this.getaddstorersponse(json))
.catch(err => {
 this.toastr.error(err.message);
});
}
getaddstorersponse( resposne) {
console.log(resposne);
console.log('from function');
this.addstoreresult = resposne;
this.toastr.success('Successfully Added!');
console.log(this.addstoreresult);
}

///////////////////////////////
async addRackArchiving(value) {
  console.log(value.description);
  console.log(value.row);
  console.log(value.column);


  const data = { rack:
    {Description: value.description , Rows : value.row , Columns: value.column}};

  const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Rack/Post', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getaddarchivingrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getaddarchivingrsponse( resposne) {
console.log(resposne);
console.log('from function');
this.addRackResult = resposne;
this.toastr.success('Successfully Added!');
console.log(this.addRackResult);

}
//////////////////////////////////////////
async SearchRack(value) {
  console.log(value.rack);
  console.log(value.rackid);
  console.log(value.aactive);


  const data = { RackID: value.rackid, Description: value.rack, Active: value.aactive};

  const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Rack/Dosearch_Archiving', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responserackdata = await response.json();
this.RackResult = responserackdata.racks;
return this.RackResult;
}
// await fetch( request)
// .then(response => response.json())
// .then(json => this.getarchivingrsponse(json.))
// .catch(err => {
//  this.toastr.error(err.message);
// });

// }
// getarchivingrsponse( resposne) {
// console.log(resposne);
// console.log('from function');
// this.RackResult = resposne;
// console.log(this.RackResult);

// }

///////////////////////////////
async GenerateInvoice(value) {
  console.log(value.bfrom);
  console.log(value.bto);
  console.log(value.gpayer);
  console.log(value.clinic);

// const data = {Start_date:'2020-02-16T10:54:00.1638025+01:00', End_date:'2020-02-16T10:54:00.1638025+01:00',
//  ClinicID: '1',
//    ClientID : '1'};

const data = {Start_date: value.bfrom, End_date: value.bto, ClinicID: value.clinic ,
  ClientID : value.gpayer};
const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Bill/searchBilling',
                   {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responsebilldata = await response.json();
this.GenerateInvoiceResult = responsebilldata.searchBills;
return this.GenerateInvoiceResult;
}
// await fetch( request)
// .then(response => response.json())
// .then(json => this.getgeneratersponse(json.searchBills))
// .catch(err => {
//  this.toastr.error(err.message);
// });

// }
// getgeneratersponse( resposne) {
// console.log(resposne);
// console.log('from function');
// this.GenerateInvoiceResult = resposne;
// console.log(this.GenerateInvoiceResult);

// }

///////////////////////////////////
async GeneratePayerInvoice(value) {
  this.userData = JSON.parse(localStorage.getItem('userProfile'));

const data = {};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'Client/get', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getpayerrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getpayerrsponse( resposne) {
console.log(resposne);
console.log('from function generatepayer');
this.clients = resposne;
}

///////////////////////////////////
async GenerateClinicInvoice(value) {
  console.log(value.clinic);

const data = { ClinicList : { Name: value.clinic}};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'Clinic/getClinic', {
method: 'GET'
// body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getclinicrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getclinicrsponse( resposne) {
console.log(resposne);
console.log('from function generateclinic');
this.userData = resposne;
}



//////////////////////////////////////////
async GrossPriseList(value) {
  console.log(value.gname);
  console.log(value.gactive);

const data = {Search_Name : value.gname, active : value.gactive};
const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'PriceList/DosearchPriceList', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responsegrossdata = await response.json();
this.PricelistResult = responsegrossdata.pricelistModels;
return this.PricelistResult;
}
// await fetch( request)
// .then(response => response.json())
// .then(json => this.getgrosspricersponse(json.pricelistModels))
// .catch(err => {
//  this.toastr.error(err.message);
// });

// }
// getgrosspricersponse( resposne) {
// console.log(resposne);
// console.log('from function');
// this.PricelistResult = resposne;
// console.log(this.PricelistResult);

// }

//////////////////////////////////////////
async PricingPayer(value) {
  console.log(value.pname);
  console.log(value.pactive);
  console.log(value.category);

const data = {Search_Name : value.pname, CatID: value.ecategory , Active : value.pactive};
const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Client/search_Payer', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responsepayerdata = await response.json();
this.PayerResult = responsepayerdata.clients;
return this.PayerResult;
}
// await fetch( request)
// .then(response => response.json())
// .then(json => this.getpricepayerrsponse(json.clients))
// .catch(err => {
//  this.toastr.error(err.message);
// });

// }
// getpricepayerrsponse( resposne) {
// console.log(resposne);
// console.log('from function');
// this.PayerResult = resposne;
// console.log(this.PayerResult);

// }

//////////////////////////////////////////
async ClientCategory(value) {
  console.log(value.name);

const data = {Search_Name: value.name};
const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'ClientCategory/DosearchClientCategory', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responseclientdata = await response.json();
this.ClientCategoryResult = responseclientdata.clientCategoryModels;
return this.ClientCategoryResult;
}


//////////////////////////////////////////
async SearchBranch(value) {

const data = {Name: value.name , Active: value.active};
const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Branch/SearchBranch', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responsebranches = await response.json();
this.Branches = responsebranches.searches;
return this.Branches;
}
//////////////////////////////////////////
async ReferralDoctor(value) {
  console.log(value.rdname);
  console.log(value.rdactive);

const data = {Search_Name: value.rdname, active : value.rdactive};
const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Doctor/SearchDoctor', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responsedoctordata = await response.json();
this.DoctorResult = responsedoctordata.doctors;
return this.DoctorResult;
}

//////////////////////////////////////////
async SearchCurrency(value) {


const data = {ISO_Code: value.iso, Active : value.cactive};
const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Currency/DosearchCurrency', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responsecurrencydata = await response.json();
this.CurrencyResult = responsecurrencydata.currencyModels;
return this.CurrencyResult;
}

//////////////////////////////////////////
async ReferralClinic(value) {
  console.log(value.rcname);
  console.log(value.rcactive);

const data = {Search_Name: value.rcname, active : value.active};
const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Clinic/SearchClinic', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responseclinicdata = await response.json();
this.ClinicResult = responseclinicdata.clinics;
return this.ClinicResult;
}
// await fetch( request)
// .then(response => response.json())
// .then(json => this.getrclinicrsponse(json.clinics))
// .catch(err => {
//  this.toastr.error(err.message);
// });

// }
// getrclinicrsponse( resposne) {
// console.log(resposne);
// console.log('from function');
// this.ClinicResult = resposne;
// console.log(this.ClinicResult);

// }

//////////////////////////////////////////
async ReferralSpeciality(value) {
  console.log(value.rsname);

const data = {Search_Name: value.rsname};
const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Speciality/Dosearchpeciality', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responsespecialitydata = await response.json();
this.SpecialityResult = responsespecialitydata.specialities;
return this.SpecialityResult;
}
// await fetch( request)
// .then(response => response.json())
// .then(json => this.getspecialityrsponse(json.specialities))
// .catch(err => {
//  this.toastr.error(err.message);
// });

// }
// getspecialityrsponse( resposne) {
// console.log(resposne);
// console.log('from function');
// this.SpecialityResult = resposne;
// console.log(this.SpecialityResult);
// }

//////////////////////////////////////////
async ReferralPriority(value) {
  console.log(value.rsname);

const data = {Name_Search: value.rsname };
const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Priority/DosearchPriority', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responseprioritydata = await response.json();
this.PriorityResult = responseprioritydata.priorities;
return this.PriorityResult;
}
// await fetch( request)
// .then(response => response.json())
// .then(json => this.getrpeiorityrsponse(json.priorities))
// .catch(err => {
//  this.toastr.error(err.message);
// });

// }
// getrpeiorityrsponse( resposne) {
// console.log(resposne);
// console.log('from function');
// this.PriorityResult = resposne;
// console.log(this.PricelistResult);
// }
//////////////////////////////////////////
// async AddressCountry(value) {
//   console.log(value.name);

// const data = {clientCategoryModels : {Name: '1'}};
// const bodyobj = JSON.stringify(data);

// const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
// const request = new Request(baseURL + 'Client/DosearchClient', {
// method: 'POST',
// body: bodyobj
// });
// request.headers.delete('Content-Type');
// request.headers.append('Content-Type', 'application/json');

// await fetch( request)
// .then(response => response.json())
// .then(json => this.getclientcategoryrsponse(json))
// .catch(err => {
//  this.toastr.error(err.message);
// });

// }
// getclientcategoryrsponse( resposne) {
// console.log(resposne);
// console.log('from function');
// this.userData = resposne;
// }
//////////////////////////////////////////
async SearchInvoice(value) {
  console.log(value.sfrom);
  console.log(value.sto);
  console.log(value.payer);
  console.log(value.active);
  console.log(value.bid);

  // const data = {Start_date : '2020-02-16T12:42:52.4638138+01:00', End_date : '2020-02-16T12:42:52.4638138+01:00',
  //   ClientID : '1' , active : };

const data = {Start_date : value.sfrom, End_date : value.sto,
   ClientID : value.payer , active : value.active , BillID: value.bid};

const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'Bill/Search_Invoice', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responsesearchdata = await response.json();
this.SearchInvoiceResult = responsesearchdata.searchInvoices;
return this.SearchInvoiceResult;
}
// await fetch( request)
// .then(response => response.json())
// .then(json => this.getsearchinvoicersponse(json.searchInvoices))
// .catch(err => {
//  this.toastr.error(err.message);
// });

// }
// getsearchinvoicersponse( resposne) {
// console.log(resposne);
// console.log('from function');
// this.SearchInvoiceResult = resposne;
// console.log(this.SearchInvoiceResult);

// }
////////////////////////////////////
async OrderEntry(value) {
  console.log(value.labid);
  console.log(value.nationalid);
  console.log(value.fullname);
  console.log(value.genderdob);
  console.log(value.contact);
  console.log(value.totalcredit);
  console.log(value.netcash);
  console.log(value.totalcash);
  console.log(value.received);
  console.log(value.discounttype);
  console.log(value.co);
  console.log(value.refund);
  console.log(value.amt);
  console.log(value.deposite);
  console.log(value.remaining);
  console.log(value.netcredit);
  console.log(value.requestid);
  console.log(value.requestdate);
  console.log(value.methode);
  console.log(value.clinic);
  console.log(value.doctors);
  console.log(value.walkin);
  console.log(value.other);
  console.log(value.payers);
  console.log(value.credit);
  console.log(value.contracts);
  console.log(value.copayment);
  console.log(value.percent);
  console.log(value.absolute);
  console.log(value.approval);
  console.log(value.mrn);
  console.log(value.card);
  console.log(value.claim);
  console.log(value.testsample);
  console.log(value.testgender);

const data = {orderEntery: {DoctorID: value.doctors , ClinicID: value.clinic , ClientID : '3',
patient: {ID: '1',
          LabID: value.labid ,
          NationalID: value.nationalid ,
          FName : value.fullname,
          MName: value.fullname ,
          LName: value.fullname ,
          TitleID: value.fullname,
          GenderID: value.genderdob ,
          Phone: value.contact,
          Mobile: value.contact,
          DOB:  value.genderdob},

visit: {ID: '1' ,
 PatientID: value.labid ,
 ClientID: value.payers,
 ContractID : value.contracts ,
 CoPayType: value.copayment,
 CoPayPercent: value.percent,
 ApprovalNo: value.approval ,
 ClaimNo: value.claim,
 CardNo: value.card ,
 CoPayAbsolute: value.absolute,
 TotalCashAmount: value.totalcash,
 FinalCoPayAmount: value.co ,
 NetCashAmount: value.netcash ,
 ReceivedAmount: value.received,
 RefundAmount: value.refund,
 Remaining: value.remaining,
 DiscountType: value.discounttype},

 test: {ID: '1',
 LabID: value.labid ,
 SampleTypeID: value.testsample ,
 GenderID: value.testgender,
 TestCategoryID: value.testcategory
}},
ApprovalNo: value.approval,
MRN: value.mrn,
Card_No: value.card,
Claim_No: value.claim,
 VisitID: '1'};


// const data = {orderEntery: {DoctorID: '1' , ClinicID: '2' , ClientID : '3',
// patient: {ID: '1' , LabID: '2' , NationalID: '4' , FName : 'sample string 5',
// MName: 'sample string 6' , LName: 'sample string 7' , TitleID: '8', GenderID: '9' , NationalityID: '10',
// Phone: 'sample string 11', Mobile: 'sample string 12', DOB: '2020-02-02T13:30:58.9589281+01:00'},
// visit: {ID: '1' , PatientID: '4' , ClientID: '10' , ContractID : '11' , CoPayType: 'sample string 16',
// CoPayPercent: 'sample string 17', ApprovalNo: 'sample string 13' , ClaimNo: 'sample string 12',
// CardNo: 'sample string 14' , RefNo : 'sample string 15'},
// visitItem: {ID: '1', LabID: '2', GrossRate: '6' , Discount: '7' , TotalRate: '8', PatRate: '9', InsRate: '10',
// Covered: '11'}},
// VisitID: '1'};

const bodyobj = JSON.stringify(data);

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
const request = new Request(baseURL + 'OrderEntery/Post', {
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getorderresultrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getorderresultrsponse( resposne) {
console.log(resposne);
console.log('from function');
this.orderresult = resposne;

}


// OrderEntry(value) {
//    const data = {'requestid': 'a',
//                  'requestdate': '1',
//                  'patientl': '1',
//                  'idno': '1',
//                  'tname': '1',
//                  'gdob': '1',
//                  'tele': '1',
//                  'clinic': '1',
//                  'doctors': '1',
//                  'tcredit': '1',
//                  'ncash': '1',
//                  'tcash': '1',
//                  'received': '1',
//                  'copayment': '1',
//                  'refund': '1',
//                  'discounttype': '1',
//                  'remaining': '1',
//                  'dicount': '1',
//                  'deposit': '1',
//                  'ncredit': '1',
//                  'methode': '1' };
//    console.log(data);
//    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
//    return this.http.post<any>(baseURL + 'Patient/Post', data, config)
//                              .map(res => {
//                                console.log(res);
//                                return res;
//                                },
//                                err => {
//                                  return err;
//                                }
//                               );
// }

/////////////////////////////////////////
async LoadPatient(value) {
const data = { PatientID: value };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'OrderEntery/LoadPatient', {
method: 'POSt',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getpatientrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getpatientrsponse( resposne) {
console.log(resposne);
console.log('from function state');
this.patients = resposne;
}

/////////////////////////////////////////
async GetLoginInformation(value) {
  this.userData = JSON.parse(localStorage.getItem('userProfile'));

const data = { username: 'a' , password: '1' , centerID: '1' };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'OrderEntery/LoadPatient', {
method: 'POSt',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getlogininforsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getlogininforsponse( resposne) {
console.log(resposne);
console.log('from function state');
this.logininfo = resposne;
}

/////////////////////////////////////////
async CenterCollection(value) {
  // this.userData = JSON.parse(localStorage.getItem('userProfile'));

const data = {  };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'Center/get', {
method: 'POSt',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getcenterrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getcenterrsponse( resposne) {
console.log(resposne);
console.log('from function state');
this.centers = resposne;
}
/////////////////////////////////////////
async Branch(value) {

const data = {  };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'Branch/GetBranch', {
method: 'POSt',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

await fetch( request)
.then(response => response.json())
.then(json => this.getbranchrsponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getbranchrsponse( resposne) {
console.log(resposne);
console.log('from function state');
this.branches = resposne;
}
/////////////////////////////////////////
async SystemProviders(value) {

  const data = {  };
  const bodyobj = JSON.stringify(data);
  
  const request = new Request(baseURL + 'System_Provider/get', {
  method: 'POSt',
  body: bodyobj
  });
  request.headers.delete('Content-Type');
  request.headers.append('Content-Type', 'application/json');
  
  await fetch( request)
  .then(response => response.json())
  .then(json => this.systemresponse(json))
  .catch(err => {
   this.toastr.error(err.message);
  });
  
  }
  systemresponse( resposne) {
  console.log(resposne);
  console.log('from function state');
  this.providers = resposne;
  }
//   /////////////////////////////////////////
// async Lab(value) {

//   const data = {  };
//   const bodyobj = JSON.stringify(data);
  
//   const request = new Request(baseURL + 'Lab/get', {
//   method: 'POSt',
//   body: bodyobj
//   });
//   request.headers.delete('Content-Type');
//   request.headers.append('Content-Type', 'application/json');
  
//   await fetch( request)
//   .then(response => response.json())
//   .then(json => this.GetLabResponse(json))
//   .catch(err => {
//    this.toastr.error(err.message);
//   });
  
//   }
//   GetLabResponse( resposne) {
//   console.log(resposne);
//   console.log('from function state');
//   this.GetLab = resposne;
//   }
  
/////////////////////////////////////////
async SampleCollection(value) {
  console.log(value.center2);
  console.log(value.forder);
  console.log(value.torder);
  console.log(value.status);
  console.log(value.patient);
  console.log(value.visite);
  console.log(value.sample);
  console.log(value.name);
  console.log(value.mrn);

  // const data = {CenterId: '4', FromDate_date: '2020-01-27 13:15:51', ToDate_date: '2020-01-27 13:15:51',
  //   PatientId: '4', VisitId: '4', StatusID: '4', Name: '4',
  //   SampleId: '4', MRN: '4'};

  const data = {CenterId: value.center2, FromDate_date: value.forder, ToDate_date: value.torder,
 PatientId: value.patient, VisitId: value.visite, StatusID: value.status, Name: value.name,
 SampleId: value.sample, MRN: value.mrn};
  const bodyobj = JSON.stringify(data);
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'VisitTest/Search_Simpling', {
    method: 'POST',
    body: bodyobj
});
 request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responsecollectiondata = await response.json();
this.collectionresult = responsecollectiondata.searches;
return this.collectionresult;
}

//  await fetch( request)
// .then(response => response.json())
// .then(json => this.getcollectionrsponse(json.searches))
//   .catch(err => {
//      this.toastr.error(err.message);
//   });
// }
// getcollectionrsponse( resposne) {
//  console.log(resposne);
//  console.log('from function');
//  this.collectionresult = resposne;
//  console.log(this.collectionresult);

// }

/////////////////////////////////////////
async VisitType(value) {
  console.log(value.payer);
  console.log(value.contract);
  console.log(value.copayment);
  console.log(value.percent);
  console.log(value.absolute);
  console.log(value.approval);
  console.log(value.mrn);
  console.log(value.card);
  console.log(value.claim);

  const data = {CashClientID: '1' , ClientID : '1'};

  const bodyobj = JSON.stringify(data);
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'OrderEntery/load_Test', {
    method: 'POST',
    body: bodyobj
});
 request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responseloadtestdata = await response.json();
this.VisitTypeResult
 = responseloadtestdata.loadTests;
return this.VisitTypeResult;
}

/////////////////////////////////////////
async LoadVisit(item) {

  const data = {LoadItems : { ItemTypeID: item.ItemTypeID , CPT: item.CPT, ItemName: item.ItemName  ,
     Client_Price: item.Client_Price , WalkIn_Price: item.WalkIn_Price ,
    CategoryName: item.CategoryName , SampleTypeName: item.SampleTypeName , GenderName: item.GenderName }};

  const bodyobj = JSON.stringify(data);
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'OrderEntery/GetVisitItem_VisitTest', {
    method: 'POST',
    body: bodyobj
});
 request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
const response = await fetch( request);
const responsevisititemdata = await response.json();
this.loadvisitresult = responsevisititemdata;
 //this.loadvisitresult = responsevisititemdata.profile_Test;
return this.loadvisitresult;

}



/////////////////////////////////////////

//  await fetch( request)
// .then(response => response.json())
// .then(json => this.getVisitrsponse(json.loadTests))
//   .catch(err => {
//      this.toastr.error(err.message);
//   });
// }
// getVisitrsponse( resposne) {
//  console.log(resposne);
//  console.log('from function');
//  this.VisitTypeResult = resposne;
//  console.log(this.VisitTypeResult);
// }
//////////////////////////////////////
async SampleAcceptance(value) {
  console.log(value.fcollection);
  console.log(value.tcollection);
  console.log(value.visite2);
  console.log(value.sample2);

  // const data = {FromDate_date: '2020-02-19T11:57:51.7148454+01:00', ToDate_date: '2020-02-19T11:57:51.7148454+01:00',
  //  RegCenterId: '1',
  // ProcCenterID: '1', StatusID: '1', SampleId: '1', VisitId: '1' , active : '1' };

  const data = {FromDate_date: value.fcollection, ToDate_date: value.tcollection,
     RegCenterId: value.center2, StatusID: value.status2, SampleId: value.sample2,
      FormattedVisitID: value.visite2 };

  const bodyobj = JSON.stringify(data);
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'VisitTest/Search_Acceptance', {
    method: 'POST',
    body: bodyobj
});
 request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');

const response = await fetch( request);
const responseacceptdata = await response.json();
this.AcceptanceResult = responseacceptdata.searchAcceptences;
return this.AcceptanceResult;
}

//  await fetch( request)
// .then(response => response.json())
// .then(json => this.getacceptancersponse(json.AcceptanceResult))
//   .catch(err => {
//      this.toastr.error(err.message);
//   });
// }
// getacceptancersponse( resposne) {
//  console.log(resposne);
//  console.log('from function');
//  this.AcceptanceResult = resposne;
//  console.log(this.AcceptanceResult)
// }
///////////////////////////////
// async SearchPatient(value) {
//   console.log(value.name);
//   console.log(value.contactno);
//   console.log(value.patientlab);
//   console.log(value.idnumber);
//   console.log(value.from);
//   console.log(value.to);
//   console.log(value.mrn);
//   // const data = {PatName: value.name, mobile: value.contactno, NationalID: value.patientlab,
//   //  FormattedID: value.idnumber, Start_date: value.form
//   // , End_date: value.to, MRN: value.mrn};
//   const data = {PatName: 'a', mobile: '1', NationalID: '1', FormattedID: '1', Start_date: '2020-01-27 13:15:51'
//   , End_date: '2020-01-27 13:15:51', MRN: '1'};
//   const bodyobj = JSON.stringify(data);
//   const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
//   const request = new Request(baseURL + 'Patient/searchPatient', {
//   method: 'POST',
//   body: bodyobj});
//         request.headers.delete('Content-Type');
//         request.headers.append('Content-Type', 'application/json');
//  await fetch( request)
//  .then(response => response.json())
//  .then(json => this.getsearchrsponse(json.Searches))
//   .catch(err => {this.toastr.error(err.message); });
// }
// getsearchrsponse( resposne) {
//  console.log(resposne);
//  console.log('from function');
//  this.searchresult = resposne;
//  console.log(this.searchresult);
//  return this.searchresult;
// }
// getsearchResults() {
//   console.log('from get results >>>>>>>>>>>>>>' + this.searchresult);
//   return this.searchresult;
// }

async SearchPatient(value) {
  console.log(value.name);
  console.log(value.contactno);
  console.log(value.patientlab);
  console.log(value.idnumber);
  console.log(value.from);
  console.log(value.to);
  console.log(value.mrn);
  // const data = {PatName: 'a', mobile: '1', NationalID: '1', FormattedID: '1', Start_date: '2020-01-27 13:15:51'
  // , End_date: '2020-01-27 13:15:51', MRN: '1'};
  const data = {PatName: value.name, mobile: value.contactno, Custom_id : value.idnumber,
      Start_date: value.from
  , End_date: value.to, MRN: value.mrn};
  const bodyobj = JSON.stringify(data);
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'Patient/searchPatient', { method: 'POST', body: bodyobj});
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
  const response = await fetch( request);
  const responsedata = await response.json();
  this.searchresult = responsedata.Searches;
  return this.searchresult;
}




////////////////////////////////////////
  async loginUser(value) {
      console.log(value.username);
      console.log(value.password);
      console.log(value.centers);

      const data = {login_id: value.username, login_password: value.password, branch_id: value.center};
      const bodyobj = JSON.stringify(data);
      const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
      const request = new Request(baseURL + 'Login/login', {
        method: 'POST',
        body: bodyobj
    });
     request.headers.delete('Content-Type');
    request.headers.append('Content-Type', 'application/json');
    const response = await fetch( request);
    const responsedata = await response.json();
    let success = responsedata.issuccess;
    if (success == true) {
    this.getrsponse(responsedata);
    } else {
      this.toastr.warning('Failed To Login!');
      this.router.navigate(['/session/login']);
    }

   }
   getrsponse( resposne) {
     console.log(resposne);
     console.log('from function');
      this.setLocalUserProfile(resposne);
 this.toastr.success('Successfully Logged In!');
 this.router.navigate(['/']);
     this.userData = resposne;
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

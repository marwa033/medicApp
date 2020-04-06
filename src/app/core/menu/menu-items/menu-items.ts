import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  icon?: string;
  children?: ChildrenItems[];

}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'dashboard',
    name: 'Order',
    type: 'sub',
    icon: '',
    children: [
      {state: 'saas', name: 'Patient' , type: 'sub'},
      {state: 'saas', name: 'Print' , type: 'sub'},
      {state: 'saas', name: 'Monitor' , type: 'sub'}

    //   {state: 'saas', name: 'SAAS',     type: 'sub2',    icon: 'explore',
    //   children: [
    //     {state: 'crm', name: 'CRM2',     type: 'sub'},
    //     {state: 'saas', name: 'SAAS2',     type: 'sub'} 
    //   ]
    // } 
    ]
  },
  {
    state: 'dashboard',
    name: 'Sampling',
    type: 'sub',
    icon: '',
    children: [
      {state: 'collection', name: 'Collection', type: 'sub'},
      {state: 'acceptance', name: 'Acceptance', type: 'sub'},
    ]
  },
  {
    state: 'dashboard',
    name: 'Result Entry',
    type: 'sub',
    icon: '',
    children: [
      {state: 'generallab', name: 'General Lab', type: 'sub'},
      {state: 'explanatory', name: 'Explanatory', type: 'sub'}, 
      {state: 'bacteriology', name: 'Bacteriology', type: 'sub'},
    ]
  },
  {
    state: 'dashboard',
    name: 'Invoicing',
    type: 'sub',
    icon: '',
    children: [
      {state: 'generateinvoice', name: 'Generate Invoice', type: 'sub'},
      {state: 'searchinvoice', name: 'Search Invoice', type: 'sub'}, 
      {state: 'priceinvoice', name: 'Price Invoice', type: 'sub'},
    ]
  },
  {
    state: 'dashboard',
    name: 'Reporting',
    type: 'sub',
    icon: '',
    children: [
      {state: 'saas', name: 'Income Report', type: 'sub'},
      {state: 'crm', name: 'Test Statistics', type: 'sub'}, 
      {state: 'crm', name: 'Pending Test', type: 'sub'},
    ]
  },
  {
    state: 'dashboard',
    name: 'Help',
    type: 'sub',
    icon: '',
    children: [
      {state: 'crm', name: 'License Information', type: 'sub'},
    ]
  },

  {
    state: 'dashboard',
    name: 'Tools',
    type: 'sub',
    icon: '',
    children: [
      {state: 'saas', name: 'Calculator', type: 'sub'},
      {state: 'crm', name: 'Notepad', type: 'sub'}, 
      {state: 'crm', name: 'Paint', type: 'sub'},
    ]
  },
      //   {state: 'saas', name: 'SAAS',     type: 'sub2',    icon: 'explore',
    //   children: [
    //     {state: 'crm', name: 'CRM2',     type: 'sub'},
    //     {state: 'saas', name: 'SAAS2', type: 'sub'} 
    //   ]
    // } 
  {
    state: 'dashboard',
    name: 'Configuration',
    type: 'sub',
    icon: '',
    children: [
      {state: 'saas',
       name: 'Test',
       type: 'sub2',
      children: [
       {  state: 'testcategory', name: 'Test Category' , type: 'sub'},
       {  state: 'testsubcategory', name: 'Test SubCategory', type: 'sub'},
       {  state: 'testquestion', name: 'Test Question' , type: 'sub'},
       {  state: 'testmethodology', name: 'Test Methodology', type: 'sub'},
       {  state: 'container', name: 'Container', type: 'sub'},
       {  state: 'sampletype', name: 'Sample Type', type: 'sub'},
       {  state: 'test', name: 'Test', type: 'sub'},
       {  state: 'resultfield', name: 'Result Field', type: 'sub'},]},
      {state: 'profile', name: 'Profile', type: 'sub'},
      {state: 'crm', name: 'Pricing', type: 'sub2',
      children:[
        {state: 'currency', name: 'Currency', type: 'sub'},
        {state: 'grosspricelist', name: 'Gross PriceList', type: 'sub'},
        {state: 'payer', name: 'Payer', type: 'sub'},
        {state: 'clientcategory', name: 'Client Category', type: 'sub'},
      ]
      },
      {state: 'crm', name: 'Lab', type: 'sub2',
      children:[
        {state: 'labinfo', name: 'Lab Information', type: 'sub'},
        {state: 'branch', name: 'Branch', type: 'sub'},
      ]
      },
      {state: 'crm', name: 'Address', type: 'sub2',
      children:[
        {state: 'crm', name: 'Country', type: 'sub'},
        {state: 'crm', name: 'State', type: 'sub'},
        {state: 'crm', name: 'City', type: 'sub'},
      ]
      },
      {state: 'crm', name: 'Referral', type: 'sub2',
      children:[
        {state: 'priority', name: 'Priority', type: 'sub'},
        {state: 'speciality', name: 'Speciality', type: 'sub'},
        {state: 'clinic', name: 'Clinic', type: 'sub'},
        {state: 'doctor', name: 'Doctor', type: 'sub'},

      ]
      },
      {state: 'crm', name: 'System',
      children:[
        {state: 'crm', name: 'AutoMailer'},
      ]
      },
    ]
  },

  {
    state: 'dashboard',
    name: 'Inventory',
    type: 'sub',
    icon: '',
    children: [
      {state: 'saas', name: 'Setup', type: 'sub2',
     children:[
      {state: 'storemode', name: 'Store Mode', type: 'sub'},
      {state: 'location', name: 'Location', type: 'sub'},
      {state: 'supplier', name: 'Supplier', type: 'sub'}, 
      {state: 'uom', name: 'UOM', type: 'sub'}, 
      {state: 'item', name: 'Item', type: 'sub'}, 
     ]},
      {state: 'purchaseorder', name: 'Purchase Order', type: 'sub'}, 
      {state: 'crm', name: 'Receive', type: 'sub'},
      {state: 'crm', name: 'Issue', type: 'sub'},
      {state: 'crm', name: 'Inventory Status', type: 'sub'},
    ]
  },
  
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
  add(menu:any) {
    MENUITEMS.push(menu);
  }
}

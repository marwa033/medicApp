import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  // icon: string;
  // children?: ChildrenItems[];

}
///////
export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state:'',
    name: 'Home',
    type: 'button',
    icon: 'home',

  },  {
    state: 'dashboard',
    name: 'District',
    type: 'sub',
    icon: 'account_balance',
    children: [
      {state: 'showdistrict', name: 'Show All' , type: 'sub', icon: 'menu'},
      {state: 'adddistrict', name: 'Add District' , type: 'sub', icon: 'menu'},
    ]
  },
  {
    state: 'dashboard',
    name: 'Category',
    type: 'sub',
    icon: 'category',
    children: [
      {state: 'showcategory', name: 'Show All' , type: 'sub', icon: 'menu'},
      {state: 'addcategory', name: 'Add Category' , type: 'sub', icon: 'menu'},
    ]
  },

  {
    state: 'dashboard',
    name: 'Ads',
    type: 'sub',
    icon: 'addchart',
    children: [
      {state: 'showads', name: 'Show All' , type: 'sub', icon: 'menu'},
      {state: 'addads', name: 'Add Ads' , type: 'sub', icon: 'menu'},
    ]
  },

  {
    state: 'dashboard',
    name: 'Promo Codes',
    type: 'sub',
    icon: 'money',
    children: [
      {state: 'showpromo', name: 'Show All' , type: 'sub', icon: 'menu'},
      {state: 'addpromo', name: 'Add Promo Codes' , type: 'sub', icon: 'menu'},
    ]
  },  {
    state: 'dashboard',
    name: 'Admins',
    type: 'sub',
    icon: 'account_box',
    children: [
      {state: 'showadmins', name: 'Show All' , type: 'sub', icon: 'menu'},
      {state: 'addadmins', name: 'Add Admins' , type: 'sub', icon: 'menu'},
    ]
  },
  {
    state: 'dashboard',
    name: 'Doctors',
    type: 'sub',
    icon: 'enhanced_encryption',
    children: [
      {state: 'showdoctors', name: 'Show All' , type: 'sub', icon: 'menu'},
      {state: 'adddoctor', name: 'Add Doctor' , type: 'sub', icon: 'menu'},
    ]
  },
  {
    state: 'dashboard',
    name: 'Clients',
    type: 'sub',
    icon: 'contacts',
    children: [
      {state: 'showclient', name: 'Show All' , type: 'sub', icon: 'menu'}
    ]
  },
  {
    state: 'dashboard',
    name: 'Bookings',
    type: 'sub',
    icon: 'menu',
    children: [
      {state: 'booking', name: 'Show All' , type: 'sub', icon: 'menu'}
    ]
  },
  {
    state: 'dashboard',
    name: 'Chat',
    type: 'sub',
    icon: 'chat',
    children: [
      {state: 'group', name: 'Group Chat' , type: 'sub', icon: 'menu'},
      // {state: 'message', name: 'messages' , type: 'sub', icon: 'menu'}
    ]
  },
  {
    state: 'dashboard',
    name: 'Notifications',
    type: 'sub',
    icon: 'notifications',
    children: [
      {state: 'notification', name: 'Send Notifications' , type: 'sub', icon: 'menu'},
    ]
  }


  
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

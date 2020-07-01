import * as firebase from 'firebase/app'

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-wqUyzCx26DheDhedC1NMzVxMPnzP9ec",
  authDomain: "ferragemapp.firebaseapp.com",
  databaseURL: "https://ferragemapp.firebaseio.com",
  projectId: "ferragemapp",
  storageBucket: "ferragemapp.appspot.com",
  messagingSenderId: "537364637347",
  appId: "1:537364637347:web:3cf3821e1cc9cdf37c4116",
  measurementId: "G-TFD8211X43"
};

let firebaseApp = firebase.initializeApp(firebaseConfig)

// ==== Firebase auth
export const firebaseAuth = firebaseApp.auth();


// ==== Firebase firestore db
export const db = firebaseApp.firestore();


export const dbUsers = db.collection("users");
export const dbProducts = db.collection("products");
export const dbProviders= db.collection("providers");
export const dbCustomers= db.collection("customers");
export const dbcategories = db.collection("categories");
export const dbAccounts = db.collection("accounts");
export const dbStockEntries = db.collection("stockEntry");
export const dbRoles = db.collection("roles");
export const dbSales = db.collection("sales");
export const dbInvoices = db.collection("invoice");
export const dbPrices = db.collection("price");
export const dbBox = db.collection("box");
export const dbNotifications = db.collection("notifications");
export const dbStockExits = db.collection("stockExit");





// ==== Firebase file storage

export const fbStorage = firebase.storage
export const storageRef = firebase.storage().ref()
export const imagesUsers = firebase.storage().ref().child('usersImages');
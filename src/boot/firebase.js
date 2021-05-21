import * as firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
 
  apiKey: "AIzaSyDmjNdwF81ferBOginc_K7RxJ2giVaF4D0",
    authDomain: "stock-zambezia.firebaseapp.com",
    projectId: "stock-zambezia",
    storageBucket: "stock-zambezia.appspot.com",
    messagingSenderId: "624280449735",
    appId: "1:624280449735:web:8ed019eb0c609b932b04e2"
  // apiKey: "AIzaSyD7yQ_W_njoapdMTKymmLuZ7L6ywjLn3qc",
  // authDomain: "noe-producao.firebaseapp.com",
  // projectId: "noe-producao",
  // storageBucket: "noe-producao.appspot.com",
  // messagingSenderId: "863188363544",
  // appId: "1:863188363544:web:acf22e49612d951a09566d"
  
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
//  Exported products for users
export const dbExpoProducts = db.collection("expoProducts");
export const dbAuxliarExpoProducts = db.collection("auxliarExpoProducts");

export const dbCurrentAccount = db.collection("currentAccount");
export const dbRetiradas = db.collection("retida");

// ==== Firebase file storage

export const fbStorage = firebase.storage
export const storageRef = firebase.storage().ref()
export const imagesUsers = firebase.storage().ref().child('usersImages');
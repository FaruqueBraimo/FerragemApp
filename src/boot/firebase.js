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

export const dbCandidates = db.collection("arqueologs");




// ==== Firebase file storage

export const fbStorage = firebase.storage
export const storageRef = firebase.storage().ref()
export const imagesUsers = firebase.storage().ref().child('usersImages');
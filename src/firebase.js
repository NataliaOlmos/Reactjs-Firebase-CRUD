import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAOVl9BqTYwJBgeCcmtd82gsT_m8koWgHc",
    authDomain: "crud-react2311.firebaseapp.com",
    databaseURL: "https://crud-react2311.firebaseio.com",
    projectId: "crud-react2311",
    storageBucket: "crud-react2311.appspot.com",
    messagingSenderId: "726075720223",
    appId: "1:726075720223:web:b9ba06cd2d1fe528048b2a",
    measurementId: "G-MHHYSFEFY2"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore();


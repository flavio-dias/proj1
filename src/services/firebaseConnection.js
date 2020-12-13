import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyCnPSk3x2uR3y7VYR0vHtrINplVr6Enj00",
    authDomain: "appmae-74586.firebaseapp.com",
    databaseURL: "https://appmae-74586.firebaseio.com",
    projectId: "appmae-74586",
    storageBucket: "appmae-74586.appspot.com",
    messagingSenderId: "84114056525",
    appId: "1:84114056525:web:528e924fb952661e880304",
    measurementId: "G-MCFTJXHWDF"
  };

  // Initialize Firebase
  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
      //firebase.analytics();
  }
  export default firebase;
  
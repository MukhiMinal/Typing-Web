import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB2GTe1gHfOwoRMtkzQ96BrM4d10d1m50Q",
    authDomain: "typing-website-96de6.firebaseapp.com",
    projectId: "typing-website-96de6",
    storageBucket: "typing-website-96de6.appspot.com",
    messagingSenderId: "971713273129",
    appId: "1:971713273129:web:e4e66288e865cebd016b38",
    measurementId: "G-X8KPH60FTM"
  };

  const firebaseapp=firebase.initializeApp(firebaseConfig);

  const auth=firebase.auth();
  const db=firebaseapp.firestore();

  export{auth,db}
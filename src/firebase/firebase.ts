import * as firebaseui from 'firebaseui';
import firebase from 'firebase';
import 'firebaseui/dist/firebaseui.css';
import './Firebase.module.css';

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyAVgH_XtssFK4xC-72TPQzfL2q26oRgRTQ",
   authDomain: "indebtedless.firebaseapp.com",
   databaseURL: "https://indebtedless.firebaseio.com",
   projectId: "indebtedless",
   storageBucket: "indebtedless.appspot.com",
   messagingSenderId: "13867749775",
   appId: "1:13867749775:web:064f0a513ffa5315b47bfa",
   measurementId: "G-CK334TMLGK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export function initFirebaseUI(el: Element): void {
   const ui = new firebaseui.auth.AuthUI(firebase.auth());
   const uiConfig: firebaseui.auth.Config = {
      callbacks: {
         signInSuccessWithAuthResult() {
            return false;
         }
      },
      signInOptions: [
         firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ]
   };
   ui.start(el, uiConfig);
}
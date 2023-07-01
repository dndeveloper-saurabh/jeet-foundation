import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyChdIYefTWPN98G6WsPHpZqb04FiYinrWk",
  authDomain: "avian-display-193502.firebaseapp.com",
  databaseURL: "https://avian-display-193502.firebaseio.com",
  projectId: "avian-display-193502",
  storageBucket: "avian-display-193502.appspot.com",
  messagingSenderId: "661886367826",
  appId: "1:661886367826:web:ca4fc71844195bf8a5878b",
  measurementId: "G-ZP5438RMRB"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const rdb = firebaseApp.database();
const auth = firebase.auth();
const storage = firebase.storage();
let messaging = null;
const functions = firebase.functions();
const asiaFunctions = firebase.app().functions('asia-east1');
const phoneAuth = new firebase.auth.PhoneAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const appleProvider = new firebase.auth.OAuthProvider("apple.com");

const isMessagingSupported = firebase.messaging.isSupported();
if(isMessagingSupported) {
  messaging = firebase.messaging();
}

export {
  db,
  rdb,
  auth,
  firebase,
  googleProvider,
  facebookProvider,
  appleProvider,
  storage,
  functions,
  asiaFunctions,
  firebaseApp,
  phoneAuth,
  messaging,
  isMessagingSupported
};

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCsyKa0S7SzmETMiXOtjnFeOUEKMruljXE",
  authDomain: "todo-20210702.firebaseapp.com",
  projectId: "todo-20210702",
  storageBucket: "todo-20210702.appspot.com",
  messagingSenderId: "468635760886",
  appId: "1:468635760886:web:8d9fbdd008565aee23d4d7",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export const auth = firebase.auth();

window.firebase = firebase;

export default firebase;

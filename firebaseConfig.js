// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFiresStore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvnVoTG-DkqJEvymrnJgMqJFSz1qVbZVI",
  authDomain: "spotitabs.firebaseapp.com",
  projectId: "spotitabs",
  storageBucket: "spotitabs.appspot.com",
  messagingSenderId: "244170047922",
  appId: "1:244170047922:web:025c25f2d85d0c480664ab",
  measurementId: "G-N6QLHWJ25C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const databse = getFiresStore(app)
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCepspNCgTzOP-dzTkOHVmvgp4409wV8gc',
  authDomain: 'picturesproject-c6368.firebaseapp.com',
  projectId: 'picturesproject-c6368',
  storageBucket: 'picturesproject-c6368.appspot.com',
  messagingSenderId: '119510184670',
  appId: '1:119510184670:web:a86748a8c446f713e1084f',
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const logout = () => {
  signOut(auth);
};

export const storage = getStorage(app);

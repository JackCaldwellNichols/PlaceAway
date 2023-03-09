// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCoKuwLDxn4rpS6tCFYq9hEKaDVYp5n1jY",
    authDomain: "placeaway-ad662.firebaseapp.com",
    projectId: "placeaway-ad662",
    storageBucket: "placeaway-ad662.appspot.com",
    messagingSenderId: "282243229415",
    appId: "1:282243229415:web:3d96f0c6030459767b6442",
    measurementId: "G-KNXSHYGNW7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
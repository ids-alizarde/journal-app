import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAJ72KEIoj2QLSkYfbwUwE6u5WATSPFpCc",
    authDomain: "react-app-6596b.firebaseapp.com",
    databaseURL: "https://react-app-6596b.firebaseio.com",
    projectId: "react-app-6596b",
    storageBucket: "react-app-6596b.appspot.com",
    messagingSenderId: "177011137714",
    appId: "1:177011137714:web:4be711ec5be48462d8fdab"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}
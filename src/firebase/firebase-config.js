import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import { Constants } from '../services/constants';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
};

// const firebaseConfigTesting = {
//     apiKey: "AIzaSyA4hPBbPVKXD8p8sBeT84M37iP6V2d4Up0",
//     authDomain: "react-app-dev-361d1.firebaseapp.com",
//     databaseURL: "https://react-app-dev-361d1.firebaseio.com",
//     projectId: "react-app-dev-361d1",
//     storageBucket: "react-app-dev-361d1.appspot.com",
//     messagingSenderId: "345172070137",
//     appId: "1:345172070137:web:b854608fd608843ad29c28"
// };

// if ( process.env.NODE_ENV === Constants.fireBaseTestEnvironment ) {

//     firebase.initializeApp(firebaseConfigTesting);

// } else {

//     firebase.initializeApp(firebaseConfig);
// }

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}
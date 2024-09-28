import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const firebaseConfig = {
    apiKey: "AIzaSyAOJxpwraxlCuxX77WmH1895k2dLYUUrho",
    authDomain: "findjob-918fe.firebaseapp.com",
    projectId: "findjob-918fe",
    storageBucket: "findjob-918fe.appspot.com",
    messagingSenderId: "254742686406",
    appId: "1:254742686406:web:9a1094dac60858bc5345c7",
    measurementId: "G-8863YSSHMD"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export default firebase;
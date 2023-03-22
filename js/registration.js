// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword , onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import firebase from "firebase/compat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDM_0UssyTku4w-T3ZCtaUiKNVE2-LOZC8",
    authDomain: "education-f51a5.firebaseapp.com",
    databaseURL: "https://education-f51a5-default-rtdb.firebaseio.com",
    projectId: "education-f51a5",
    storageBucket: "education-f51a5.appspot.com",
    messagingSenderId: "1075549269155",
    appId: "1:1075549269155:web:a3fb723d6b85e8d25a2316",
    measurementId: "G-WBMGGBX4RS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth();
const sighUp = document.getElementById('sighUp');
const registration = document.getElementById("registration");

registration.addEventListener('click',(e)=>{

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;


    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;

            set(ref(database, 'users/' + user.uid),{
                username: username,
                email: email
            })

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..

            alert(errorMessage);
        });
})

sighUp.addEventListener('click',(e)=>{
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            const dt = new Date();
            update(ref(database, 'users/' + user.uid),{
                last_login: dt
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            alert(errorMessage);
        });

    const user = auth.currentUser;
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            // ...
        } else {
            // User is signed out
            // ...
        }
    });


    logout.addEventListener((e)=>{
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            alert(errorMessage);
        });
    })
})
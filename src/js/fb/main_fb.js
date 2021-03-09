import firebase from "firebase/app";
    require("firebase/auth");
    require("firebase/firestore");
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
//===============================================================================

import * as fbfn from './fb_fn';
//Файл конфігурації Firebase
var firebaseConfig = {
        apiKey: "AIzaSyBDE8RHhZUtci4pZgH8gOTkUij72_Eyfyo",
        authDomain: "filmotekateamproject.firebaseapp.com",
        projectId: "filmotekateamproject",
        storageBucket: "filmotekateamproject.appspot.com",
        messagingSenderId: "312180741865",
        appId: "1:312180741865:web:a251ee6e6c89a9fab7c278",
      };
//Firebase ініціалізація
firebase.initializeApp(firebaseConfig);
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var db = firebase.firestore();
//Вище файл конфігурації та імпорт бібліотек
//===============================================================================

//Посолання на HTML-elements
const btnSignInRef = document.querySelector('.js-SignIn');
const signinFormRef = document.querySelector('.registerForm');
const userSpanRef = document.querySelector('.js-userSpan');
const userAuthRef = document.querySelector('.js-userAuth');
const loginFormRef = document.querySelector('.loginForm');
const btnSignOutRef = document.querySelector('.js-SignOut');


//Код для контролю чи авторизований користувач та виконання відповідних дій
// Можна передати функції для авторизованого та не авторизованого користувача!!!

let curUser;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    curUser = user.email;
      btnSignInRef.insertAdjacentHTML('beforebegin', `<span class="sign-in js-userSpan">User : ${curUser}<span>`);
      if (userAuthRef) { userAuthRef.textContent = '' };
    console.log(curUser,` - користувач успішно пройшов авторизацію!`);
  } else {
    // No user is signed in.
      btnSignInRef.insertAdjacentHTML('beforebegin', `<span class="sign-in js-userAuth">Авторизуйтесь или создайте аккаунт<span>`);
      if (userSpanRef) { userSpanRef.textContent = '' };
    console.log(curUser,' - НЕ АВТОРИЗОВАНИЙ');
  }
});
//===============================================================================

//Прослуховування форми та відправка дани для Реєстрації через createNewUserFn()
let newUserMail;
let newUserPass;
signinFormRef.addEventListener('submit', (event) => {
    event.preventDefault();
    newUserMail = document.getElementById("registerFormName").value;
    newUserPass = document.getElementById("registerFormPassword").value;
    fbfn.createNewUserFn(newUserMail, newUserPass);
    console.log('User created!');
    
});
//===============================================================================

//Прослуховування форми та відправка дани для Авторизації через loginUserFn()
let currentUserMail;
let currentUserPass;
loginFormRef.addEventListener('submit', (event) => {
    event.preventDefault();
    currentUserMail = document.getElementById("loginFormName").value;
    currentUserPass = document.getElementById("loginFormPassword").value;
    fbfn.loginUserFn(currentUserMail, currentUserPass);
    console.log('User Entry');
    
});
//===============================================================================

//Прослуховування кнопки-посилання та відправка даних для Виходу через signOutUserFn()
btnSignOutRef.addEventListener('click', (event) => {
    fbfn.signOutUserFn(curUser);
    console.log('User Out!');
    document.location.reload();
})

//===============================================================================
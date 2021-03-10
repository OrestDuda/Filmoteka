import firebase from "firebase/app";
    require("firebase/auth");
    require("firebase/firestore");
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
//===============================================================================

import * as fbfn from './fb_fn';
//Файл конфігурації Firebase

//Firebase ініціалізація
//firebase.initializeApp(fbfn.firebaseConfig);
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
const BtnWatchRef = document.querySelector('.js-watched-col');
const BtnQueueRef = document.querySelector('.js-queue-col');


//Код для контролю чи авторизований користувач та виконання відповідних дій
// Можна передати функції для авторизованого та не авторизованого користувача!!!

export let curUser;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            curUser = user.email;
            let letUser = curUser;
            btnSignInRef.insertAdjacentHTML('beforebegin', `<span class="sign-in js-userSpan">User : ${curUser}<span>`);
            if (userAuthRef) { userAuthRef.textContent = '' };
            console.log(curUser, ` - користувач успішно пройшов авторизацію!`);
            

        } else {
            // No user is signed in.
            btnSignInRef.insertAdjacentHTML('beforebegin', `<span class="sign-in js-userAuth">Авторизуйтесь или создайте аккаунт<span>`);
            if (userSpanRef) { userSpanRef.textContent = '' };
            console.log(curUser, ' - НЕ АВТОРИЗОВАНИЙ');
  
        }
    })

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
//===============================================================================
//===============================================================================
//                       Firebase Cloud Storage
//===============================================================================
//===============================================================================
//===============================================================================

//Отримати колекцію Watched
let col;
//   !!!- arrayWatched  -  Масив фільмів з колекції Watched
let arrayWatched;
BtnWatchRef.addEventListener('click', (event) => {
    col = 'watched';
    arrayWatched = [];
    fbfn.getUserCollection(col, arrayWatched);
    console.log(arrayWatched);
})
//===============================================================================

//Отримати колекцію Queue
//   !!!- arrayQueue  -  Масив фільмів з колекції Queue
let arrayQueue;
BtnQueueRef.addEventListener('click', (event) => {
    col = 'queue';
    arrayQueue = [];
    fbfn.getUserCollection(col, arrayQueue);
    console.log(arrayQueue);
})
//===============================================================================
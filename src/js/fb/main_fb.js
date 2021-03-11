import firebase from "firebase/app";
    require("firebase/auth");
    require("firebase/firestore");
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
//===============================================================================

import * as fbfn from './fb_fn';
//Файл конфігурації Firebase


import filmsTpl from '../../templates/products-fb.hbs';
//const renderListRef = document.querySelector('#products-list-js');

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
            btnSignInRef.innerHTML(`<span class="sign-in js-userAuth">Авторизируйтесь или создайте аккаунт<span>`);
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
const Handlebars = require("handlebars");
BtnWatchRef.addEventListener('click', (event) => {
    
    col = 'watched';
    fbfn.getUserCollection(col);
    //console.log(arrayWatched);
   
 
    //renderListRef.innerHTML = '';
   // Handlebars.registerHelper(filmsTpl,arrayWatched)
    //const markupWatched = filmsTpl(arrayWatched);
    //renderListRef.insertAdjacentHTML('beforeend', markupWatched);
})
//===============================================================================

//Отримати колекцію Queue
//   !!!- arrayQueue  -  Масив фільмів з колекції Queue
//let arrayQueue;
BtnQueueRef.addEventListener('click', (event) => {
    col = 'queue';
    fbfn.getUserCollection(col);
    
    //console.log(arrayQueue);
    
    //renderListRef.innerHTML = '';
    //const markupQueue = filmsTpl(arrayQueue);
    //console.log(markupQueue);
    //renderListRef.insertAdjacentHTML('beforeend', markupQueue);
})
//===============================================================================

const ulColection = document.querySelector('.products-list-js');
ulColection.addEventListener('click', event => {
    console.log(event);
    if (event.target.dataset.fb == 1) {
        delDoc(event, col);
        console.log(event);
    }
})

//btnDeleteRef.addEventListener('click', event => { delDoc(event); })

//===============================================================================
    //Функція видалення фільму з колекції
function delDoc (e, collect) {
  console.log(deleteFilmID);
  let deleteFilmID = e.target.dataset.id
  console.log(deleteFilmID);
  const res = db.collection(`${curUser}_${collect}`).doc(`${deleteFilmID}`).delete();
}

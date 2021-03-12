import firebase from 'firebase/app';
require('firebase/auth');
require('firebase/firestore');
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import refs from '../refs';
//===============================================================================

import * as fbfn from './fb_fn';
//Файл конфігурації Firebase

//Firebase ініціалізація
//firebase.initializeApp(fbfn.firebaseConfig);
const ui = new firebaseui.auth.AuthUI(firebase.auth());
const db = firebase.firestore();

//Вище файл конфігурації та імпорт бібліотек
//===============================================================================

//Код для контролю чи авторизований користувач та виконання відповідних дій
// Можна передати функції для авторизованого та не авторизованого користувача!!!

function userLink() {
  refs.loginSignIn.insertAdjacentHTML(
    'beforebegin',
    `<span class="sign-in js-userSpan"><div class="icon-user">
                  <i class="bi bi-circle-fill"></i>
                  <i class="bi bi-person-fill"></i>
                </div> ${curUser}<span>`,
  );
  refs.loginSignIn.classList.add('is-hidden');
  refs.registerSignUp.classList.add('is-hidden');
  refs.btnSignOutRef.classList.remove('is-hidden');
  refs.BtnWatchRef.classList.remove('is-hidden');
  refs.BtnQueueRef.classList.remove('is-hidden');
}
function noUserLink() {
  refs.btnSignOutRef.classList.add('is-hidden');
  refs.BtnWatchRef.classList.add('is-hidden');
  refs.BtnQueueRef.classList.add('is-hidden');

  refs.loginSignIn.classList.remove('is-hidden');
  refs.registerSignUp.classList.remove('is-hidden');
}
export let curUser;
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    curUser = user.email;
    userLink();
    if (refs.userAuthRef) {
      refs.userAuthRef.textContent = '';
    }
  } else {
    // No user is signed in.
    noUserLink();
    if (refs.userSpanRef) {
      refs.userSpanRef.textContent = '';
    }
  }
});

//===============================================================================

//Прослуховування форми та відправка дани для Реєстрації через createNewUserFn()
let newUserMail;
let newUserPass;
refs.signinFormRef.addEventListener('submit', event => {
  event.preventDefault();
  newUserMail = document.getElementById('registerFormName').value;
  newUserPass = document.getElementById('registerFormPassword').value;
  fbfn.createNewUserFn(newUserMail, newUserPass);
});
//===============================================================================

//Прослуховування форми та відправка дани для Авторизації через loginUserFn()
refs.loginFormRef.addEventListener('submit', event => {
  let currentUserMail;
  let currentUserPass;
  event.preventDefault();
  currentUserMail = document.getElementById('loginFormName').value;
  currentUserPass = document.getElementById('loginFormPassword').value;
  fbfn.loginUserFn(currentUserMail, currentUserPass);
});
//===============================================================================

//Прослуховування кнопки-посилання та відправка даних для Виходу через signOutUserFn()
refs.btnSignOutRef.addEventListener('click', event => {
  fbfn.signOutUserFn(curUser);
  document.querySelector('.js-userSpan').innerHTML = '';
  //document.location.reload();
});

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

const Handlebars = require('handlebars');
refs.BtnWatchRef.addEventListener('click', event => {
  col = 'watched';
  fbfn.getUserCollection(col);
  document.querySelector('.pagination').innerHTML = '';
});

//===============================================================================

//Отримати колекцію Queue
//   !!!- arrayQueue  -  Масив фільмів з колекції Queue
//let arrayQueue;

refs.BtnQueueRef.addEventListener('click', event => {
  col = 'queue';
  fbfn.getUserCollection(col);
  document.querySelector('.pagination').innerHTML = '';
});

//===============================================================================

const ulColection = document.querySelector('.products-list-js');
ulColection.addEventListener('click', event => {
  let marK = event.target.dataset.fb;
  if (marK === '1') {
    delDoc(event, col);
  }
});

//btnDeleteRef.addEventListener('click', event => { delDoc(event); })

//===============================================================================

//Функція видалення фільму з колекції

async function delDoc(e, collect) {
  let deleteFilmID = e.target.dataset.id;
  await db.collection(`${curUser}_${collect}`).doc(`${deleteFilmID}`).delete();
  fbfn.getUserCollection(collect);
}

import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import filmsTpl from '../../templates/products-fb.hbs';
import refs from '../refs';
import fetchFilms from '../topFilms';

require('firebase/auth');
require('firebase/firestore');

//===============================================================================

export const firebaseConfig = {
  apiKey: 'AIzaSyBDE8RHhZUtci4pZgH8gOTkUij72_Eyfyo',
  authDomain: 'filmotekateamproject.firebaseapp.com',
  projectId: 'filmotekateamproject',
  storageBucket: 'filmotekateamproject.appspot.com',
  messagingSenderId: '312180741865',
  appId: '1:312180741865:web:a251ee6e6c89a9fab7c278',
};

firebase.initializeApp(firebaseConfig);
firebaseui.auth.AuthUI.getInstance();
const db = firebase.firestore();

let curUser;
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    curUser = user.email;
    refs.loginModalBackdrop.classList.add('is-hidden');
    document.querySelector('header').classList.remove('header');
    document.querySelector('header').classList.add('headerlog');
  } else {
    // No user is signed in.
    document.querySelector('header').classList.add('header');
    document.querySelector('header').classList.remove('headerlog');
  }
});

//Функція, що реалізує Реєстрацю - можна прописати необхідні дії тут
export function createNewUserFn(mail, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(mail, password)
    .then(() => {
      refs.formMessageref.insertAdjacentHTML(
        'beforebegin',
        '<span>Ваша регистрация прошла успешно!</span>',
      );
      refs.registerModalBackdrop.classList.add('is-hidden');
    })
    .catch(function (error) {
      console.log(error);
      document.querySelector('.reg-error').textContent = `${error}`;
    });
}
//===============================================================================

//Функція, що реалізує Авторизацію - можна прописати необхідні дії тут
export async function loginUserFn(mail, password) {
  await firebase
    .auth()
    .signInWithEmailAndPassword(mail, password)
    .then(r => {
      fetchFilms(1);
    })

    .catch(function (error) {
      console.log(error);
      document.querySelector('.login-error').textContent = `${error}`;
      return error;
    });
}
//===============================================================================

//Функція для виходу з облікового запису користувача
export function signOutUserFn(mail) {
  firebase
    .auth()
    .signOut()
    .then(
      function () {
        // Sign-out successful.
      },
      function (error) {
        console.log(error);
      },
    );
}
//===============================================================================
//===============================================================================
//===============================================================================
//                       Firebase Cloud Storage
//===============================================================================
//===============================================================================
//===============================================================================

//Функція для отримання об'єкта фільму для передачі в колекцію користувача на Firebase Cloud Storage
export async function fetchMovieDataFirebase(movieID) {
  try {
    const responseModal = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=cd745b1c38819d91d823e4d3c6c216e8&language=en-US`,
    );
    return responseModal.json();
  } catch (error) {
    throw error;
  }
}
//===============================================================================

//Додати фільм до колекції (collection) користувача Firebase
export function addToUserCollection(params, collection) {
  db.collection(`${curUser}_${collection}`)
    .doc(`${params.id}`)
    .set({
      ...params,
    })
    .then(result => {
      document.querySelector('.movie-modal-span').innerHTML =
        'added Successful!';
    })
    .catch(error => {
      document.querySelector('.movie-modal-span').innerHTML = `${error}`;
    });
}
//===============================================================================

//Отримати колекцію фільмів колекції(collection) користувача Firebase та рендер сторінки
export async function getUserCollection(collection) {
  let newArray;
  await db
    .collection(`${curUser}_${collection}`)
    .get()
    .then(querySnapshot => {
      refs.renderListRef.innerHTML = '';
      newArray = [];
      querySnapshot.docs.forEach(doc => {
        let item = doc.data();
        item.genres = item.genres.map(g => ' ' + g.name);
        item.release_date = item.release_date.slice(0, 4);
        newArray.push(item);
      });
      const markupWatched = filmsTpl(newArray);
      refs.renderListRef.insertAdjacentHTML('beforeend', markupWatched);
    });
}
//===============================================================================

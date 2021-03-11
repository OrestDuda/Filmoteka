import firebase from "firebase/app";
    require("firebase/auth");
    require("firebase/firestore");
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import merge from "webpack-merge";
import filmsTpl from '../../templates/products-fb.hbs';
const renderListRef = document.querySelector('.products-list-js');
const loginModalRef = document.querySelector('.js-loginBackdrop');
const registrationModalRef = document.querySelector('.js-registerBackdrop');

//===============================================================================

let formMessageref = document.querySelector('.js-btn-reg');


export var firebaseConfig = {
        apiKey: "AIzaSyBDE8RHhZUtci4pZgH8gOTkUij72_Eyfyo",
        authDomain: "filmotekateamproject.firebaseapp.com",
        projectId: "filmotekateamproject",
        storageBucket: "filmotekateamproject.appspot.com",
        messagingSenderId: "312180741865",
        appId: "1:312180741865:web:a251ee6e6c89a9fab7c278",
};
      
firebase.initializeApp(firebaseConfig);
firebaseui.auth.AuthUI.getInstance();
var db = firebase.firestore();


let curUser;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    curUser = user.email;
    loginModalRef.classList.add("is-hidden");
  } else {
    // No user is signed in.
    console.log(user,'no signed');
  }
});

//Функція, що реалізує Реєстрацю - можна прописати необхідні дії тут
export function createNewUserFn(mail, password) {
  firebase.auth()
    .createUserWithEmailAndPassword(mail, password)
    .then(() => {
      formMessageref.insertAdjacentHTML("beforebegin",
        '<span>Ваша регистрация прошла успешно!</span>')
          registrationModalRef.classList.add("is-hidden");
    })
      .catch(function (error) {
	formMessageref.insertAdjacentHTML("beforebegin",
        `<span>${error}</span>`);
      });
}
//===============================================================================

//Функція, що реалізує Авторизацію - можна прописати необхідні дії тут
export function loginUserFn(mail, password) {
    firebase.auth()
        .signInWithEmailAndPassword(mail, password)
        .catch(function (error) {
	console.log(error);
        });
}
//===============================================================================

//Функція для виходу з облікового запису користувача 
export function signOutUserFn(mail) {
    firebase.auth().signOut().then(function() {
  // Sign-out successful.
}, function(error) {
	console.log(error);
});
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
    try{
      const responseModal = await fetch(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=cd745b1c38819d91d823e4d3c6c216e8&language=en-US`,
      );
       const movieDetail = responseModal.json();
        console.log(movieDetail);
      return movieDetail;
    }catch (error){
      throw error;
    }
  }
//===============================================================================



//Додати фільм до колекції (collection) користувача Firebase
export function addToUserCollection(params, collection) {
   db.collection(`${curUser}_${collection}`).doc(`${params.id}`).set({
    ...params
  }, { merge: false })
    .then((result) => {
      console.log("Document written with ID: ", params.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}
//===============================================================================

<<<<<<< Updated upstream
//Отримати колекцію фільмів колекції(collection) користувача Firebase
export function getUserCollection(collection) {
  db.collection(`${curUser}_${collection}`).get().then((querySnapshot) => {
    renderListRef.innerHTML = '';
    let newArray;
    newArray = [];
    querySnapshot.docs.forEach((doc) => {
      newArray.push(doc.data());
=======
//Отримати колекцію фільмів колекції(collection) користувача Firebase та рендер сторінки
export async function getUserCollection(collection) {
  let newArray;
  await db
    .collection(`${curUser}_${collection}`)
    .get()
    .then(querySnapshot => {
      renderListRef.innerHTML = '';

      newArray = [];
      querySnapshot.docs.forEach(doc => {
        let item = doc.data();
        item.genres = item.genres.map(g => ' ' + g.name);
        item.release_date = item.release_date.slice(0, 4);
        newArray.push(item);
      });
      const markupWatched = filmsTpl(newArray);
      renderListRef.insertAdjacentHTML('beforeend', markupWatched);
>>>>>>> Stashed changes
    });
  const markupWatched = filmsTpl(newArray);
  renderListRef.insertAdjacentHTML('beforeend', markupWatched);
  })
}
//===============================================================================



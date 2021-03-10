import firebase from "firebase/app";
    require("firebase/auth");
    require("firebase/firestore");
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

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

//Додати фільм до колекції (collection) користувача Firebase
export function addToUserCollection(params, collection) {
  db.collection(`${curUser}_${collection}`).add({
    ...params
  })
    .then((result) => {
      console.log("Document written with ID: ", params.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

//Отримати колекцію фільмів колекції(collection) користувача Firebase
export function getUserCollection(collection, array) {
  db.collection(`${curUser}_${collection}`).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      //console.log(`${doc.id} => ${doc.data()}`);
      //console.log(doc.data());
      array.push(doc.data())
    });
  })
}
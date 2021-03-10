import firebase from "firebase/app";
    require("firebase/auth");
    require("firebase/firestore");
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
//===============================================================================

//Функція, що реалізує Реєстрацю - можна прописати необхідні дії тут
export function createNewUserFn(mail, password) {
  firebase.auth()
    .createUserWithEmailAndPassword(mail, password)
      .catch(function (error) {
	console.log(error);
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
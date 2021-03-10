import refs from './refs';

// function generateHTML(data) {
//   refs.movieWrap.insertAdjacentHTML("beforeend", movieModalTemplate(data));
// }

refs.loginSignIn.addEventListener('click', onSignInClick);
refs.loginCloseModalBtn.addEventListener('click', onButtonCloseClick);
refs.loginModalBackdrop.addEventListener('click', onBackdropClick);

function onButtonCloseClick() {
  loginToggleModal();
  // refs.movieWrap.innerHTML = '';
  window.removeEventListener('keydown', pressEsc);
}
function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    onButtonCloseClick();
  }
}
function pressEsc(event) {
  if (event.code === 'Escape') {
    onButtonCloseClick();
  }
}

function loginToggleModal() {
  refs.loginModalBackdrop.classList.toggle('is-hidden');
}

function onSignInClick(event) {
  event.preventDefault();
  loginToggleModal();
  window.addEventListener('keydown', pressEsc);
}

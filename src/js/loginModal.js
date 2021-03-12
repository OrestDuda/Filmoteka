import refs from './refs';

refs.loginSignIn.addEventListener('click', onSignInClick);
refs.loginCloseModalBtn.addEventListener('click', onButtonCloseClick);
refs.loginModalBackdrop.addEventListener('click', onBackdropClick);
refs.registerFromLogin.addEventListener('click', () => {
  onButtonCloseClick();
  refs.registerModalBackdrop.classList.toggle('is-hidden');
});

function onButtonCloseClick() {
  loginToggleModal();
  window.removeEventListener('keydown', pressEsc);
  document.querySelector('.login-error').textContent = '';
  document.getElementById('loginFormName').value = '';
  document.getElementById('loginFormPassword').value = '';

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
 
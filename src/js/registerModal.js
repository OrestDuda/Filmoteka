import refs from './refs';

refs.registerSignUp.addEventListener('click', onSignUpClick);
refs.registerCloseModalBtn.addEventListener('click', onButtonCloseClick);
refs.registerModalBackdrop.addEventListener('click', onBackdropClick);

function onButtonCloseClick() {
  registerToggleModal();
  window.removeEventListener('keydown', pressEsc);
    document.querySelector('.reg-error').textContent = '';
  document.getElementById('registerFormName').value = '';
  document.getElementById('registerFormPassword').value = '';
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

function registerToggleModal() {
  refs.registerModalBackdrop.classList.toggle('is-hidden');
}

function onSignUpClick(event) {
  event.preventDefault();
  registerToggleModal();
  window.addEventListener('keydown', pressEsc);
}

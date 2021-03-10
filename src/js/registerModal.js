import refs from './refs';

// function generateHTML(data) {
//   refs.movieWrap.insertAdjacentHTML("beforeend", movieModalTemplate(data));
// }

refs.registerSignUp.addEventListener('click', onSignUpClick);
refs.registerCloseModalBtn.addEventListener('click', onButtonCloseClick);
refs.registerModalBackdrop.addEventListener('click', onBackdropClick);

function onButtonCloseClick() {
  registerToggleModal();
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

function registerToggleModal() {
  refs.registerModalBackdrop.classList.toggle('is-hidden');
}

function onSignUpClick(event) {
  event.preventDefault();
  registerToggleModal();
  window.addEventListener('keydown', pressEsc);
}

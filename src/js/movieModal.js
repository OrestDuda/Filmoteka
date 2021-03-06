import movieModalTemplate from '../templates/movieModal.hbs';

const refs = {
  closeModalBtn: document.querySelector("[movieModalClose]"),
  modalBackdrop: document.querySelector("[js-movieModal]"),
  modalContainer: document.querySelector('.movieModal'),
  allMovieList: document.querySelector('.products-list'),
  movieWrap: document.querySelector('.movieModalWrap'),
};

function generateHTML(data){
  refs.movieWrap.insertAdjacentHTML('beforeend', movieModalTemplate(data));
};

refs.allMovieList.addEventListener('click', onMovieClick);
refs.closeModalBtn.addEventListener('click', onButtonClick);
refs.modalBackdrop.addEventListener('click', onOverlayClick);

function onButtonClick(){
  toggleModal();
  refs.movieWrap.innerHTML = '';
  window.removeEventListener('keydown', onEscPress);
};
function onOverlayClick(event){
  if(event.target === event.currentTarget){
    onButtonClick();
  }
};
function onEscPress(event){
  if(event.code === 'Escape'){
    onButtonClick();
  }
};

function toggleModal() {
  document.body.classList.toggle("movieModalOpened");
  refs.modalBackdrop.classList.toggle("movieIsHidden");
};

function fetchMovieModalData(movieID){
  return fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=cd745b1c38819d91d823e4d3c6c216e8&language=en-US`)
    .then(response => response.json()).then(data => generateHTML(data));
};

function onMovieClick(event){
  event.preventDefault();
  if(event.target.parentNode.nodeName !=="LI" && event.target.parentNode.className !=="products-film" ){
    return;
  }
  const id = event.target.parentNode.dataset.id
  toggleModal();
  window.addEventListener('keydown', onEscPress);
  fetchMovieModalData(id);
};






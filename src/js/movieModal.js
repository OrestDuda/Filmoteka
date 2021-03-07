import movieModalTemplate from '../templates/movieModal.hbs';
import modalVideoTemplate from '../templates/movieModalVideo.hbs';
import refs from './movieModalRefs';
import movieModalAPI from './movieModalAPI';

function generateMovieModalData(data) {
  refs.movieWrap.insertAdjacentHTML('afterbegin', movieModalTemplate(data));
};
function generateMovieModalVideo(data){
  refs.movieWrap.insertAdjacentHTML('beforeend', modalVideoTemplate(data));
};

refs.allMovieList.addEventListener('click', onMovieClick);
refs.closeModalBtn.addEventListener('click', onButtonClick);
refs.modalBackdrop.addEventListener('click', onOverlayClick);

function onButtonClick() {
  toggleModal();
  refs.movieWrap.innerHTML = '';
  window.removeEventListener('keydown', onEscPress);
  document.removeEventListener('click', addToWatch);
  document.removeEventListener('click', addToQueue);
}

function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    onButtonClick();
  }
}

function onEscPress(event) {
  if (event.code === 'Escape') {
    onButtonClick();
  }
}

function toggleModal() {
  document.body.classList.toggle('movieModalOpened');
  refs.modalBackdrop.classList.toggle('movieIsHidden');
}

function addToWatch(event) {
  event.preventDefault();
  const elementClicked = event.target;
  if (elementClicked.dataset.action === 'toWatch') {
    const id = event.target.dataset.id;
    console.log(id);
  }
}

function addToQueue(event) {
  event.preventDefault();
  const elementClicked = event.target;
  if (elementClicked.dataset.action === 'toQueue') {
    const id = event.target.dataset.id;
    console.log(id);
  }
}

async function getAllModalDetails(){
  await movieModalAPI.fetchMovieModalData().then(data=>generateMovieModalData(data));
  await movieModalAPI.fetchMovieModalVideo().then(({ results }) => {
    for (let i = 0; i < results.length; i += 1) {
      if (results[i].type === 'Trailer' && results[i].site === 'YouTube') {
        generateMovieModalVideo(results[i]);}
      break;
    }
  });
};

function onMovieClick(event) {
  if (event.target.dataset.onclick !== 'js-modal-onclick') {return;}
   movieModalAPI.movieID = event.target.dataset.id;
  toggleModal();
  window.addEventListener('keydown', onEscPress);
  document.addEventListener('click', addToWatch);
  document.addEventListener('click', addToQueue);
  getAllModalDetails();
};



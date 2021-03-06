import movieModalTemplate from '../templates/movieModal.hbs';
import modalVideoTemplate from '../templates/movieModalVideo.hbs';

const refs = {
  closeModalBtn: document.querySelector('.movieModalClose'),
  modalBackdrop: document.querySelector('.js-movieModal'),
  modalContainer: document.querySelector('.movieModal'),
  allMovieList: document.querySelector('.products-list'),
  movieWrap: document.querySelector('.movieModalWrap'),
};

function generateHTML(data) {
  refs.movieWrap.insertAdjacentHTML('beforeend', movieModalTemplate(data));
}

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

function fetchMovieModalVideo(movieID) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=cd745b1c38819d91d823e4d3c6c216e8&language=en-US`,
  )
    .then(response => response.json())
    .then(({ results }) => {
      for (let i = 0; i < results.length; i += 1) {
        if (results[i].type === 'Trailer' && results[i].site === 'YouTube') {
          refs.movieWrap.insertAdjacentHTML(
            'beforeend',
            modalVideoTemplate(results[i]),
          );
          break;
        }
      }
      return;
    });
}

function fetchMovieModalData(movieID) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=cd745b1c38819d91d823e4d3c6c216e8&language=en-US`,
  )
    .then(response => response.json())
    .then(data => generateHTML(data));
}

const getMovieAll = async id => {
  const data = await fetchMovieModalData(id);
  const video = await fetchMovieModalVideo(id);
};

function onMovieClick(event) {
  event.preventDefault();
  if (
    event.target.parentNode.nodeName !== 'LI' &&
    event.target.parentNode.className !== 'products-film'
  ) {
    return;
  }
  const id = event.target.parentNode.dataset.id;
  toggleModal();
  window.addEventListener('keydown', onEscPress);
  document.addEventListener('click', addToWatch);
  document.addEventListener('click', addToQueue);
  getMovieAll(id);
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

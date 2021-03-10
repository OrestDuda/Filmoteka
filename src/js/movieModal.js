import movieModalTemplate from '../templates/movieModal.hbs';
import modalVideoTemplate from '../templates/movieModalVideo.hbs';
import modalReviewsTemplate from '../templates/movieModalReviews.hbs';
import refs from './refs';
import movieModalAPI from './movieModalAPI';

function generateMovieModalData(data) {
  refs.movieWrap.insertAdjacentHTML('afterbegin', movieModalTemplate(data));
}
function generateMovieModalVideo(data) {
  refs.movieWrap.insertAdjacentHTML('beforeend', modalVideoTemplate(data));
}

function generateMovieModalReviews(data) {
  refs.movieWrap.insertAdjacentHTML('beforeend', modalReviewsTemplate(data));
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
  document.removeEventListener('click', moreToRead);
  document.removeEventListener('click', moreCommentsToRead);
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

async function getAllModalDetails() {
  await movieModalAPI
    .fetchMovieModalData()
    .then(data => generateMovieModalData(data));
  await movieModalAPI.fetchMovieModalVideo().then(({ results }) => {
    for (let i = 0; i < results.length; i += 1) {
      if (results[i].type === 'Trailer' && results[i].site === 'YouTube') {
        generateMovieModalVideo(results[i]);
      }
      break;
    }
  });

  const getComments = await movieModalAPI
    .fetchMovieModalReviews()
    .then(response => {
      if (!response.total_results) {
        return;
      }
      const { results } = response;
      return results;
    });

  const adjusted = adjComment(getComments);
  generateMovieModalReviews(adjusted);
}

function adjComment(objects) {
  const newObjects = [];
  for (let obj of objects) {
    const newObj = {};
    for (let key of Object.keys(obj)) {
      if (key === 'created_at') {
        newObj[key] = obj[key].slice(0, 10);
      } else {
        newObj[key] = obj[key];
      }
    }
    newObjects.push(newObj);
  }
  return newObjects;
}

function onMovieClick(event) {
  if (event.target.dataset.jsmodal !== 'js-modal-onclick') {
    return;
  }
  movieModalAPI.movieID = event.target.dataset.id;
  toggleModal();
  window.addEventListener('keydown', onEscPress);
  document.addEventListener('click', addToWatch);
  document.addEventListener('click', addToQueue);
  document.addEventListener('click', moreToRead);
  document.addEventListener('click', moreCommentsToRead);
  getAllModalDetails();
}

function moreToRead(event) {
  event.preventDefault();
  const elementClicked = event.target;
  if (elementClicked.dataset.jscomments === 'hideShow') {
    const allCommentsContent = document.querySelectorAll('.reviewContent');
    allCommentsContent.forEach(item => {
      if (item.clientHeight < item.scrollHeight) {
        item.nextElementSibling.classList.add('moreNeeded');
      }
    });
  }
}

function moreCommentsToRead(event) {
  event.preventDefault();
  const elementClicked = event.target;
  if (elementClicked.dataset.action === 'loadmore') {
    event.target.previousElementSibling.classList.toggle('reviewContentAll');
    if (event.target.innerText === 'Read More...') {
      event.target.innerText = 'Read Less...';
    } else {
      event.target.innerText = 'Read More...';
    }
  }
}

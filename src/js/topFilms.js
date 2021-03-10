import filmsTpl from '../templates/products.hbs';
import refs from './refs';
import { apiKey, baseUrl } from './api';
import initializePagination from './pagination';

function fetchFilms(pageNumber = 1) {
  return fetch(
    `${baseUrl}/3/trending/movie/day?api_key=${apiKey}&page=${pageNumber}`,
  )
    .then(response => response.json())
    .then(response => {
      // pagination.setTotalItems(total_results);

      const markup = filmsTpl(response.results);
      refs.productsList.innerHTML = '';
      refs.productsList.insertAdjacentHTML('beforeend', markup);

      return response;
    })
    .catch(error => console.log('error'));
}

// Жанры
function getGenres() {
  fetch(`${baseUrl}/3/genre/movie/list?api_key=${apiKey}`)
    .then(response => response.json())
    .then(({ genres }) => {
      console.log(genres);
      return genres;
    })
    .catch(error => console.log('error'));
}
getGenres();

const pagination = initializePagination(pageNumber =>
  fetchFilms(pageNumber).then(response => response.total_results),
);

const params = new URLSearchParams(window.location.search);
const currentPage = params.get('page') || 1;

pagination.movePageTo(currentPage);

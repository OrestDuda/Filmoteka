import filmsTpl from '../templates/products.hbs';
import boostrapPaginator from './pagination';
import refs from './refs';
import { apiKey, baseUrl } from './api';

const params = new URLSearchParams(window.location.search);
const currentPage = params.get('page') || 1;

function fetchFilms(pageNumber = 1) {
  fetch(`${baseUrl}/3/trending/movie/day?api_key=${apiKey}&page=${pageNumber}`)
    .then(response => response.json())
    .then(({ results, total_results }) => {
      const markup = filmsTpl(results);
      refs.productsList.insertAdjacentHTML('beforeend', markup);
      boostrapPaginator.set('rowsPerPage', results.length);
      boostrapPaginator.set('totalResult', total_results);
    })
    .catch(error => console.log('error'));
}

fetchFilms(currentPage);

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

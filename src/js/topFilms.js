import filmCard from '../templates/filmCard.hbs';
import refs from './refs';
import { apiKey, baseUrl } from './api';
import initializePagination from './pagination';

function fetchFilms(pageNumber = 1) {
  return fetch(
    `${baseUrl}/3/trending/movie/day?api_key=${apiKey}&page=${pageNumber}`,
  )
    .then(response => response.json())
    .then(response => {
      const markup = filmCard(response.results);
      refs.productsList.innerHTML = '';
      refs.productsList.insertAdjacentHTML('beforeend', markup);
      return response;
    })
    .catch(error => error);
}

// Жанры
function getGenres() {
  fetch(`${baseUrl}/3/genre/movie/list?api_key=${apiKey}`)
    .then(response => response.json())
    .then(({ genres }) => {
      console.log(genres);
      return genres;
    })
    .catch(error => error);
}
getGenres();

const pagination = initializePagination(pageNumber =>
  fetchFilms(pageNumber).then(response => response.total_results),
);

const params = new URLSearchParams(window.location.search);
const currentPage = params.get('page') || 1;

pagination.movePageTo(currentPage);

// const pageNumber = 1;
//
// const fetchFilms = async () => {
//   const films = await fetch(
//     `${baseUrl}/3/trending/movie/day?api_key=${apiKey}&page=${pageNumber}`,
//   )
//     .then(response => response.json())
//     .then(({ results }) => results);
//
//   const fetchAllGenres = await fetch(
//     `${baseUrl}/3/genre/movie/list?api_key=${apiKey}`,
//   )
//     .then(response => response.json())
//     .then(({ genres }) => genres);
//
//   films.map(film => {
//     film.release_date = film.release_date.slice(0, 4);
//   });
//   films.map(film => {
//     film.genre_ids = film.genre_ids.map(
//       idSearch => fetchAllGenres.find(genre => genre.id === idSearch).name,
//     );
//   });
//
//   refs.productsList.innerHTML = '';
//   refs.productsList.insertAdjacentHTML('beforeend', filmCard(films));
// };
//
// fetchFilms();

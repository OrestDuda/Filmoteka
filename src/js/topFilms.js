import filmCard from '../templates/filmCard.hbs';
import boostrapPaginator from './pagination';
import refs from './refs';
import { apiKey, baseUrl } from './api';
<<<<<<< Updated upstream

const params = new URLSearchParams(window.location.search);
const currentPage = params.get('page') || 1;

=======
import initializePagination from './pagination';
/*
>>>>>>> Stashed changes
function fetchFilms(pageNumber = 1) {
  fetch(`${baseUrl}/3/trending/movie/day?api_key=${apiKey}&page=${pageNumber}`)
    .then(response => response.json())
    .then(({ results, total_results }) => {
      const markup = filmCard(results);
      refs.productsList.insertAdjacentHTML('beforeend', markup);
      boostrapPaginator.set('rowsPerPage', results.length);
      boostrapPaginator.set('totalResult', total_results);
    })
    .catch(error => error);
}
<<<<<<< Updated upstream

fetchFilms(currentPage);

=======
>>>>>>> Stashed changes
// Жанры
function getGenres() {
  fetch(`${baseUrl}/3/genre/movie/list?api_key=${apiKey}`)
    .then(response => response.json())
    .then(({ genres }) => {
      return genres;
    })
    .catch(error => error);
}
getGenres();


<<<<<<< Updated upstream
=======
pagination.movePageTo(currentPage);
*/

const pageNumber = 1;


const fetchFilms = async ()=>{
    const films = await fetch(`${baseUrl}/3/trending/movie/day?api_key=${apiKey}&page=${pageNumber}`)
      .then(response =>response.json()).then(({results})=>results);

    const fetchAllGenres = await fetch(`${baseUrl}/3/genre/movie/list?api_key=${apiKey}`)
    .then(response =>response.json()).then(({genres})=>genres);

  films.map(film => {film.release_date = film.release_date.slice(0, 4)});
  films.map(film => {
    film.genre_ids = film.genre_ids.map(idSearch => fetchAllGenres.find(genre => genre.id === idSearch).name)
  })

  refs.productsList.innerHTML = '';
  refs.productsList.insertAdjacentHTML('beforeend', filmCard(films));
};

fetchFilms();

>>>>>>> Stashed changes

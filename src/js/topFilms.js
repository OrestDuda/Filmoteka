import filmCard from '../templates/filmCard.hbs';
import refs from './refs';
import { apiKey, baseUrl } from './api';
import initializePagination from './pagination';

const fetchFilms = async (pageNumber = 1) => {
  const films = await fetch(
    `${baseUrl}/3/trending/movie/day?api_key=${apiKey}&page=${pageNumber}`,
  )
    .then(response => response.json())
    .then(({ results }) => results);

  const fetchAllGenres = await fetch(
    `${baseUrl}/3/genre/movie/list?api_key=${apiKey}`,
  )
    .then(response => response.json())
    .then(({ genres }) => genres);

  films.map(film => {
    film.release_date = film.release_date.slice(0, 4);
  });
  films.map(film => {
    film.genre_ids = film.genre_ids.map(
      idSearch =>
        ` ` + fetchAllGenres.find(genre => genre.id === idSearch).name,
    );
  });

  refs.productsList.innerHTML = '';
  refs.productsList.insertAdjacentHTML('beforeend', filmCard(films));
};

const pagination = initializePagination(pageNumber =>
  fetchFilms(pageNumber).then(response => response.total_results),
);

const params = new URLSearchParams(window.location.search);
const currentPage = params.get('page') || 1;

pagination.movePageTo(currentPage);

refs.logoLink.addEventListener('click', event => {
  event.preventDefault();
  fetchFilms(1);
});

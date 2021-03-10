import filmCard from '../templates/filmCard.hbs';
import refs from './refs';
import { apiKey, baseUrl } from './api';
import initializePagination from './pagination';

const queryOptions = {
  apiKey: 'cd745b1c38819d91d823e4d3c6c216e8',
  query: '',
  genresList: [],
};

function startQueryOptions() {
  fetch(
    `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`,
  ).then(res => res.json());

  fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`,
  )
    .then(res => res.json())
    .then(result => {
      queryOptions.genresList = result.genres;
    });
}

function prepareResults(results) {
  results = results.map(result => {
    result.release_date = result.release_date.slice(0, 4);
    result.genre_ids = result.genre_ids.map(
      idg => ' ' + queryOptions.genresList.find(genre => genre.id === idg).name,
    );
    return result;
  });
}

function createFilm(response) {
  prepareResults(response.results);
  const filmList = filmCard(response.results);
  refs.productsList.insertAdjacentHTML('beforeend', filmList);
  return response;
}

function handlSearch(event) {
  if (event.type === 'keydown') {
    if (event.keyCode !== 13) {
      return;
    }
  }

  event.preventDefault();

  const pagination = initializePagination(pageNumber =>
    fetchAndRenderFilmList(refs.searchForm[0].value, pageNumber).then(
      response => response.total_results,
    ),
  );

  const params = new URLSearchParams(window.location.search);
  const currentPage = 1;

  params.set('search', refs.searchForm[0].value);

  history.pushState(null, null, '?' + params.toString());
  pagination.movePageTo(currentPage);
}

function fetchFilmList(searchQuery, page = 1, qOnPage) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${queryOptions.apiKey}&query=${searchQuery}&page=${page}`;
  return fetch(url)
    .then(res => res.json())
    .catch(err => Error(err));
}

function fetchAndRenderFilmList(searchQuery, page) {
  refs.productsList.innerHTML = '';
  queryOptions.query = searchQuery;
  queryOptions.page = page;

  return fetchFilmList(
    queryOptions.query,
    queryOptions.page,
    queryOptions.qOnPage,
  ).then(response => createFilm(response));
}

startQueryOptions();

refs.searchBtn.addEventListener('click', handlSearch);
refs.searchForm.addEventListener('keydown', handlSearch);

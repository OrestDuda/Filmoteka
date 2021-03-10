import filmCard from '../templates/filmCard.hbs';
import refs from './refs';
import { apiKey, baseUrl } from './api';

const queryOptions = {
  apiKey: 'cd745b1c38819d91d823e4d3c6c216e8',
  query: '',
  genresList: [],
};

function startQueryOptions() {
  fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
    .then(res => res.json())
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

function createFilm(results) {
  prepareResults(results);
  const filmList = filmCard(results);
  refs.productsList.insertAdjacentHTML('beforeend', filmList);
}

function handlSearch(event) {
  if (event.type === 'keydown') {
    if (event.keyCode !== 13) {
      return;
    }
  }

  event.preventDefault();

  refs.productsList.innerHTML = '';
  queryOptions.query = refs.searchForm[0].value;

  fetchFilmList(
    queryOptions.query,
    queryOptions.page,
    queryOptions.qOnPage,
  ).then(response => createFilm(response.results));
}

function fetchFilmList(searchQuery, page = 1, qOnPage) {
  const apiKey = 'cd745b1c38819d91d823e4d3c6c216e8';
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${queryOptions.apiKey}&query=${searchQuery}`;
  return fetch(url)
    .then(res => res.json())
    .catch(err => Error(err));
}

startQueryOptions();

refs.searchBtn.addEventListener('click', handlSearch);
refs.searchForm.addEventListener('keydown', handlSearch);

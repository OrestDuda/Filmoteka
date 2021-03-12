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
  fetch(`${baseUrl}/3/configuration?api_key=${apiKey}`).then(res => res.json());

  fetch(`${baseUrl}/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
    .then(res => res.json())
    .then(result => {
      queryOptions.genresList = result.genres;
    });
}

function prepareResults(results) {
  results.map(result => {
    result.release_date = result.release_date?.slice(0, 4);
    result.genre_ids = result.genre_ids.map(
      idg => ' ' + queryOptions.genresList.find(genre => genre.id === idg).name,
    );
    return result;
  });
}

function createFilm(response) {
  if (response.total_results === 0) {
    document.querySelector('.error-text').classList.remove('is-hidden');
  } else {
    document.querySelector('.error-text').classList.add('is-hidden');
  }
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

  if (
    !refs.searchForm[0].value ||
    refs.searchForm[0].value === '' ||
    !/\S/.test(refs.searchForm[0].value)
  ) {
    return;
  }

  const pagination = initializePagination();

  pagination.on('afterMove', function (eventData) {
    const params = new URLSearchParams(window.location.search);
    const currentPage = params.get('page') || 1;

    fetchAndRenderFilmList(refs.searchForm[0].value, currentPage).then(
      response => {
        pagination.setTotalItems(response.total_results);
      },
    );
  });

  const params = new URLSearchParams(window.location.search);
  const currentPage = 1;

  params.set('search', refs.searchForm[0].value);

  history.pushState(null, null, '?' + params.toString());
  fetchAndRenderFilmList(refs.searchForm[0].value, currentPage).then(
    response => {
      pagination.setTotalItems(response.total_results);
      pagination.movePageTo(currentPage);
    },
  );
}

function fetchFilmList(searchQuery, page = 1, qOnPage) {
  const url = `${baseUrl}/3/search/movie?api_key=${queryOptions.apiKey}&query=${searchQuery}&page=${page}`;
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

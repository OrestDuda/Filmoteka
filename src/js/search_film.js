import tplFilmList from '../templates/products.hbs';

const refs = {
  galleryFilm: document.querySelector('.products-list'),
  searchBtn: document.querySelector('.bi-search'),
  searchForm: document.querySelector('.search-form'),
};

const queryOptions = {
  apiKey: 'cd745b1c38819d91d823e4d3c6c216e8',
  query: '',
  pathBasePoster: '',
  genresList: [],
};

function startQueryOptions() {
  fetch(
    `https://api.themoviedb.org/3/configuration?api_key=${queryOptions.apiKey}`,
  )
    .then(res => res.json())
    .then(result => {
      queryOptions.pathBasePoster =
        result.images.secure_base_url + result.images.poster_sizes[3];
    });
  fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${queryOptions.apiKey}&language=en-US`,
  )
    .then(res => res.json())
    .then(result => {
      queryOptions.genresList = result.genres;
    });
}

function prepareResults(results) {
  results = results.map(result => {
    result.release_date = result.release_date.slice(0, 4);
    result.poster_path = queryOptions.pathBasePoster + result.poster_path;
    result.genre_ids = result.genre_ids.map(
      idg => ' ' + queryOptions.genresList.find(genre => genre.id === idg).name,
    );
    return result;
  });
}

function createFilm(results) {
  prepareResults(results);
  const filmList = tplFilmList(results);
  refs.galleryFilm.insertAdjacentHTML('beforeend', filmList);
}

function handlSearch(event) {
  refs.galleryFilm.innerHTML = '';
  queryOptions.query = refs.searchForm[0].value;
  //   event.preventDefualt();
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

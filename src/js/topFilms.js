import filmsTpl from '../templates/products.hbs';

const productslistRef = document.querySelector('#products-list-js');

function fetchFilms() {
  const url = 'https://api.themoviedb.org/3/trending/movie/day';
  const keyApi = 'cd745b1c38819d91d823e4d3c6c216e8';

  fetch(`${url}?api_key=${keyApi}`)
    .then(response => response.json())
    .then(({ results }) => {
      console.log(results);

      const markup = filmsTpl(results);
      console.log(markup);

      productslistRef.insertAdjacentHTML('beforeend', markup);
    })
    .catch(error => console.log('error'));
}

fetchFilms();

// Жанры
function getGenres() {
  const url = 'https://api.themoviedb.org/3/genre/movie/list';
  const keyApi = 'cd745b1c38819d91d823e4d3c6c216e8';

  fetch(`${url}?api_key=${keyApi}`)
    .then(response => response.json())
    .then(({ genres }) => {
      console.log(genres);

      return genres;
    })
    .catch(error => console.log('error'));
}
getGenres();

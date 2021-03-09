import error404 from '../templates/errorFromServer.hbs';

const refs = {
  logoLink: () => document.querySelector('.logo-link'),
  productsContainer: () => document.querySelector('.products .container'),
  key: () => cd745b1c38819d91d823e4d3c6c216e8,
};

function errorFromServer(error) {
  refs.productsContainer().innerHTML = '';
  const errorMarkUp = error404(error);
  refs.productsContainer().insertAdjacentHTML('beforeend', errorMarkUp);
}

export default errorFromServer;

const refs = {
  logoLink: () => document.querySelector('.logo-link'),
  productsContainer: () => document.querySelector('.products-list'),
  key: () => cd745b1c38819d91d823e4d3c6c216e8,
};

logoLink().addEventListener('click', renderTopMovies()); //здесь нужно будет подставить функцию Зины

import refs from './refs';
refs.userBar.addEventListener('click', () =>
  refs.menuContainer.classList.toggle('is-hidden'),
);

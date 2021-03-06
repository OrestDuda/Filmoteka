const refs = {
  menuContainer: () => document.querySelector('.menu-list-container'),
  userBar: () => document.querySelector('.menu-user-link'),
};

refs
  .userBar()
  .addEventListener('click', () =>
    refs.menuContainer().classList.toggle('is-hidden'),
  );

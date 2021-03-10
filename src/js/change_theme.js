const refs = {
  themeTogglerLink: () => document.querySelector('#theme-toggler-link'),
  body: () => document.querySelector('body'),
  movieHeader: () => document.querySelectorAll('.products-name'),
  allTheButtons: () => document.querySelector('button'),
  footer: () => document.querySelector('footer'),
  footerText: () => document.querySelector('.footer_container'),
  footerTextTeam: () => document.querySelector('.team__modal'),

  theme: localStorage.getItem('theme'),
};

refs.themeTogglerLink().addEventListener('click', () => {
  refs.body().classList.toggle('dark-background');
  refs.movieHeader().forEach(el => el.classList.toggle('white-text'));
  refs.allTheButtons().classList.toggle('white-text');
  refs.footer().classList.toggle('footer-dark-background');
  refs.footerText().classList.toggle('white-text');
  refs.footerTextTeam().classList.toggle('white-text');

  localStorage.setItem('theme', 'dark-theme');
});

function deleteThemeIf() {
  if (refs.body().classList.contains('dark-background')) {
    localStorage.removeItem('theme');
  }
}

refs.themeTogglerLink().addEventListener('click', deleteThemeIf);

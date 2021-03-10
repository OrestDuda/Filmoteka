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

console.dir(refs.themeTogglerLink);
refs.themeTogglerLink().addEventListener('click', themeToggler());

function themeToggler() {
  refs.body().classList.toggle('dark-background');
  refs.movieHeader().forEach(el => el.classList.toggle('white-text'));
  refs.allTheButtons().classList.toggle('white-text');
  refs.footer().classList.toggle('footer-dark-background');
  refs.footerText().classList.toggle('white-text');
  refs.footerTextTeam().classList.toggle('white-text');

  //   localStorage.setItem('theme', 'dark-theme');
}

// function changeThemeIf() {
//   if (!refs.checkbox.checked && refs.body.classList.contains('dark-theme')) {
//     refs.body.classList.replace('dark-theme', 'light-theme');
//     localStorage.setItem('theme', 'light-theme');
//   }
// }

// refs.checkbox.addEventListener('change', changeThemeIf);

// if (refs.theme === 'dark-theme') {
//   toggler();
//   refs.checkbox.checked = true;
// }

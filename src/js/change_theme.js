const refs = {
  themeTogglerLink: () => document.querySelector('#theme-toggler-link'),
  body: () => document.querySelector('body'),
  movieHeader: () => document.querySelector('.products-name'),
  allTheButtons: () => document.querySelector('button'),
  footer: () => document.querySelector('footer'),
  theme: localStorage.getItem('theme'),
};

console.log(refs.themeToggler);

refs.themeTogglerLink().addEventListener('click', themeToggler());

function themeToggler() {
  refs.body().classList.toggle('dark-background');
  refs.movieHeader().classList.toggle('white-text');
  refs.allTheButtons().classList.toggle('white-text');
  refs.footer().classList.toggle('footer-dark-background');

  //   localStorage.setItem('theme', 'dark-theme');
}

// function changeThemeIf() {
//   if (!refs.checkbox.checked && refs.body.classList.contains('dark-theme')) {
//     refs.body.c  lassList.replace('dark-theme', 'light-theme');
//     localStorage.setItem('theme', 'light-theme');
//   }
// }

// refs.checkbox.addEventListener('change', changeThemeIf);

// if (refs.theme === 'dark-theme') {
//   toggler();
//   refs.checkbox.checked = true;
// }

import refs from './refs';

refs.themeTogglerLink.addEventListener('click', () => {
  refs.body.classList.toggle('dark-background');
  refs.movieHeader.forEach(el => el.classList.toggle('white-text'));
  refs.allTheButtons.classList.toggle('white-text');
  refs.footer.classList.toggle('footer-dark-background');
  refs.footerText.classList.toggle('white-text');
  refs.footerTextTeam.classList.toggle('white-text');

  localStorage.setItem('theme', 'dark-theme');
});

function deleteThemeIf() {
  if (!refs.body.classList.contains('dark-background')) {
    localStorage.removeItem('theme');
  }
}

refs.themeTogglerLink.addEventListener('click', deleteThemeIf);

function setSavedTheme() {
  if (refs.theme === 'dark-theme') {
    refs.body.classList.toggle('dark-background');
    refs.movieHeader.forEach(el => el.classList.toggle('white-text'));
    refs.allTheButtons.classList.toggle('white-text');
    refs.footer.classList.toggle('footer-dark-background');
    refs.footerText.classList.toggle('white-text');
    refs.footerTextTeam.classList.toggle('white-text');
  }
}

setSavedTheme();

const refs = {
  themeToggler: () => document.querySelector('#theme-toggler-link'),
  body: () => document.querySelector('body'),
  novieHeader: () => document.querySelector('.products-name'),
  theme: localStorage.getItem('theme'),
};

console.log(refs.themeToggler);
// refs.checkbox.addEventListener('change', toggler);

// function toggler() {
//   refs.body.classList.add('dark-theme');
//   localStorage.setItem('theme', 'dark-theme');
// }

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

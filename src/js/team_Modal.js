const refs = {
  teamContainer: () => document.querySelector('.team-faces'),
  teamModalToggler: () => document.querySelector('.team__modal'),
};

refs
  .teamModalToggler()
  .addEventListener('click', () =>
    refs.teamContainer().classList.toggle('is-hidden'),
  );

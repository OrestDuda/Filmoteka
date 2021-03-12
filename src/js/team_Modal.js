import refs from './refs';

refs.teamModalBtnOpen.addEventListener('click', onDevelopersClick);
refs.teamModalBtnClose.addEventListener('click', onTeamModalClose);
refs.teamModalBackdrop.addEventListener('click', onTeamModalBackClick);

function onTeamModalClose() {
  toggleTeam();
  window.removeEventListener('keydown', onEscPress);
}

function onTeamModalBackClick(event) {
  if (event.target === event.currentTarget) {
    onTeamModalClose();
  }
}

function onEscPress(event) {
  if (event.code === 'Escape') {
    onTeamModalClose();
  }
}

function toggleTeam() {
  refs.teamModalBackdrop.classList.toggle('teamModalIsHidden');
}

function onDevelopersClick(event) {
  toggleTeam();
  window.addEventListener('keydown', onEscPress);
}

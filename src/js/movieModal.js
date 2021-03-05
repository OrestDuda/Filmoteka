const refs = {
  openModalBtn: document.querySelector("[movieModalOpen]"),
  closeModalBtn: document.querySelector("[movieModalClose]"),
  modal: document.querySelector("[js-movieModal]"),
  modalContainer: document.querySelector('.movieModal'),
};

function toggleModal() {
  document.body.classList.toggle("movieModalOpened");
  refs.modal.classList.toggle("movieIsHidden");
};

refs.openModalBtn.addEventListener("click", toggleModal);
refs.closeModalBtn.addEventListener("click", toggleModal);

window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    toggleModal();
  }
})
window.addEventListener ('click', function(event){
  if (event.target == refs.modal) {
    toggleModal();
  }
})


import movieModalTemplate from '../templates/movieModal.hbs';

const optionsModal = {
  API: 'cd745b1c38819d91d823e4d3c6c216e8',
  ID: 587807,
}


function generateHTML(data){
  refs.modalContainer.insertAdjacentHTML('beforeend', movieModalTemplate(data));
};

function fetchMovieModalData(){
  return fetch(`https://api.themoviedb.org/3/movie/${optionsModal.ID}?api_key=${optionsModal.API}&language=en-US`)
    .then(response => response.json()).then(data => generateHTML(data));
};

fetchMovieModalData();





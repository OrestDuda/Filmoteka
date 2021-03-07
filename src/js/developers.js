import * as basicLightbox from 'basiclightbox';
import orest from '../images/actors_images/Keanu_Reeves.jpg';
import zinaida from '../images/actors_images/Charlize_Theron.jpg';
import kateryna from '../images/actors_images/Scarlette_Johansson.jpg';
import nastya from '../images/actors_images/Gal_Gadot.jpg';
import olga from '../images/actors_images/Amy_Adams.jpg';
import nikolay from '../images/actors_images/Leonardo_DiCaprio.jpg';
import denys from '../images/actors_images/Dwayne_Johnson.jpg';
import georges from '../images/actors_images/Adam_Sandler.jpg';


const listOfTeamMembers = `<div class="team_list">

<div class="teammate_info">
    <img src="${orest}" alt="orest" class="teammate_img">
    <p class="teammate_name">Orest Duda</p>
    <p class="teammate_job">Team Leader</p>
    </div>

<div class="teammate_info">
    <img src="${zinaida}" alt="zinaida" class="teammate_img">
    <p class="teammate_name">Zinaida Razinkova</p>
    <p class="teammate_job">Scrum Master</p>
    </div>

<div class="teammate_info">
    <img src="${kateryna}" alt="kateryna" class="teammate_img">
    <p class="teammate_name">Kateryna Boikova</p>
    <p class="teammate_job">Developer</p>
    </div>

<div class="teammate_info">
    <img src="${nastya}" alt="nastya" class="teammate_img">
    <p class="teammate_name">Nastya Boiko</p>
    <p class="teammate_job">Developer</p>
</div>

<div class="teammate_info">
    <img src="${olga}" alt="olga" class="teammate_img">
    <p class="teammate_name">Olga Nesterenko</p>
    <p class="teammate_job">Developer</p>
</div>

<div class="teammate_info">
    <img src="${nikolay}" alt="nikolay" class="teammate_img">
    <p class="teammate_name">Nikolay Vladimirovich</p>
    <p class="teammate_job">Developer</p>
</div>

<div class="teammate_info">
    <img src="${denys}" alt="denis" class="teammate_img">
    <p class="teammate_name">Denys Tymofieiev</p>
    <p class="teammate_job">Developer</p>
</div>

<div class="teammate_info">
    <img src="${georges}" alt="georges" class="teammate_img">
    <p class="teammate_name">Georges Kassissia</p>
    <p class="teammate_job">Developer</p>
    </div>
    </div>`;

const container = document.querySelector('.js-team-modal')
const modalOfTeam = basicLightbox.create(listOfTeamMembers);

container.addEventListener('click', openModal);

function openModal() {
modalOfTeam.show();
window.addEventListener('keydown', closeModal);

  function closeModal(esc) {
    if (esc.code === 'Escape') {
      modalOfTeam.close();
      window.removeEventListener('keydown', closeModal);
    }
  }
}

    
    
    
    
    
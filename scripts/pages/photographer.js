//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
  let photographers;
  let medias;
  try {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    photographers = await data.photographers;
    medias = await data.media;
    // console.log(data);
  } catch (error) {
    console.log(error);
  }

  // récupération des photographes et medias
  return {
    photographers,
    medias,
  };
}
// =====================================================================
const photographMedias = document.querySelector('.photograph-medias');
let i = 0;
let count = 0;
let mediasByUser = [];
const arrLikes = [];
let photographData = [];

const photographerPage = async () => {
  const { photographers, medias } = await getPhotographers();

  // récupération de l'id du photographe via l'url
  const params = new URL(document.location).searchParams;
  const idLink = parseInt(params.get('id'));
  const photographHeader = document.querySelector('.photograph-header');
  // const url = window.location.href;

  // itérer sur le tableau photographers, pour obtenir chaque id
  for (let i = 0; i < photographers.length; i++) {
    if (idLink === photographers[i].id) {
      // passer le photographe correspondant à l'id dans l'url, a la fonction createContact pour afficher la page du photographe en question.

      medias.forEach((media) => {
        if (media.photographerId === photographers[i].id) {
          mediasByUser.push(media);
          arrLikes.push(media.likes); // création d'un tableau avec le nombre total de likes
          // Donnée du photographe
          photographData = photographers[i];
        }
      });
      const photographerPageModel = photographerTemplate(photographers[i]);

      // Pour la bannière de profil du photographe
      const profileInfoDOM = photographerPageModel.getProfileInfoDOM();
      const profilePictureDOM = photographerPageModel.getProfilPictureDOM();
      photographHeader.prepend(profileInfoDOM);
      photographHeader.append(profilePictureDOM);

      // Pour afficher la petite barre de tarif en bas
      const infoFixedAtTheBottom =
        photographerPageModel.getInfoAtTheBottomDOM(arrLikes);
      photographMedias.appendChild(infoFixedAtTheBottom);

      // Pour la partie medias, passer en argumant chaque media a la factory getMedias

      mediasByUser.forEach((media) => {
        createMedia(media, photographers[i]);
      });
    }
  }
};
// =====================================================================
// Changement de slide :

const next = document.querySelector('.next-btn');
const back = document.querySelector('.back-btn');
// slide suivante
/* 
  Retire la class activ de l'elem affiché dans le slide avant d'incrémenter count,
  puis ajoute la classe activ sur le nouvel elem.
  Si count est inférieur au dernier élément, on incrémente ++, sinon cela veut dire qu'on est au dernier élément et qu'il faut revenir a l'élément 0.
 */
const nextItem = () => {
  const itemsInSlider = document.querySelectorAll('.items-in-slider');
  itemsInSlider[count].classList.remove('activ');
  itemsInSlider[count].parentElement.classList.remove('activ');

  if (count < itemsInSlider.length - 1) {
    count++;
  } else {
    count = 0;
  }
  itemsInSlider[count].classList.add('activ');
  itemsInSlider[count].parentElement.classList.add('activ');
};
// slide précédente
/* 
  Retire la class activ de l'elem affiché  dans le slide avant de décrémenter count,
  puis ajoute la classe activ sur le nouvel elem.
  Si count est sup a 0, on décrémente --, sinon count = au dernier élément du tableau, pour qu'on puisse passer du premier elem au dernier elem.
 */
const backItem = () => {
  const itemsInSlider = document.querySelectorAll('.items-in-slider');
  console.log(itemsInSlider[count]);
  itemsInSlider[count].classList.remove('activ');
  itemsInSlider[count].parentElement.classList.remove('activ');
  if (count > 0) {
    count--;
  } else {
    count = itemsInSlider.length - 1;
  }
  itemsInSlider[count].classList.add('activ');
  itemsInSlider[count].parentElement.classList.add('activ');
};

next.addEventListener('click', nextItem);
back.addEventListener('click', backItem);
// =====================================================================
const filterSelect = document.getElementById('filter-by');
filterSelect.addEventListener('change', () => {
  const optionValue = filterSelect.value;
  console.log(optionValue);
  isFilterBy(optionValue);
  updateMediaDisplay(mediasByUser, photographData);
  console.log(photographData);
});
const isFilterBy = (option) => {
  const optionSelected = option;
  console.log(mediasByUser);
  if (optionSelected === 'pop') {
    mediasByUser.sort((a, b) => b.likes - a.likes);
  } else if (optionSelected === 'date') {
    mediasByUser.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
  } else if (optionSelected === 'title') {
    mediasByUser.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    return mediasByUser;
  }
};
// fonction de tri pour les dates
const compareDates = (a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateA - dateB; //return par ordre croissant.
};
// =====================================================================

const createMedia = (media, photographers) => {
  const photographerPageModel = photographerTemplate(photographers);
  const slideMediasContainer = document.querySelector('.container-medias');
  const displayMedias = photographerPageModel.getMediasDOM(media);
  const displayMediasSlider = photographerPageModel.getMediasDOM(media);
  const div = document.createElement('div');
  const span = document.createElement('span');
  // ajoute les images pour le slider dans la div .slider > .container-medias
  slideMediasContainer.appendChild(div);
  div.appendChild(displayMediasSlider);
  const itemsInSlider = div.childNodes;

  itemsInSlider.forEach((itemSlider) => {
    div.appendChild(span); //titre de la photo dans le slider
    const titleContent = itemSlider.getAttribute('data-title');
    itemSlider.setAttribute('class', 'items-in-slider');
    span.setAttribute('class', 'title-in-slider');
    span.innerHTML = `${titleContent}`;
  });

  // créer un article pour chaque media, avec un lien a l'interieur de l'article
  const articleByMedia = photographerPageModel.getArticleMedia(displayMedias);
  photographMedias.appendChild(articleByMedia);

  // au click affiche le bon média dans le slide
  articleByMedia.addEventListener('click', (e) => {
    const id = e.target.id;
    const itemsInSlider = document.querySelectorAll('.items-in-slider'); //
    for (let i = 0; itemsInSlider.length > i; i++) {
      let idMedia = itemsInSlider[i].id;
      let parentItemElem = itemsInSlider[i].parentElement;
      parentItemElem.classList.remove('activ'); //retire a toutes les div la class activ
      if (idMedia == id) {
        parentItemElem.classList.add('activ');
        // count prend l'indice de l'image en cours, du coup si je clique sur l'image en position 3 du tableau, count démarrera au même indice du tableau
        count = i;
      }
    }
  });
  // Ajout titre + likes photo
  const likesAndTitleMedia =
    photographerPageModel.getLikesAndTitleMediaDOM(media);
  articleByMedia.appendChild(likesAndTitleMedia);
};
// =====================================================================
const updateMediaDisplay = (mediasByUser, photographerData) => {
  // Sélectionne l'élément HTML où les médias sont affichés.
  const mediasContainer = document.querySelector('.photograph-medias');
  const slideMediasContainer = document.querySelector('.container-medias');

  // Supprime tous les médias actuellement affichés.
  mediasContainer.innerHTML = '';
  // Supprime tous les médias du slide.
  slideMediasContainer.innerHTML = '';

  // Parcoure le tableau trié mediasByUser et créez à nouveau les éléments media.
  mediasByUser.forEach((media) => {
    createMedia(media, photographerData);
  });
};
photographerPage();

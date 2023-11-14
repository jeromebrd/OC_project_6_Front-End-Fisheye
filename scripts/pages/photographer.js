//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
  let photographers;
  let medias;
  try {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    photographers = await data.photographers;
    medias = await data.media;
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
const photographHeader = document.querySelector('.photograph-header');
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

  //si aucun idLink n'est présent dans l'url on redirige vers index.html
  if (idLink) {
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
        const photographerPageTemplate = photographerTemplate(photographers[i]);

        // Pour créer la bannière de profil du photographe
        createProfileBanner(photographerPageTemplate);

        // Pour afficher la petite barre de likes et de tarif en bas
        createInfoLikesAndPrice(photographerPageTemplate, arrLikes);

        // Création d'un article (média) pour chaque média par utilisateur
        mediasByUser.forEach((media) => {
          createMedia(media, photographers[i]);
        });
        // trier par défaut par date
        isFilterBy('date');
      }
    }
  } else {
    window.location.href = '/index.html';
  }
};

const createProfileBanner = (template) => {
  const profileInfoDOM = template.getProfileInfoDOM();
  const profilePictureDOM = template.getProfilPictureDOM();
  photographHeader.prepend(profileInfoDOM);
  photographHeader.append(profilePictureDOM);
};

const createInfoLikesAndPrice = (template, arr) => {
  const infoFixedAtTheBottom = template.getInfoAtTheBottomDOM(arr);
  photographMedias.appendChild(infoFixedAtTheBottom);
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
/* 
  fonction pour trier les médias selon l'option du select choisi.
    >=> par popularité (likes), par date, par titre
*/
const filterSelect = document.getElementById('filter-by');
filterSelect.addEventListener('change', () => {
  const optionValue = filterSelect.value;
  isFilterBy(optionValue);
  updateMediaDisplay(mediasByUser, photographData);
});

const isFilterBy = (option) => {
  const optionSelected = option;
  if (optionSelected === 'pop') {
    mediasByUser.sort((a, b) => b.likes - a.likes);
  } else if (optionSelected === 'date') {
    mediasByUser.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB; //return par ordre croissant.
    });
  } else if (optionSelected === 'title') {
    mediasByUser.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    return mediasByUser;
  }
};

// =====================================================================

const createMedia = (media, photographers) => {
  const photographerPageTemplate = photographerTemplate(photographers);
  const slideMediasContainer = document.querySelector('.container-medias');
  const displayMedias = photographerPageTemplate.getMediasDOM(media);
  const displayMediasSlider = photographerPageTemplate.getMediasDOM(media);
  const div = document.createElement('div');
  const h2 = document.createElement('h2');
  // ajoute les images pour le slider dans la div .slider > .container-medias
  slideMediasContainer.appendChild(div);
  div.appendChild(displayMediasSlider);
  const itemsInSlider = div.childNodes;

  itemsInSlider.forEach((itemSlider) => {
    div.appendChild(h2); //titre de la photo dans le slider
    const titleContent = itemSlider.getAttribute('data-title');
    itemSlider.setAttribute('class', 'items-in-slider');
    h2.setAttribute('class', 'title-in-slider');
    h2.innerHTML = `${titleContent}`;
  });

  // créer un article pour chaque media, avec un lien a l'interieur de l'article
  const articleByMedia =
    photographerPageTemplate.getArticleMedia(displayMedias);
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
    photographerPageTemplate.getLikesAndTitleMediaDOM(media);
  articleByMedia.appendChild(likesAndTitleMedia);

  // article > div[1] > p[1] > text[0] & icon[1]
  const icon = articleByMedia.childNodes[1].childNodes[1].childNodes[1];
  const textLike = articleByMedia.childNodes[1].childNodes[1].childNodes[0];
  const titleContent = articleByMedia.childNodes[1].childNodes[0].textContent;

  icon.addEventListener('click', () => {
    icon.classList.toggle('liked');
    // si la classe liked est activ alors on ajoute +1 like, sinon on retire un like
    if (icon.classList.contains('liked')) {
      addLike(textLike);
      updateSumLikes(arrLikes);
      isLiked(mediasByUser, titleContent, true);
    } else {
      removeLike(textLike);
      updateSumLikes(arrLikes);
      isLiked(mediasByUser, titleContent, false);
    }
  });
};

// =====================================================================
const updateMediaDisplay = (mediasByUser, photographerData) => {
  // Sélectionne l'élément HTML où les médias sont affichés.
  const mediasContainer = document.querySelector('.photograph-medias');
  const slideMediasContainer = document.querySelector('.container-medias');
  const photographerPageTemplate = photographerTemplate(photographData);
  // console.log(mediasByUser, mediasData);
  // Supprime tous les médias actuellement affichés.
  mediasContainer.innerHTML = '';
  // Supprime tous les médias du slide.
  slideMediasContainer.innerHTML = '';

  // Parcoure le tableau trié mediasByUser et créez à nouveau les éléments media.
  mediasByUser.forEach((media) => {
    createMedia(media, photographerData);
  });

  createInfoLikesAndPrice(photographerPageTemplate, arrLikes);
};

// =====================================================================
// fonctions de likes des medias
const addLike = (textLike) => {
  let likeNb = Number(textLike.textContent); //converti la valeur en nombre
  likeNb++;
  textLike.textContent = likeNb;
  arrLikes.push(1);
};
const removeLike = (textLike) => {
  let likeNb = Number(textLike.textContent); //converti la valeur en nombre
  likeNb--;
  textLike.textContent = likeNb;
  arrLikes.pop();
};

// mise à jour du nombre de likes total
const updateSumLikes = (arr) => {
  // selectionne l'élément du nombre de likes total
  const likesBottomElem = document.querySelector('.price-bottom');
  const i = document.createElement('i');
  let likesText = likesBottomElem.childNodes[0];
  likesText.textContent = '';
  const nbLikes = arr.reduce((acc, currentValue) => acc + currentValue);
  likesText.textContent = nbLikes;
  likesText.appendChild(i).setAttribute('class', 'fa-solid fa-heart');
  i.style.paddingLeft = '10px';
};
/* 
  Détails fonction isLiked(arr, title, bool) :
  >=> arr = tableau d'objet des medias 
  >=> title = titre du media dans le dom (verification pour la correspondance de l'image dans le DOM et celle dans le tableau) 
  >=> bool = booléen,
    -> si true, alors on ajoute un like + on ajoute la propriété liked sur l'objet média
    -> si false, alors on retire un like + la propriété liked = false 
 */
const isLiked = (arr, title, bool) => {
  arr.forEach((media) => {
    if (media.title === title) {
      if (bool) {
        media.likes = media.likes + 1;
        media.liked = true;
      } else {
        media.likes = media.likes - 1;
        media.liked = false;
      }
    }
  });
};
// =====================================================================
// accessibilité
// Navigation slide
const select = document.querySelector('#filter-by');
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    // encadre la flèche gauche lorsqu'elle est actionnée
    next.classList.remove('activ-elem');
    back.classList.add('activ-elem');
    backItem();
  } else if (e.key === 'ArrowRight') {
    // encadre la flèche droite lorsqu'elle est actionnée
    back.classList.remove('activ-elem');
    next.classList.add('activ-elem');
    nextItem();
  }
});
// Pour fermer la modal en appuyant sur "echap"
window.addEventListener('keydown', (e) => {
  const key = e.key;
  if (key === 'Escape') {
    modals.forEach((modal) => {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    });
    back.classList.remove('activ-elem');
    next.classList.remove('activ-elem');
    main.setAttribute('aria-hidden', 'false');
  }
});

photographerPage();

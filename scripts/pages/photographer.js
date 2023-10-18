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
let i = 0;
let count = 0;

const photographerPage = async () => {
  const { photographers, medias } = await getPhotographers();

  // récupération de l'id du photographe via l'url
  const params = new URL(document.location).searchParams;
  const idLink = parseInt(params.get('id'));
  const photographHeader = document.querySelector('.photograph-header');
  const photographMedias = document.querySelector('.photograph-medias');
  const url = window.location.href;
  console.log(url);

  // itérer sur le tableau photographers, pour obtenir chaque id
  for (let i = 0; i < photographers.length; i++) {
    if (idLink === photographers[i].id) {
      // passer le photographe correspondant à l'id dans l'url, a la fonction createContact pour afficher la page du photographe en question.
      const mediasByUser = [];
      const arrLikes = [];
      medias.forEach((media) => {
        if (media.photographerId === photographers[i].id) {
          mediasByUser.push(media);
          arrLikes.push(media.likes); // création d'un tableau avec le nombre total de likes
        }
      });
      console.log(arrLikes);
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
        const mediasSliderElem = document.querySelector('.container-medias');
        const displayMedias = photographerPageModel.getMediasDOM(media);
        const displayMediasSlider = photographerPageModel.getMediasDOM(media);

        // ajoute les images pour le slider dans la div .slider > .container-medias
        mediasSliderElem.appendChild(displayMediasSlider);
        const itemsInSlider = mediasSliderElem.childNodes;
        // displayItemInSlider(itemsInSlider);
        itemsInSlider.forEach((itemSlider) => {
          itemSlider.setAttribute('class', 'itemsInSlider');
        });
        // créer un article pour chaque media, avec un lien a l'interieur de l'article
        const articleByMedia =
          photographerPageModel.getArticleMedia(displayMedias);
        photographMedias.appendChild(articleByMedia);
        // au click affiche le bon média dans le slide
        articleByMedia.addEventListener('click', (e) => {
          const id = e.target.id;
          for (let i = 0; itemsInSlider.length > i; i++) {
            let idMedia = itemsInSlider[i].id;
            itemsInSlider[i].classList.remove('activ');
            if (idMedia == id) {
              itemsInSlider[i].classList.add('activ');
              // count prend l'indice de l'image en cours, du coup si je clique sur l'image en position 3 du tableau, count démarrera au même indice du tableau
              count = i;
            }
          }
        });

        // Ajout titre + likes photo
        const likesAndTitleMedia =
          photographerPageModel.getLikesAndTitleMediaDOM(media);
        articleByMedia.appendChild(likesAndTitleMedia);
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
  const itemsInSlider = document.querySelectorAll('.itemsInSlider');
  itemsInSlider[count].classList.remove('activ');
  if (count < itemsInSlider.length - 1) {
    count++;
  } else {
    count = 0;
  }
  itemsInSlider[count].classList.add('activ');
};
// slide précédente
/* 
  Retire la class activ de l'elem affiché  dans le slide avant de décrémenter count,
  puis ajoute la classe activ sur le nouvel elem.
  Si count est sup a 0, on décrémente --, sinon count = au dernier élément du tableau, pour qu'on puisse passer du premier elem au dernier elem.
 */
const backItem = () => {
  const itemsInSlider = document.querySelectorAll('.itemsInSlider');
  itemsInSlider[count].classList.remove('activ');
  if (count > 0) {
    count--;
  } else {
    count = itemsInSlider.length - 1;
  }
  itemsInSlider[count].classList.add('activ');
};

next.addEventListener('click', nextItem);
back.addEventListener('click', backItem);
// =====================================================================

photographerPage();

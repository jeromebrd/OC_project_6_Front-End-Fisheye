//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
  let photographers;
  let medias;
  try {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    photographers = await data.photographers;
    medias = await data.media;
    console.log(data);
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
const photographerPage = async () => {
  const { photographers, medias } = await getPhotographers();

  // récupération de l'id du photographe via l'url
  const params = new URL(document.location).searchParams;
  const idLink = parseInt(params.get('id'));
  const photographHeader = document.querySelector('.photograph-header');
  const photographMedias = document.querySelector('.photograph-medias');

  // itérer sur le tableau photographers, pour obtenir chaque id
  for (let i = 0; i < photographers.length; i++) {
    if (idLink === photographers[i].id) {
      // passer le photographe correspondant à l'id dans l'url, a la fonction createContact pour afficher la page du photographe en question.
      const mediasByUser = [];
      medias.forEach((media) => {
        if (media.photographerId === photographers[i].id) {
          mediasByUser.push(media);
        }
      });
      const photographerPageModel = createPhotographerPageTemplate(
        photographers[i]
      );

      // Pour la bannière de profil du photographe
      const profileInfoDOM = photographerPageModel.getProfileInfoDOM();
      const profilePictureDOM = photographerPageModel.getProfilPictureDOM();
      photographHeader.prepend(profileInfoDOM);
      photographHeader.append(profilePictureDOM);

      // Pour afficher la petite barre de tarif en bas
      const infoFixedAtTheBottom =
        photographerPageModel.getInfoAtTheBottomDOM();
      photographMedias.appendChild(infoFixedAtTheBottom);

      // Pour la partie medias, passer en argumant chaque media a la factory getMedias
      mediasByUser.forEach((media) => {
        // créer un article pour chaque media, avec un lien a l'interieur de l'article
        const article = document.createElement('article');
        const a = document.createElement('a');
        const div = document.createElement('div');
        const pTitle = document.createElement('p');
        const pLikes = document.createElement('p');
        const displayMedias = photographerPageModel.getMediasDOM(media);
        const i = document.createElement('i');

        photographMedias.appendChild(article);
        article.appendChild(a);
        a.appendChild(displayMedias);

        // Ajout titre + likes photo
        article.appendChild(div).setAttribute('class', 'desc-media');
        div.appendChild(pTitle);
        pTitle.textContent = media.title;
        div.appendChild(pLikes);
        pLikes.textContent = `${media.likes}`;
        pLikes.appendChild(i).setAttribute('class', 'fa-solid fa-heart');
      });
    }
  }
};
// =====================================================================
// Création de la page photographe dans le dom selon le photographe
const createPhotographerPageTemplate = (photographer) => {
  const { name, id, city, country, price, tagline, portrait } = photographer;
  const picture = `assets/photographers/${portrait}`;

  const getProfileInfoDOM = () => {
    const div = document.createElement('div');
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    const span = document.createElement('span');
    // nom du photographe
    h1.textContent = `${name}`;
    // ville + pays
    p.textContent = `${city}, ${country}`;
    // desc
    span.textContent = tagline;
    // création des éléments dans le DOM
    div.appendChild(h1);
    div.appendChild(p);
    div.appendChild(span);
    return div;
  };

  const getProfilPictureDOM = () => {
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', `photo de profil de ${name}`);
    return img;
  };
  const getInfoAtTheBottomDOM = () => {
    const div = document.createElement('div');
    const p = document.createElement('p');
    div.setAttribute('class', 'price-bottom');
    div.appendChild(p).textContent = `${price}€/jour`;
    return div;
  };

  const getMediasDOM = (media) => {
    const { image, video, photographerId, title } = media;
    const linkImg = `assets/medias/${photographerId}/${image}`;
    const linkVideo = `assets/medias/${photographerId}/${video}`;
    const imgMedia = document.createElement('img');
    const videoMedia = document.createElement('video');
    const source = document.createElement('source');

    // console.log(media);
    if (image) {
      imgMedia.setAttribute('src', linkImg);
      imgMedia.setAttribute('alt', `${title}`);
      return imgMedia;
    }
    if (video) {
      videoMedia.appendChild(source).setAttribute('src', linkVideo);
      videoMedia.setAttribute('controls', '');
      return videoMedia;
    }
  };

  return {
    getProfileInfoDOM,
    getProfilPictureDOM,
    getMediasDOM,
    getInfoAtTheBottomDOM,
  };
};

photographerPage();

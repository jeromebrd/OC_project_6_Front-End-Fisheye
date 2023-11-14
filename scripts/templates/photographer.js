function photographerTemplate(data) {
  const { name, portrait, id, city, country, tagline, price } = data;
  const picture = `assets/photographers/${portrait}`;

  // page d'accueil
  function getUserCardDOM() {
    // article = pour chaque photographe
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', `photo de profil de ${name}`);
    //lien avec id dans l'url
    const a = document.createElement('a');
    a.setAttribute('href', `photographer.html?id=${id}`);
    a.setAttribute('aria-label', `Aller sur le profil de ${name} `);
    a.classList.add('photograph-link');
    // nom
    const h2 = document.createElement('h2');
    h2.textContent = name;
    const div = document.createElement('div');
    // ville + pays
    const h3 = document.createElement('h3');
    h3.textContent = `${city}, ${country}`;
    // tagline
    const taglineElem = document.createElement('p');
    taglineElem.textContent = tagline;
    // price
    const priceElem = document.createElement('span');
    priceElem.textContent = `${price}€/jour`;
    // creation des éléments dans le DOM
    article.appendChild(a);
    a.appendChild(img);
    a.appendChild(h2);
    article.appendChild(div);
    div.appendChild(h3);
    div.appendChild(taglineElem);
    div.appendChild(priceElem);

    return article;
  }
  // profil des photographes sur leur page
  const getProfileInfoDOM = () => {
    const div = document.createElement('div');
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    const span = document.createElement('span');
    const title = document.querySelector('title');
    title.textContent = `Fisheye - ${name}`;
    // nom du photographe
    h1.textContent = `${name}`;
    h1.setAttribute('id', `${name}`);
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

  // creation de la photo de profil
  const getProfilPictureDOM = () => {
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', `photo de profil de ${name}`);
    return img;
  };
  // petite vignette avec le nombre de likes total + tarifs en bas de page
  const getInfoAtTheBottomDOM = (arr) => {
    // methode pour additionner toutes les valeurs du tableau
    const nbLikes = arr.reduce((acc, currentValue) => acc + currentValue);
    const div = document.createElement('div');
    const p = document.createElement('p');
    const p2 = document.createElement('p');
    const i = document.createElement('i');
    div.setAttribute('class', 'price-bottom');
    div.appendChild(p).textContent = `${nbLikes}`;
    p.appendChild(i).setAttribute('class', 'fa-solid fa-heart');
    i.style.paddingLeft = '10px';
    div.appendChild(p2).textContent = `${price}€/jour`;
    return div;
  };
  // obtenir les medias (photos et videos) de chaque photographe
  const getMediasDOM = (media) => {
    const { image, id, video, photographerId, title } = media;
    const linkImg = `assets/medias/${photographerId}/${image}`;
    const linkVideo = `assets/medias/${photographerId}/${video}`;
    const imgMedia = document.createElement('img');
    const videoMedia = document.createElement('video');
    const source = document.createElement('source');

    if (image) {
      imgMedia.setAttribute('src', linkImg);
      imgMedia.setAttribute('alt', `${title}`);
      imgMedia.setAttribute('id', `${id}`);
      imgMedia.setAttribute('data-title', `${title}`);
      return imgMedia;
    }
    if (video) {
      videoMedia.appendChild(source).setAttribute('src', linkVideo);
      videoMedia.setAttribute('controls', '');
      videoMedia.setAttribute('id', `${id}`);
      videoMedia.setAttribute('data-title', `${title}`);
      return videoMedia;
    }
  };
  // creation d'article dans le DOM pour chaque média. Au click ouvre la modal (slider)
  const getArticleMedia = (displayMedias) => {
    const article = document.createElement('article');
    const divMedia = document.createElement('div');
    article.appendChild(divMedia);
    divMedia.appendChild(displayMedias);
    divMedia.setAttribute('onclick', `displayModal('modalLighthouse')`);
    divMedia.setAttribute('class', 'wrap-media');
    return article;
  };
  // affichage du titre + likes de chaque média.
  const getLikesAndTitleMediaDOM = (media) => {
    const div = document.createElement('div');
    const pTitle = document.createElement('p');
    const pLikes = document.createElement('p');
    const i = document.createElement('i');
    div.setAttribute('class', 'desc-media');
    div.appendChild(pTitle);
    pTitle.textContent = media.title;
    div.appendChild(pLikes);
    pLikes.textContent = `${media.likes}`;
    pLikes.appendChild(i).setAttribute('class', 'fa-solid fa-heart');
    i.setAttribute('aria-label', 'likes');
    // ajout de la class liked si la propriété media.liked = true
    if (media.liked) {
      i.classList.add('liked');
    } else {
      i.classList.remove('liked');
    }

    return div;
  };

  return {
    getUserCardDOM,
    getProfileInfoDOM,
    getProfilPictureDOM,
    getMediasDOM,
    getInfoAtTheBottomDOM,
    getLikesAndTitleMediaDOM,
    getArticleMedia,
  };
}
// =====================================================================

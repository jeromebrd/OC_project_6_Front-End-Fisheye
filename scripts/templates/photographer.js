console.log('photographer template');
function photographerTemplate(data) {
  const { name, portrait, id, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

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

  return {
    name,
    picture,
    getUserCardDOM,
  };
}

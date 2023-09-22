console.log('photographer template');
function photographerTemplate(data) {
  const { name, portrait, id, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', `${name}`);
    const a = document.createElement('a');
    //lien a changer (correspond au lien pour la page de chaque photographe)
    a.setAttribute('href', `${name}`);
    a.classList.add('photograph-link');
    const h2 = document.createElement('h2');
    h2.textContent = name;
    article.appendChild(a);
    a.appendChild(img);
    a.appendChild(h2);
    return article;
  }
  return { name, picture, getUserCardDOM, id, city, country, tagline, price };
}

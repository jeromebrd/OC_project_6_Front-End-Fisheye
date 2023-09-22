console.log('index');
async function getPhotographers() {
  let photographers;
  try {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    photographers = await data.photographers;
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  // et bien retourner le tableau photographers seulement une fois récupéré
  return {
    photographers,
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();

// const modal = document.getElementById('contact_modal');
const modals = document.querySelectorAll('.modals');
const modalContact = document.querySelector('#contact_modal');
const modalLighthouse = document.querySelector('#lighthouse_modal');
const main = document.getElementById('main');
const openBtn = document.querySelector('.contact_button');
const closeBtn = document.getElementById('close-modal');
const span = document.createElement('span');

// =============================================================================================
function displayModal(modal) {
  if (modal === 'modalContact') {
    // récupérer le nom du photographe pour l'afficher dans le header du form
    const photographerName = document.querySelector(
      '.photograph-header h1'
    ).textContent;
    const modalTitle = document.querySelector('#contact_modal h2');
    modalTitle.appendChild(span).textContent = photographerName;
    // pour l'affichage de la modale
    modalContact.style.display = 'block';
    modalContact.setAttribute('aria-hidden', 'false');
  } else if (modal === 'modalLighthouse') {
    modalLighthouse.style.display = 'block';
    modalLighthouse.setAttribute('aria-hidden', 'false');
  }
  main.setAttribute('aria-hidden', 'true');
  closeBtn.focus();
}

//=============================================================================================

function closeModal(modal) {
  if (modal === 'modalContact') {
    modalContact.style.display = 'none';
    modalContact.setAttribute('aria-hidden', 'true');
  } else if (modal === 'modalLighthouse') {
    modalLighthouse.style.display = 'none';
    modalLighthouse.setAttribute('aria-hidden', 'true');
  }
  main.setAttribute('aria-hidden', 'false');
}

// =============================================================================================

// Récupère les datas submit du formulaire
const getDataContact = () => {
  const form = document.querySelector('form');
  const firstname = document.querySelector('#firstname');
  const lastname = document.querySelector('#lastname');
  const email = document.querySelector('#email');
  const message = document.querySelector('#message');

  let firstnameValue = '';
  let lastnameValue = '';
  let emailValue = '';
  let messageValue = '';
  let dataSubmit = [];

  firstname.addEventListener('input', (e) => {
    firstnameValue = e.target.value;
  });
  lastname.addEventListener('input', (e) => {
    lastnameValue = e.target.value;
  });
  email.addEventListener('input', (e) => {
    emailValue = e.target.value;
  });
  message.addEventListener('input', (e) => {
    messageValue = e.target.value;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    dataSubmit = [];
    dataSubmit.push({
      firsname: firstnameValue,
      lastname: lastnameValue,
      email: emailValue,
      message: messageValue,
    });
    console.log(dataSubmit);
    closeModal('modalContact');
  });
};
getDataContact();

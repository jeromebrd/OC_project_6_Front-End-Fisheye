const modal = document.getElementById('contact_modal');
const main = document.getElementById('main');
const openBtn = document.querySelector('.contact_button');
const closeBtn = document.getElementById('close-modal');

function displayModal() {
  modal.style.display = 'block';
  main.setAttribute('aria-hidden', 'true');
  modal.setAttribute('aria-hidden', 'false');
  closeBtn.focus();
}

function closeModal() {
  modal.style.display = 'none';
  main.setAttribute('aria-hidden', 'false');
  modal.setAttribute('aria-hidden', 'true');
}

// Pour fermer la modal en appuyant sur "echap"
window.addEventListener('keydown', (e) => {
  const key = e.key;
  if (key === 'Escape') {
    closeModal();
  }
});

const dataContact = () => {
  const form = document.querySelector('form');
  const firstname = document.querySelector('#firstname');
  const lastname = document.querySelector('#lastname');
  const email = document.querySelector('#email');
  const message = document.querySelector('#message');

  let dataSubmit = [];
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
    closeModal();
  });
  let firstnameValue = '';
  let lastnameValue = '';
  let emailValue = '';
  let messageValue = '';
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
};
dataContact();

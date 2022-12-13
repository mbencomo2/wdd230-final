//Hamburger Button
document.getElementById('navBtn').addEventListener('click', () => {
  document.getElementById('primaryNav').classList.toggle('open');
  document.getElementById('navBtn').classList.toggle('open');
})

//Set the Last Modified Date
document.getElementById('lastModified').innerText = document.lastModified;

//Set the Copyright year
const date = new Date();
document.getElementById('copyright').textContent = date.getFullYear();
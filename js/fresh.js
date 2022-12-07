async function getfruit() {
  const response = await fetch(fruitURL);
  if (response.ok) {
    const fruits = await response.json();
    output(fruits);
  }
};

async function getNutrition(options) {
  const response = await fetch(fruitURL);
  if (response.ok) {
    const fruits = await response.json();
    displayOrder(fruits);
  }
}

function output(fruits) {
  let num = 0;
  while (num < 3) {
    const label = document.createElement('label');
    const select = document.createElement('select');
    const name = `fruit${num + 1}`

    select.name = name;
    select.id = name;
    label.textContent = `Fruit ${num + 1}: `
    select.innerHTML = '<option value="Select a Fruit">Select a Fruit</option>'
    for (let index = 0; index < fruits.length; index++) {
      const fruit = fruits[index];
      const option = document.createElement('option');
      option.value = fruit.name;
      option.textContent = fruit.name;
      select.appendChild(option);
    }
    label.appendChild(select);
    document.getElementById('fruitOptions').appendChild(label)
    num += 1;
  }
}

function displayOrder(fruits) {
  document.getElementById('orderDetails').innerHTML = "";
  const section = document.createElement('section');
  const order = document.createElement('div');
  const contact = document.createElement('dl');
  const chosenFruit = document.createElement('dl');
  const nutrition = document.createElement('dl');
  const instructions = document.createElement('dl');
  const thanks = document.createElement('p');

  let carbs = 0;
  let protein = 0;
  let fat = 0;
  let cal = 0;
  let sugar = 0;

  section.innerHTML = '<h2>Order Details</h2>';
  order.id = 'order';
  contact.innerHTML = `<dt><h3>Contact</h3></dt><dd><b>Email:</b> ${document.getElementById('email').value}</dd><dd><b>Name:</b> ${document.getElementById('firstName').value} ${document.getElementById('lastName').value}</dd>`
  chosenFruit.innerHTML = `<dt><h3>Fruit Choices</h3></dt><dd><b>Fruit 1:</b> ${document.getElementById('fruit1').value}</dd><dd><b>Fruit 2:</b> ${document.getElementById('fruit2').value}</dd><dd><b>Fruit 3:</b> ${document.getElementById('fruit3').value}</dd>`
  for (let index = 0; index < 3; index++) {
    const option = document.getElementById(`fruit${index + 1}`);
    for (let fruitI = 0; fruitI < fruits.length; fruitI++) {
      const fruit = fruits[fruitI];
      if (fruit.name == option.value) {
        carbs += fruit.nutritions.carbohydrates;
        protein += fruit.nutritions.protein;
        fat += fruit.nutritions.fat;
        cal += fruit.nutritions.calories;
        sugar += fruit.nutritions.sugar;
      }
    };
  };
  nutrition.innerHTML = `<dt><h3>Nutrition</h3></dt><dd><b>Carbohydrates</b>: ${carbs.toFixed(2)}</dd><dd><b>Protein</b>: ${protein.toFixed(2)}</dd><dd><b>Fat</b>: ${fat.toFixed(2)}</dd><dd><b>Calories</b>: ${cal.toFixed(2)}</dd><dd><b>Sugar</b>: ${sugar.toFixed(2)}</dd>`
  instructions.innerHTML = `<dt><h3>Instructions</h3></dt><dd>${document.getElementById('addInstruct').value}</dd>`
  thanks.innerHTML = 'Thank you for sharing your creativity with us! We will be contacting you via the email provided shortly (1-2 business days) with more details for payment and delivery.'
  thanks.id = 'thankYou'

  order.appendChild(contact);
  order.appendChild(chosenFruit);
  order.appendChild(nutrition);
  order.appendChild(instructions);
  order.appendChild(thanks);
  section.appendChild(order);
  document.getElementById('orderDetails').appendChild(section);
}

//Hamburger Button Listener
document.getElementById('navBtn').addEventListener('click', () => {
  document.getElementById('primaryNav').classList.toggle('open');
  document.getElementById('navBtn').classList.toggle('open');
});

//Show Current year in copyright
const date = new Date();
const fruitURL = "https://brotherblazzard.github.io/canvas-content/fruit.json";
document.getElementById('copyright').textContent = date.getFullYear();
getfruit();

//Display help text when the form will not validate
const form = document.querySelector('form');
form.addEventListener("change", () => {
  if (form.checkValidity()) {
    document.getElementById('invalidForm').style = 'display:none;';
    document.getElementById('submitBtn').disabled = !form.checkValidity();
  }
  else if (!form.checkValidity()) {
    document.getElementById('invalidForm').style = 'display:block;';
    document.getElementById('submitBtn').disabled = form.checkValidity();
  }
});

//Event Listener for Submit Button
document.getElementById('submitBtn').addEventListener('click', () => {
  if (form.checkValidity()) {
    getNutrition();
  }
});
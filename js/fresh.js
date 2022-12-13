async function getfruit() {
  //Fetch the data and await the response
  const response = await fetch(fruitURL);
  if (response.ok) {
    //Store the response as a json object
    const fruits = await response.json();
    output(fruits);
  }
};

async function getNutrition(options) {
  //Fetch the data and await the response
  const response = await fetch(fruitURL);
  if (response.ok) {
    //Store the response as a json object
    const fruits = await response.json();
    displayOrder(fruits);
  }
}

function output(fruits) {
  for (let i = 0; i < 3; i++) {
    //Create the elements we need
    const label = document.createElement('label');
    const select = document.createElement('select');
    const name = `fruit${i + 1}`
    //Set the name and id for the select element
    select.name = name;
    select.id = name;
    //Set the label text and select options
    label.textContent = `Fruit ${i + 1}: `
    select.required = true;
    select.innerHTML = '<option value="">Select a Fruit</option>'
    for (let index = 0; index < fruits.length; index++) {
      const fruit = fruits[index];
      //Create the option element
      const option = document.createElement('option');
      //Set the value and text content
      option.value = fruit.name;
      option.textContent = fruit.name;
      //append it to the current select element
      select.appendChild(option);
    }
    //append the label and select input to the fieldset
    label.appendChild(select);
    document.getElementById('fruitOptions').appendChild(label)
  }
}

function displayOrder(fruits) {
  //Resets the order  to avoid duplicates
  document.getElementById('orderDetails').innerHTML = "";
  //Create the elements we need
  const section = document.createElement('section');
  const order = document.createElement('div');
  const date = document.createElement('dl')
  const contact = document.createElement('dl');
  const chosenFruit = document.createElement('dl');
  const nutrition = document.createElement('dl');
  const instructions = document.createElement('dl');
  const thanks = document.createElement('p');
  //init variables for nutrition info
  let carbs = 0;
  let protein = 0;
  let fat = 0;
  let cal = 0;
  let sugar = 0;
  //Create the header and set the id for styling
  section.innerHTML = '<h2>Order Details</h2>';
  order.id = 'order';
  date.innerHTML = `<dt><b>Date</b></dt><dd>${new Date()}</dd>`
  //Fill in Contact info from the form
  contact.innerHTML = `<dt><h3>Contact</h3></dt><dd><b>Email:</b> ${document.getElementById('email').value}</dd><dd><b>Name:</b> ${document.getElementById('firstName').value} ${document.getElementById('lastName').value}</dd>`
  //Fill in the fruits selected in the form
  chosenFruit.innerHTML = `<dt><h3>Fruit Choices</h3></dt><dd><b>Fruit 1:</b> ${document.getElementById('fruit1').value}</dd><dd><b>Fruit 2:</b> ${document.getElementById('fruit2').value}</dd><dd><b>Fruit 3:</b> ${document.getElementById('fruit3').value}</dd>`
  //For each fruit chosen, find it in our fetched data and update the nutrition info
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
  //Fill in the nutrition info obtained
  nutrition.innerHTML = `<dt><h3>Nutrition</h3></dt><dd><b>Carbohydrates</b>: ${carbs.toFixed(2)}</dd><dd><b>Protein</b>: ${protein.toFixed(2)}</dd><dd><b>Fat</b>: ${fat.toFixed(2)}</dd><dd><b>Calories</b>: ${cal.toFixed(2)}</dd><dd><b>Sugar</b>: ${sugar.toFixed(2)}</dd>`
  instructions.innerHTML = `<dt><h3>Instructions</h3></dt><dd>${document.getElementById('addInstruct').value}</dd>`
  //Create a message for the user
  thanks.innerHTML = 'Thank you for sharing your creativity with us! We will be contacting you via the email provided shortly (1-2 business days) with more details for payment and delivery.'
  thanks.id = 'thankYou'
  //Append all the elements we created to the live document
  order.appendChild(date)
  order.appendChild(contact);
  order.appendChild(chosenFruit);
  order.appendChild(nutrition);
  order.appendChild(instructions);
  order.appendChild(thanks);
  section.appendChild(order);
  document.getElementById('orderDetails').appendChild(section);
  //Update the number of orders the customer has made in localStorage
  storeOrder();
}

function storeOrder() {
  const storage = localStorage;
  if ('numOrders' in storage) {
    const orders = storage.getItem('numOrders')
    storage.setItem('numOrders', orders * 1 + 1)
  }
  else {
    storage.setItem('numOrders', '1')
  }
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

//Set the Last Modified Date
document.getElementById('lastModified').innerText = document.lastModified;

//Event Listener for Submit Button
document.getElementById('submitBtn').addEventListener('click', () => {
  if (form.checkValidity()) {
    document.getElementById('invalidForm').style = 'display:none;';
    document.getElementById('submitBtn').disabled = !form.checkValidity();
    getNutrition();
  }
  else if (!form.checkValidity()) {
    document.getElementById('invalidForm').style = 'display:block;';
    document.getElementById('submitBtn').disabled = form.checkValidity();
  }
});
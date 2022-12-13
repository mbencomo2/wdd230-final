import { lazyLoader } from "./lazyload.js";
async function getWeather() {
  //Fetch the data and await the response
  const response = await fetch(weatherURL);
  if (response.ok) {
    //Store the response as a json object
    const data = await response.json();
    outputWeather(data);
  }
};

async function getForecast() {
  //Fetch the data and await the response
  const response = await fetch(forecastURL);
  if (response.ok) {
    //Store the response as a json object
    const data = await response.json();
    outputForecast(data);
  }
}

function outputWeather(data) {
  //Format the weather description to capitalize the words
  const words = data.weather[0].description.split(" ");
  const description = words.map((word) => { return word[0].toUpperCase() + word.substring(1) }).join(" ");

  //Fill in elements with the data fetched
  document.getElementById('temperature').textContent = data.main.temp.toFixed(0);
  document.getElementById('description').textContent = description;
  document.getElementById('humidity').textContent = data.main.humidity;
  document.getElementById('weatherSprite').style = `background: var(--Gold-Crayola) url(http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png) center no-repeat`;
}

function outputForecast(data) {
  //Index to keep track of what list entry
  let index = 0;
  //Get today's date
  let day = date.getUTCDate();

  //For each hour in the forecast data
  data.list.forEach((forecast) => {
    //If index % 8 == 0 it is the next day since forecast lists data in 3 hour snapshots
    if (index % 8 == 0) {
      //Create the elements we need
      const div = document.createElement('div');
      const heading = document.createElement('h4');
      const icon = document.createElement('img');
      const temp = document.createElement('p');
      //Format the weather description to capitalize the words
      const words = forecast.weather[0].description.split(" ");
      const description = words.map((word) => { return word[0].toUpperCase() + word.substring(1) }).join(" ");

      //Fill in the data and set the needed attributes
      heading.innerHTML = `${getMonth(date.getMonth())} ${day}`;
      temp.innerHTML = `${forecast.main.temp.toFixed(0)}&deg;F`;
      icon.setAttribute('src', 'https://via.placeholder.com/50')
      icon.setAttribute('data-src', `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`);
      icon.setAttribute('alt', description);
      icon.setAttribute('loading', 'lazy');

      //Append the elements we created to the HTML Document
      div.appendChild(heading);
      div.appendChild(icon);
      div.appendChild(temp);
      document.getElementById('forecasts').appendChild(div);

      //Increment for the next day
      day += 1;
    }
    //Update the index to keep track of where we are in the list
    index += 1;
  });

  //Lazy load images now that all the images are present
  lazyLoader.loadImgs();
};

function getMonth(number) {
  //Return the name of the month
  switch (number) {
    case 1:
      return 'January';
    case 2:
      return 'February';
    case 3:
      return 'March';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    case 12:
      return 'December';
  }
}

function getOrders() {
  //Find numOrders in storage and retrieve its value, otherwise we return a string
  if ('numOrders' in localStorage) {
    return `${localStorage.getItem('numOrders')} Drink(s)`
  }
  else {
    return 'No orders yet!'
  }
}

//Hamburger Button
document.getElementById('navBtn').addEventListener('click', () => {
  document.getElementById('primaryNav').classList.toggle('open');
  document.getElementById('navBtn').classList.toggle('open');
});

//Set the number of drinks ordered from local storage
document.getElementById('drinks').innerText = getOrders();

//Set the Copyright year
const date = new Date();
document.getElementById('copyright').textContent = date.getFullYear();

//Set the Last Modified Date
document.getElementById('lastModified').innerText = document.lastModified;

//Set all the data we need to load weather data
const key = '39bef332b3242a9fe5c82f1b824a81f9';
const lat = 33.16;
const lon = -117.33;
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
//Load Weather Data
getWeather();
getForecast();
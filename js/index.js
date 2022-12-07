//Hamburger Button
document.getElementById('navBtn').addEventListener('click', () => {
  document.getElementById('primaryNav').classList.toggle('open');
  document.getElementById('navBtn').classList.toggle('open');
})
//Load Weather Data
const date = new Date();
const key = '39bef332b3242a9fe5c82f1b824a81f9';
const lat = 33.16;
const lon = -117.33;
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
document.getElementById('copyright').textContent = date.getFullYear();
getWeather();
getForecast();

async function getWeather() {
  const response = await fetch(weatherURL);
  if (response.ok) {
    const data = await response.json();
    outputWeather(data);
  }
};

async function getForecast() {
  const response = await fetch(forecastURL);
  if (response.ok) {
    const data = await response.json();
    outputForecast(data);
  }
}

function outputWeather(data) {
  console.log(data);
  const words = data.weather[0].description.split(" ");
  const description = words.map((word) => { return word[0].toUpperCase() + word.substring(1) }).join(" ");

  document.getElementById('temperature').textContent = data.main.temp.toFixed(0);
  document.getElementById('description').textContent = description;
  document.getElementById('humidity').textContent = data.main.humidity;
  document.getElementById('weatherSprite').style = `background: var(--Gold-Crayola) url(http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png) center no-repeat`;
}

function outputForecast(data) {
  console.log(data);
  let index = 0;
  let day = date.getUTCDate();
  data.list.forEach((forecast) => {
    if (index % 8 == 0) {
      const div = document.createElement('div');
      const heading = document.createElement('h4');
      const icon = document.createElement('img');
      const temp = document.createElement('p');
      const words = forecast.weather[0].description.split(" ");
      const description = words.map((word) => { return word[0].toUpperCase() + word.substring(1) }).join(" ");

      heading.innerHTML = `${getMonth(date.getMonth())} ${day}`;
      temp.innerHTML = `${forecast.main.temp.toFixed(0)}&deg;F`;
      icon.setAttribute('src', `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`);
      icon.setAttribute('alt', description);
      icon.setAttribute('loading', 'lazy');
      div.appendChild(heading);
      div.appendChild(icon);
      div.appendChild(temp);
      document.getElementById('forecasts').appendChild(div);
      day += 1;
    }
    index += 1;
  });
};

function getMonth(number) {
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
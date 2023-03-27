"use strict";

// Event listeners
var form = document.querySelector('.top-banner form');
var input = document.querySelector('.top-banner input');
var msg = document.querySelector('.top-banner .msg');
var list = document.querySelector('.ajax-section .cities');
var defaultCities = ['jordan', 'Irbid', 'Ajloun', 'Jarash', 'Mafraq', 'Madaba', 'Zarqa', 'Amman', 'Salt', 'Karak', 'Aqaba'];

// Function to check if city is already in the list
function isCityInList(cityName) {
  var listItemsArray = Array.from(document.querySelectorAll('.city'));
  var filteredArray = listItemsArray.filter(function (el) {
    var content = el.querySelector('.city-name span').textContent.toLowerCase();
    return content === cityName.toLowerCase();
  });
  return filteredArray.length > 0;
}

// Function to fetch weather data and add to the list
function addCityToList(cityName, msg) {
  var apiKey = 'f371df7782ef6053effdc1ebc0565ec8';
  var url = "https://api.openweathermap.org/data/2.5/weather?q=".concat(cityName, "&appid=").concat(apiKey, "&units=metric");
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    var main = data.main,
      name = data.name,
      sys = data.sys,
      weather = data.weather;
    var icon = "assets/icons/".concat(weather[0]['icon'], ".png");
    var li = document.createElement('li');
    li.classList.add('city');
    var markup = "\n        <h2 class=\"city-name\" data-name=\"".concat(name, ",").concat(sys.country, "\">\n          <span>").concat(name, "</span>\n          <sup>").concat(sys.country, "</sup>\n        </h2>\n        <div class=\"city-temp\">").concat(Math.round(main.temp), "<sup>\xB0C</sup></div>\n        <figure>\n          <img class=\"city-icon\" src=\"").concat(icon, "\" alt=\"").concat(weather[0]['description'], "\">\n          <figcaption>").concat(weather[0]['description'], "</figcaption>\n        </figure>\n      ");
    li.innerHTML = markup;
    list.appendChild(li);
  }).catch(function () {
    msg.textContent = 'Please search for a valid city';
  });
}

// Function to handle form submission
function handleFormSubmit(e, inputElement, msg) {
  e.preventDefault();
  var cityName = inputElement.value;
  if (isCityInList(cityName)) {
    msg.textContent = "".concat(cityName, " is already in the list");
  } else {
    addCityToList(cityName, msg);
    msg.textContent = '';
    inputElement.value = '';
    inputElement.focus();
  }
}

// Function to add default cities to the list
function addDefaultCities(cityNames, msg) {
  cityNames.forEach(function (cityName) {
    addCityToList(cityName, msg);
  });
}

// Function to reset the form and remove all cities from the list
form.addEventListener('submit', function (e) {
  return handleFormSubmit(e, input, msg);
});
document.getElementById("reset").addEventListener("click", function () {
  list.innerHTML = ""; // removes all the li elements inside the ul element
});

window.onload = function () {
  addDefaultCities(defaultCities, msg);
};
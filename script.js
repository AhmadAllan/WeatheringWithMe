
// Event listeners
const form = document.querySelector('.top-banner form');
const input = document.querySelector('.top-banner input');
const msg = document.querySelector('.top-banner .msg');
const list = document.querySelector('.ajax-section .cities');

const defaultCities = ['jordan', 'Irbid', 'Ajloun', 'Jarash', 'Mafraq', 'Madaba', 'Zarqa', 'Amman', 'Salt', 'Karak', 'Aqaba'];


// Function to check if city is already in the list
function isCityInList(cityName) {
  const listItemsArray = Array.from(document.querySelectorAll('.city'));
  const filteredArray = listItemsArray.filter((el) => {
    const content = el.querySelector('.city-name span').textContent.toLowerCase();
    return content === cityName.toLowerCase();
  });
  return filteredArray.length > 0;
}

// Function to fetch weather data and add to the list
function addCityToList(cityName, msg) {
  const apiKey = 'f371df7782ef6053effdc1ebc0565ec8';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { main, name, sys, weather } = data;
      const icon = `assets/icons/${weather[0]['icon']}.png`;
      const li = document.createElement('li');
      li.classList.add('city');
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${weather[0]['description']}">
          <figcaption>${weather[0]['description']}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = 'Please search for a valid city';
    });
}

// Function to handle form submission
function handleFormSubmit(e, inputElement, msg) {
  e.preventDefault();
  const cityName = inputElement.value;
  if (isCityInList(cityName)) {
    msg.textContent = `${cityName} is already in the list`;
  } else {
    addCityToList(cityName, msg);
    msg.textContent = '';
    inputElement.value = '';
    inputElement.focus();
  }
}

// Function to add default cities to the list
function addDefaultCities(cityNames, msg) {
  cityNames.forEach((cityName) => {
    addCityToList(cityName, msg);
  });
}

// Function to reset the form and remove all cities from the list
form.addEventListener('submit', (e) => handleFormSubmit(e, input, msg));
document.getElementById("reset").addEventListener("click", () => {
  list.innerHTML = ""; // removes all the li elements inside the ul element
});


window.onload = () => {
  addDefaultCities(defaultCities, msg);
}
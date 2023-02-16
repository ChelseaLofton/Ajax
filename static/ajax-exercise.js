'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  fetch('/fortune')
    .then((response) => response.text())
    .then((responseFortune) => {
      document.querySelector('#fortune-text').innerHTML = responseFortune;
    });
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const zipcode = document.querySelector('#zipcode-field').value;
  const url = `/weather.json?zipcode=${zipcode}`;

  fetch(url)
    .then((response) => response.json())
    .then((weather) => {
      //console.log(weather);
      const forecast = weather.forecast;

      document.querySelector('#weather-info').innerHTML = forecast;
    });
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  const url = '/order-melons.json';
  
  const melonForm = {
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value,

  };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(melonForm),
    headers: {
      'Content-Type': 'application/json',
    },
  })

    .then((response) => response.json())
    .then((responseJson) => {
      const code = responseJson.code;
      const message = responseJson.msg;

      if (code === 'ERROR') {
        document.querySelector('#order-status').classList.add('order-error')
        document.querySelector('#order-status').innerHTML = message;
      } else {
        document.querySelector('#order-status').innerHTML = message;
      }

    })

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);

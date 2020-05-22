const mapBoxApiKey = `pk.eyJ1Ijoia2x1b25nODgiLCJhIjoiY2thNWlsejBzMDBpaTNkcWYwZ3VmbjF0ZCJ9.Dt-l5W_looV6UXMeDr905w`;
const destinationContainer = document.querySelector(`.destination-container`);
const originContainer = document.querySelector(`.origin-container`);
const destinationsList = document.querySelector(`.destinations`);
const boundBox = `-97.325875,49.766204,-96.953987,49.99275`;
const originsList = document.querySelector(`.origins`);
const inputs = document.querySelectorAll(`input`);
const forms = document.querySelectorAll(`form`);
const listEle = document.querySelectorAll(`li`);
const transitApiKey = `BbxBNg96RH903JTtJFdZ`;
const body = document.querySelector(`body`);
const planTripBtn = document.querySelector(`button`);

for (const form of forms) {
  form.onsubmit = event => {
    if (event.target.className === `origin-form`) {
      getSearchResults(inputs[0].value, `originsList`);
      originsList.innerHTML = ``;
      inputs[0].value = ``;
    } else {
      getSearchResults(inputs[1].value, `destinationsList`);
      destinationsList.innerHTML = ``;
      inputs[1].value = ``;
    }
    event.preventDefault();
  };
};

body.onclick = event => {
  const originsEle = originsList.querySelectorAll(`li`);
  const destinationEle = destinationsList.querySelectorAll(`li`);


  if (event.target.closest(`LI`) && event.target.closest(`UL`).className === `origins`) {
    originsEle.forEach(element => element.className = ` `);
    event.target.closest(`LI`).classList.add(`selected`);
    originLat = event.target.closest(`LI`).dataset.lat;
    originLong = event.target.closest(`LI`).dataset.long;

  } else if (event.target.closest(`LI`) && event.target.closest(`UL`).className === `destinations`) {
    destinationEle.forEach(element => element.className = ` `);
    event.target.closest(`LI`).classList.add(`selected`);
    destinationLat = event.target.closest(`LI`).dataset.lat;
    destinationLong = event.target.closest(`LI`).dataset.long;
  }
};

planTripBtn.onclick = event => {
  const selected = document.querySelectorAll(`li.selected`);
  if (selected.length === 2) {

    fetch(`https://api.winnipegtransit.com/v3/trip-planner.json?origin=geo/${selected[0].dataset.lat},${selected[0].dataset.long}&api-key=ZPFv2Zx6ny1KrlPKnfe&destination=geo/${selected[1].dataset.lat},${selected[1].dataset.long}`)
      .then(resp => resp.json())
      .then(directions => {

        console.log(directions);
      })
  } else {
    console.log(`Please select an origin and destination`);
  }
}





function getSearchResults(searchValue, list) {
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?access_token=${mapBoxApiKey}&limit=10&bbox=${boundBox}`)
    .then(resp => resp.json())
    .then(results => {
      results.features.forEach(result => {
        displayResults(result, list);

      })
    })

};

function displayResults(searchResults, list) {

  if (list === `originsList`) {
    originsList.insertAdjacentHTML(`beforeend`, `
  <li data-long="${searchResults.geometry.coordinates[0]}" data-lat="${searchResults.geometry.coordinates[1]}" class="">
  <div class="name">${searchResults.text}</div>
  <div>${searchResults.properties.address}</div>
</li>  
  `)
  } else {
    destinationsList.insertAdjacentHTML(`beforeend`, `
    <li data-long="${searchResults.geometry.coordinates[0]}" data-lat="${searchResults.geometry.coordinates[1]}" class="">
    <div class="name">${searchResults.text}</div>
    <div>${searchResults.properties.address}</div>
  </li>  
    `)
  }
}
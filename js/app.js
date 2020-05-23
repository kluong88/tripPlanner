const destinationsList = document.querySelector(`.destinations`);
const originsList = document.querySelector(`.origins`);
const inputs = document.querySelectorAll(`input`);
const forms = document.querySelectorAll(`form`);
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

function getSearchResults(searchValue, list) {
  const mapBoxApiKey = `pk.eyJ1Ijoia2x1b25nODgiLCJhIjoiY2thNWlsejBzMDBpaTNkcWYwZ3VmbjF0ZCJ9.Dt-l5W_looV6UXMeDr905w`;
  const boundBox = `-97.325875,49.766204,-96.953987,49.99275`;

  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?access_token=${mapBoxApiKey}&limit=10&bbox=${boundBox}`)
    .then(resp => resp.json())
    .then(results => {
      results.features.forEach(result => {
        displayResults(result, list);
      });
    });
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
  };
};

body.onclick = event => {
  const originsEle = originsList.querySelectorAll(`li`);
  const destinationEle = destinationsList.querySelectorAll(`li`);

  if (event.target.closest(`LI`) && event.target.closest(`UL`).className === `origins`) {
    originsEle.forEach(element => element.className = ` `);
    event.target.closest(`LI`).classList.add(`selected`);
  } else if (event.target.closest(`LI`) && event.target.closest(`UL`).className === `destinations`) {
    destinationEle.forEach(element => element.className = ` `);
    event.target.closest(`LI`).classList.add(`selected`);
  };
};

planTripBtn.onclick = event => {
  const selected = document.querySelectorAll(`li.selected`);
  const transitApiKey = `BbxBNg96RH903JTtJFdZ`;

  if (selected.length === 2) {
    fetch(`https://api.winnipegtransit.com/v3/trip-planner.json?origin=geo/${selected[0].dataset.lat},${selected[0].dataset.long}&api-key=${transitApiKey}&destination=geo/${selected[1].dataset.lat},${selected[1].dataset.long}`)
      .then(resp => resp.json())
      .then(directions => {
        getDirections(directions);
        console.log(directions);
      })
  } else {
    alert(`Please select an origin and destination and try again!`);
  };
};

function getDirections(directions) {
  const myTrip = document.querySelector(`.my-trip`);

  directions.plans[0].segments.forEach(plan => {
    if (plan.type === `walk` && plan.to.stop != undefined) {
      myTrip.insertAdjacentHTML(`beforeend`, `
      <li><i class="fas fa-walking" aria-hidden="true"></i>Walk for ${plan.times.durations.walking} minutes to stop #${plan.to.stop.key} - ${plan.to.stop.name}</li>
      `)
    } else if (plan.type === `walk` && plan.to.stop === undefined) {
      myTrip.insertAdjacentHTML(`beforeend`, `
      <li><i class="fas fa-walking" aria-hidden="true"></i>Walk for ${plan.times.durations.walking} minutes to your destination.</li>
      `)
    } else if (plan.type === `transfer`) {
      myTrip.insertAdjacentHTML(`beforeend`, `
      <li><i class="fas fa-ticket-alt" aria-hidden="true"></i>Transfer from stop #${plan.from.stop.key} - ${plan.from.stop.name} to stop #${plan.to.stop.key} - ${plan.to.stop.name}.</li>`)
    } else if (plan.type === `ride`) {
      myTrip.insertAdjacentHTML(`beforened`, `
      <li><i class="fas fa-bus" aria-hidden="true"></i>Ride the ${plan.route.name} for ${plan.times.durations.riding} minutes.</li>`)
    }
  });
};
const mapBoxApiKey = `pk.eyJ1Ijoia2x1b25nODgiLCJhIjoiY2thNWlsejBzMDBpaTNkcWYwZ3VmbjF0ZCJ9.Dt-l5W_looV6UXMeDr905w`;
const originContainer = document.querySelector(`.origin-container`);
const destinationContainer = document.querySelector(`.destination-container`);
const destinationsList = document.querySelector(`.destinations`);
const boundBox = `-97.325875,49.766204,-96.953987,49.99275`;
const originsList = document.querySelector(`.origins`);
const inputs = document.querySelectorAll(`input`);
const forms = document.querySelectorAll(`form`);
const listEle = document.querySelectorAll(`li`);
const transitApiKey = `BbxBNg96RH903JTtJFdZ`;

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


originContainer.onclick = event => {
  const originsEle = originsList.querySelectorAll(`li`);
  if (event.target.closest(`LI`)) {
    originsEle.forEach(element => element.className = ` `);
    event.target.closest(`LI`).classList.add(`selected`);
    console.log(event.target.closest(`LI`).dataset);
  }
};

destinationContainer.onclick = event => {
  const destinationEle = destinationsList.querySelectorAll(`li`);
  if (event.target.closest(`LI`)) {
    destinationEle.forEach(element => element.className = ` `);
    event.target.closest(`LI`).classList.add(`selected`);
    console.log(event.target.closest(`LI`).dataset);
  }
};




function getSearchResults(searchValue, list) {
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?access_token=${mapBoxApiKey}&limit=10&bbox=${boundBox}`)
    .then(resp => resp.json())
    .then(search => {

      search.features.forEach(result => {
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
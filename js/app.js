const forms = document.querySelectorAll(`form`);
const inputs = document.querySelectorAll(`input`);
const mapBoxApiKey = `pk.eyJ1Ijoia2x1b25nODgiLCJhIjoiY2thNWlsejBzMDBpaTNkcWYwZ3VmbjF0ZCJ9.Dt-l5W_looV6UXMeDr905w`;
const transitApiKey = `BbxBNg96RH903JTtJFdZ`;
const boundBox = `-97.325875,49.766204,-96.953987,49.99275`;
const originsList = document.querySelector(`.origins`);
const destinationsList = document.querySelector(`.destinations`);
const originContainer = document.querySelector(`.origin-container`);
const listEle = document.querySelectorAll(`li`);
const selected = document.querySelector(`li.selected`);



for (const form of forms) {
  form.onsubmit = event => {
    if (event.target.className === `origin-form`) {
      searchOrigin(inputs[0].value);
      originsList.innerHTML = ``
      inputs[0].value = ``;
    } else {
      searchDestination(inputs[1].value);
      destinationsList.innerHTML = ``

      inputs[1].value = ``;
    }
    event.preventDefault();
  }
}

originContainer.onclick = event => {

  if (event.target.closest(`LI`)) {
    listEle.forEach(element => {
      element.className = ``;
    })
    console.log(`hi`);
    event.target.closest(`LI`).classList.add(`selected`);
  }

}


function searchOrigin(searchValue) {
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?access_token=${mapBoxApiKey}&limit=10&bbox=${boundBox}`)
    .then(resp => resp.json())
    .then(originSearch => {

      originSearch.features.forEach(result => {
        updateOriginSearch(result);
      })
    })

};

function updateOriginSearch(searchResults) {

  originsList.insertAdjacentHTML(`beforeend`, `
  <li data-long="-97.19167" data-lat="49.815176" class="">
  <div class="name">${searchResults.text}</div>
  <div>${searchResults.properties.address}</div>
</li>  
  `)
}

function updateDestinationSearch(searchResults) {
  destinationsList.insertAdjacentHTML(`beforeend`, `
  <li data-long="-97.19167" data-lat="49.815176" class="">
  <div class="name">${searchResults.text}</div>
  <div>${searchResults.properties.address}</div>
</li>  
  `)


}

function searchDestination(searchValue) {
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?access_token=${mapBoxApiKey}&limit=10&bbox=${boundBox}`)
    .then(resp => resp.json())
    .then(destinationSearch => {

      destinationSearch.features.forEach(result => {
        updateDestinationSearch(result);
      })
    })



};
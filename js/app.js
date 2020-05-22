const forms = document.querySelectorAll(`form`);
const inputs = document.querySelectorAll(`input`);
const mapBoxApiKey = `pk.eyJ1Ijoia2x1b25nODgiLCJhIjoiY2thNWlsejBzMDBpaTNkcWYwZ3VmbjF0ZCJ9.Dt-l5W_looV6UXMeDr905w`;
const transitApiKey = `BbxBNg96RH903JTtJFdZ`;
const boundBox = `-97.325875,49.766204,-96.953987,49.99275`



for (const form of forms) {
  form.onsubmit = event => {
    if (event.target.className === `origin-form`) {
      console.log(`origin input:`);
      console.log(inputs[0].value);
      searchOrigin(inputs[0].value);
      inputs[0].value = ``;
    } else {
      console.log(`destination input:`)
      console.log(inputs[1].value);
      searchDestination(inputs[1].value);

      inputs[1].value = ``;
    }
    event.preventDefault();
  }
}


function searchOrigin(searchValue) {
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?access_token=${mapBoxApiKey}&limit=10&bbox=${boundBox}`)
    .then(resp => resp.json())
    .then(originSearch => {
      console.log(originSearch);
    })

};

function searchDestination(searchValue) {
  console.log(`You searched for destination: ${searchValue}`);



};
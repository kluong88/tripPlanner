const forms = document.querySelectorAll(`form`);
const inputs = document.querySelectorAll(`input`);



for (const form of forms) {

  form.onsubmit = event => {

    if (event.target.className === `origin-form`) {
      console.log(`origin input:`);
      console.log(inputs[0].value);
      inputs[0].value = ``;
    } else {
      console.log(`destination input:`)
      console.log(inputs[1].value);
      inputs[1].value = ``;
    }
    event.preventDefault();
  }
}

// https: //api.mapbox.com/geocoding/v5/mapbox.places/mall.json?access_token=pk.eyJ1Ijoiam9obmF0aGFubml6aW9sIiwiYSI6ImNqcG5oZjR0cDAzMnEzeHBrZGUyYmF2aGcifQ.7vAuGZ0z6CY0kXYDkcaOBg&limit=10&bbox=-97.325875,49.766204,-96.953987,49.99275
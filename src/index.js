document.addEventListener("DOMContentLoaded", () => {
  fetchPupData();
});

const dogBar = document.querySelector("#dog-bar");
const filterButton = document.querySelector("#good-dog-filter");
let dogArray = [];

function fetchPupData() {
  fetch("http://localhost:3000/pups")
    .then((response) => response.json())
    .then((pups) => {
      dogArray = pups;
      renderAllDogs(dogArray);
    });
}

const btn = document.createElement("button");

function renderAllDogs(dogArray) {
  dogArray.forEach((dog) => {
    // dogBar.innerHTML = "";
    let span = document.createElement("span");
    span.innerText = dog.name;
    dogBar.append(span);

    span.addEventListener("click", () => {
      let dogInfo = document.querySelector("#dog-info");
      dogInfo.innerText = "";
      let h2 = document.createElement("h2");
      h2.innerText = dog.name;

      let img = document.createElement("img");
      img.src = dog.image;

      btn.innerText = dog.isGoodDog ? "Good Dog" : "Bad Dog";
      btn.dataset.id = dog.id;
      btn.addEventListener("click", onButtonClick);
      dogInfo.append(h2, img, btn);
    });
  });
}

function onButtonClick(e) {
  let newValue;
  if (e.target.innerText.includes("Bad")) {
    e.target.innerText = "Good Dog";
    newValue = true;
  } else if (e.target.innerText.includes("Good")) {
    e.target.innerText = "Bad Dog";
    newValue = false;
  }
  updateGoodDogStatus(e.target.dataset.id, newValue);
}

function updateGoodDogStatus(id, newValue) {
  fetch(`http://localhost:3000/pups/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      isGoodDog: newValue,
    }),
  })
    .then((r) => r.json())
    .then((pup) => dogArray.push(pup));
}

filterButton.addEventListener("click", () => {
  dogBar.innerHTML = "";

  if (filterButton.innerText === "Filter good dogs: OFF") {
    filterButton.innerText = "Filter good dogs: ON";
    let foundGoodDog = dogArray.filter((dog) => dog.isGoodDog === true);
    renderAllDogs(foundGoodDog);
  } else {
    filterButton.innerText = "Filter good dogs: OFF";
    renderAllDogs(dogArray);
  }
});

// function onButtonClick(e) {
//   let newString;
//   if (e.target.innerText.includes("Good")) {
//     e.target.innerText = "Bad Dog";
//     newString = false;
//   } else if (e.target.innerText.includes("Bad")) {
//     e.target.innerText = "Good Dog";
//     newString = true;
//   }
//   patchRequest(e.target.id, newString);
// }

// function patchRequest(id, newString) {
//   fetch(`http://localhost:3000/pups/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify({
//       isGoodDog: newString,
//     }),
//   }).then((response) => response.json());

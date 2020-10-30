"use strict";

let desiredData = "https://swapi.dev/api/people/"

async function getData (requestedData) {
  let request = await fetch(requestedData)
  let data  = await request.json()
  return data
}

function createDetails(item) {
  let details = document.querySelector("div.character")
  let data = document.createElement("div");
  data.innerHTML = item
  details.append(data)
}

function writeCharacter(character) {
  let nameList = document.querySelector(".characters-names")
  let btn = document.createElement("button");
  btn.innerHTML = character.name
  btn.classList.add("char-box");
  nameList.append(btn)

  btn.addEventListener("click", function() {
    document.querySelector("div.character").innerHTML = ""
    createDetails(character.name)
    createDetails("Height: " + character.height)
    createDetails("Mass: " + character.mass + " kg")
    createDetails("Hair colour: " + character.hair_color)
    createDetails("Skin colour: " + character.skin_color)
    createDetails("Eye colour: " + character.eye_color)
    createDetails("Birth year: " + character.birth_year)
    createDetails("Gender " + character.gender)
  });

}

async function renderCharacterList (currentPage) {
  document.querySelector(".characters-names").innerHTML = ""
  document.querySelector(".page-number").innerHTML = currentPage + "/8"

  let data = await getData("https://swapi.dev/api/people/?page=" + currentPage)
  for (let i = 0; i < data.results.length - 4; i++) {
    writeCharacter(data.results[i])
  }
}

async function main() {
  let currentPage = 1

  document.querySelector("button.arrowLeft").addEventListener("click", function() {
    currentPage--

    if (currentPage == 0) {
      currentPage = 8
      renderCharacterList(currentPage)
    
    } else {
      renderCharacterList(currentPage)
    }
  });
  
  document.querySelector("button.arrowRight").addEventListener("click", function() {
    currentPage++

    if (currentPage == 9) {
      currentPage = 1
      renderCharacterList(currentPage)
    
    } else {
      renderCharacterList(currentPage)
    }
  });

  renderCharacterList(currentPage)

}

main();
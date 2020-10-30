"use strict";

let desiredData = "https://swapi.dev/api/people/"

async function getData (requestedData) {
  let request = await fetch(requestedData)
  let data  = await request.json()
  return data
}

function writeCharacter(character) {
  let nameList = document.querySelector(".characters-names")
  let btn = document.createElement("button");
  btn.innerHTML = character.name
  btn.classList.add("char-box");
  nameList.append(btn)

  btn.addEventListener("click", function(character) {
    console.log(character.name)
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

/*

let next = async dataSet => {
  let nextData = await getData(dataSet)
  console.log(nextData)

  for (let i = 0; i < nextData.results.length; i++) {
    console.log(nextData.results[i].name)
  }
  next(nextData.next)
}
 
let data = await getData(desiredData);
console.log(data)
console.log(data.next)
console.log(data.results.length)

for (let i = 0; i < data.results.length; i++) {
  console.log(data.results[i].name)
}

next(data.next)

let currentRegister = 0

let checker = displayed => {
  if (displayed > data.results.length - 1) {
    return displayed % data.results.length
  }
  else if (displayed < 0) {
    return displayed = data.results.length - 1
  }
  else {
    return displayed
  }
}

let defaultUser = async (data, value) => {

  if (value == 1) {
    currentRegister++
  }

  else if (value == -1) {
    currentRegister--
  }

  let secondProfile = currentRegister + 1
  let thirdProfile =  currentRegister + 2

  currentRegister = checker(currentRegister)
  secondProfile = checker(secondProfile)
  thirdProfile =  checker(thirdProfile)

  document.querySelector("h1.personNameOne").innerHTML = data.results[currentRegister].name.title + " " + data.results[currentRegister].name.first + " " + data.results[currentRegister].name.last
  document.querySelector("img.profilePictureOne").src = data.results[currentRegister].picture.large
  document.querySelector("p.personEmailOne").innerHTML = data.results[currentRegister].email
  document.querySelector("p.personPhoneOne").innerHTML = data.results[currentRegister].phone

  document.querySelector("h1.personNameTwo").innerHTML = data.results[secondProfile].name.title + " " + data.results[secondProfile].name.first + " " + data.results[secondProfile].name.last
  document.querySelector("img.profilePictureTwo").src = data.results[secondProfile].picture.large
  document.querySelector("p.personEmailTwo").innerHTML = data.results[secondProfile].email
  document.querySelector("p.personPhoneTwo").innerHTML = data.results[secondProfile].phone

  document.querySelector("h1.personNameThree").innerHTML = data.results[thirdProfile].name.title + " " + data.results[thirdProfile].name.first + " " + data.results[thirdProfile].name.last
  document.querySelector("img.profilePictureThree").src = data.results[thirdProfile].picture.large
  document.querySelector("p.personEmailThree").innerHTML = data.results[thirdProfile].email
  document.querySelector("p.personPhoneThree").innerHTML = data.results[thirdProfile].phone

}
defaultUser(data, 0)

}


main();

*/
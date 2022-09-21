let searchBarPartner = document.getElementById('exampleDataListPartner');
let searchBarHall = document.getElementById('exampleDataListHall');
let searchBarPartnerIndex = document.getElementById('exampleDataListPartnerIndex');
let activePartnerRadio = document.getElementById('activePartnerRadio');
let inactivePartnerRadio = document.getElementById('inactivePartnerRadio');
let activeHallRadio = document.getElementById('activeHallRadio');
let inactiveHallRadio = document.getElementById('inactiveHallRadio');
let selectPartner = document.getElementById('selectPartner');
let activeHallByPartnerRadio = document.getElementById('activeHallByPartnerRadio');
let inactiveHallByPartnerRadio = document.getElementById('inactiveHallByPartnerRadio');

async function searchPartner(e) {
  setTimeout(() => {
    let filter = searchBarPartner.value.toUpperCase();
    let partnerCards = document.getElementsByClassName('partnerCard')
    for (i = 0; i < partnerCards.length; i++) {
      let name = partnerCards[i].getElementsByClassName('card-title')[0]
      let nameValue = name.textContent || name.innerText;
      if (nameValue.toUpperCase().indexOf(filter) > -1) {
        partnerCards[i].style.display = "";
      } else {
          partnerCards[i].style.display = "none"    
      }
    }
  }, 500)
};

async function searchActivePartner (e) {
  setTimeout(() => {
    let filter = activePartnerRadio.value.toUpperCase();
    let partnerCards = document.getElementsByClassName('partnerCard')
    for(i=0; i < partnerCards.length; i++) {
      let active = partnerCards[i].getElementsByClassName('isActive')[0]
      let activeValue = active.textContent || active.innerText;
      if (activeValue.toUpperCase().trim() === filter){
        partnerCards[i].style.display = "";
      } else {
        partnerCards[i].style.display = "none"
      }
    }
  }, 500);
}

async function searchInactivePartner (e) {
  setTimeout(() => {
    let filter = inactivePartnerRadio.value.toUpperCase();
    let partnerCards = document.getElementsByClassName('partnerCard')
    for(i=0; i < partnerCards.length; i++) {
      let active = partnerCards[i].getElementsByClassName('isActive')[0]
      let activeValue = active.textContent || active.innerText;
      if (activeValue.toUpperCase().trim() === filter){
        partnerCards[i].style.display = "";
      } else {
        partnerCards[i].style.display = "none"
      }
    }
  }, 500);
}

async function searchHall(e) {
  setTimeout(() => {
    let filter = searchBarHall.value.toUpperCase();
    let hallCards = document.getElementsByClassName('hallCard')
    for (i = 0; i < hallCards.length; i++) {
      let name = hallCards[i].getElementsByClassName('card-name')[0]
      let nameValue = name.textContent || name.innerText;
  
      if (nameValue.toUpperCase().indexOf(filter) > -1) {
        hallCards[i].style.display = "";
      } else {
          hallCards[i].style.display = "none"
      }
    }    
  }, 500);
};

async function searchHallByPartner(e) {
  setTimeout(() => {
    let filter = searchBarPartnerIndex.value.toUpperCase();
    let hallCards = document.getElementsByClassName('hallCard')
    for (i = 0; i < hallCards.length; i++) {
      let name = hallCards[i].getElementsByClassName('card-title')[0]
      let nameValue = name.textContent || name.innerText;
  
      if (nameValue.toUpperCase().indexOf(filter) > -1) {
        hallCards[i].style.display = "";
      } else {
          hallCards[i].style.display = "none"
      }
    }    
  }, 500);
};

async function searchActiveHall(){
  setTimeout(() => {
    let filter = activeHallRadio.value.toUpperCase();
    let hallCards = document.getElementsByClassName('hallCard')
    for(i=0; i < hallCards.length; i++) {
      let active = hallCards[i].getElementsByClassName('isActive')[0]
      let activeValue = active.textContent || active.innerText;
      if (activeValue.toUpperCase().trim() === filter){
        hallCards[i].style.display = "";
      } else {
        hallCards[i].style.display = "none"
      }
    }
  }, 500);
}

async function searchInactiveHall(){
  setTimeout(() => {
    let filter = inactiveHallRadio.value.toUpperCase();
    let hallCards = document.getElementsByClassName('hallCard')
    for(i=0; i < hallCards.length; i++) {
      let active = hallCards[i].getElementsByClassName('isActive')[0]
      let activeValue = active.textContent || active.innerText;
      if (activeValue.toUpperCase().trim() === filter){
        hallCards[i].style.display = "";
      } else {
        hallCards[i].style.display = "none"
      }
    }
  }, 500);
}

async function searchByPartner() {
  setTimeout(() => {
    let filter = selectPartner.value.toUpperCase();
    let hallCards = document.getElementsByClassName('hallCard')
    for(i=0; i < hallCards.length; i++){
      let name = hallCards[i].getElementsByClassName('card-title')[0]
      let nameValue = name.textContent || name.innerText;
      if (nameValue.toUpperCase().indexOf(filter) > -1){
        hallCards[i].style.display = "";
      } else {
        hallCards[i].style.display = "none"
      }
    }
  }, 500);
}

async function searchActiveHallByPartner(){
  setTimeout(() => {
    let filter = activeHallByPartnerRadio.value.toUpperCase();
    let hallCards = document.getElementsByClassName('hallCard')
    for(i=0; i < hallCards.length; i++) {
      let active = hallCards[i].getElementsByClassName('isActive')[0]
      let activeValue = active.textContent || active.innerText;
      if (activeValue.toUpperCase().trim() === filter){
        hallCards[i].style.display = "";
      } else {
        hallCards[i].style.display = "none"
      }
    }
  }, 500);
}

async function searchInactiveHallByPartner(){
  setTimeout(() => {
    let filter = inactiveHallByPartnerRadio.value.toUpperCase();
    let hallCards = document.getElementsByClassName('hallCard')
    for(i=0; i < hallCards.length; i++) {
      let active = hallCards[i].getElementsByClassName('isActive')[0]
      let activeValue = active.textContent || active.innerText;
      if (activeValue.toUpperCase().trim() === filter){
        hallCards[i].style.display = "";
      } else {
        hallCards[i].style.display = "none"
      }
    }
  }, 500);
}

if(searchBarPartner){
  searchBarPartner.addEventListener('input', searchPartner);
}

if(searchBarHall){
  searchBarHall.addEventListener('input', searchHall);
}

if(searchBarPartnerIndex){
  searchBarPartnerIndex.addEventListener('input', searchHallByPartner)
}

if(activePartnerRadio){
  activePartnerRadio.addEventListener('input', searchActivePartner)
}

if(inactivePartnerRadio){
  inactivePartnerRadio.addEventListener('input', searchInactivePartner)
}

if(activeHallRadio){
  activeHallRadio.addEventListener('input', searchActiveHall)
}

if(inactiveHallRadio){
  inactiveHallRadio.addEventListener('input', searchInactiveHall)
}

if(selectPartner){
  selectPartner.addEventListener('input', searchByPartner)
}

if(activeHallByPartnerRadio){
  activeHallByPartnerRadio.addEventListener('input', searchActiveHallByPartner)
}

if(inactiveHallByPartnerRadio){
  inactiveHallByPartnerRadio.addEventListener('input', searchInactiveHallByPartner)
}







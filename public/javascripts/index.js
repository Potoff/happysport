let searchBarPartner = document.getElementById('exampleDataListPartner');
let searchBarHall = document.getElementById('exampleDataListHall');
let searchBarPartnerIndex = document.getElementById('exampleDataListPartnerIndex');

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

async function searchHall(e) {
  setTimeout(() => {
    let filter = searchBarHall.value.toUpperCase();
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

async function searchHallByPartner(e) {
  setTimeout(() => {
    let filter = searchBarPartnerIndex.value.toUpperCase();
    let hallCards = document.getElementsByClassName('hallCardPartner')
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

if(searchBarPartner){
  searchBarPartner.addEventListener('input', searchPartner);
}

if(searchBarHall){
  searchBarHall.addEventListener('input', searchHall);
}

if(searchBarPartnerIndex){
  searchBarPartnerIndex.addEventListener('input', searchHallByPartner)
}








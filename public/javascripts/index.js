let searchBar = document.getElementById('exampleDataListPartner');

searchBar.addEventListener('input', (e) => {
    let filter = searchBar.value.toUpperCase();
    let partnerCards = document.getElementsByClassName('partnerCard')
    for (i = 0; i < partnerCards.length; i++) {
      let name = partnerCards[i].getElementsByClassName('card-title')[0]
      let nameValue = name.textContent || name.innerText;

      if (nameValue.toUpperCase().indexOf(filter) > -1) {
        partnerCards[i].style.display = "";
      } else {
        partnerCards[i].style.display = "none";
      }
    }
})
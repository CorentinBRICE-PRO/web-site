var boutons = document.querySelectorAll("button");

for (var i = 0; i < boutons.length; i++) {
  boutons[i].addEventListener("click", function() {
    var valeurDuBouton = this.value;
    window.location.href = "../pageJeu/pageJeu.html?valeurDuBouton=" + encodeURIComponent(valeurDuBouton);
  });
}

function afficherValeur() {
  var valeur = document.getElementById("input-valeur").value;
  window.location.href = "../pageJeu/pageJeu.html?valeurDuBouton=" + encodeURIComponent(valeur);
}

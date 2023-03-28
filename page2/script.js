
/* on attribue la valeur a valeurDuBouton selon le bouton et le nombre de joueur choisi*/ 
var boutons = document.querySelectorAll("button");
for (var i = 0; i < boutons.length; i++) {
  boutons[i].addEventListener("click", function() {
    var valeurDuBouton = this.value;
    window.location.href = "../pageJeu/pageJeu.html?valeurDuBouton=" + encodeURIComponent(valeurDuBouton);
  });
}

/* fonction permettant de récuperer la valeur du nombre de joueur et renvoyer la page associé avec le bon nombre de joueur et le jeu*/
function afficherValeur() {
  var valeur = document.getElementById("input-valeur").value;
  window.location.href = "../pageJeu/pageJeu.html?valeurDuBouton=" + encodeURIComponent(valeur);
}


// Création d'un objet URLSearchParams contenant les paramètres de l'URL actuelle pour la récupération
//  de la valeur du paramètre "valeur" dans l'URL qui correspond au nombre de joueur
var urlParams = new URLSearchParams(window.location.search);
var valeurDuBouton = urlParams.get("valeur");
document.getElementById("nombreJoueur").value = valeurDuBouton;


// Créer le code HTML des profils avec camnberts correspondant aux nombre de joueurs
var codeHTML = '';
for (var i = 1; i <= valeurDuBouton; i++) {
  codeHTML += '<div class="rectangle">';
  codeHTML +=   '<span>Joueur ' + i + '</span>';
  codeHTML +=   '<div class="camenbert">';
  codeHTML +=     '<div class="part part-1"></div>';
  codeHTML +=     '<div class="part part-2"></div>';
  codeHTML +=     '<div class="part part-3"></div>';
  codeHTML +=     '<div class="part part-4"></div>';
  codeHTML +=     '<div class="part part-5"></div>';
  codeHTML +=     '<div class="part part-6"></div>';
  codeHTML +=   '</div>';
  codeHTML +=   '</div>';
}
// Insérer le code HTML dans la page jeu
document.getElementById('joueurs-container').innerHTML = codeHTML;


// Genere aleatoirement une face d'un dé
function changerDe() {
  var de = document.getElementById("de");
  var resultat = Math.floor(Math.random() * 6) + 1;
  de.src = "../assets/images/de" + resultat + ".png";
}
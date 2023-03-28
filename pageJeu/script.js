var urlParams = new URLSearchParams(window.location.search);
var valeurDuBouton = urlParams.get("valeur");
document.getElementById("nombreJoueur").value = valeurDuBouton;


function changerDe() {
  var de = document.getElementById("de");
  var resultat = Math.floor(Math.random() * 6) + 1;
  de.src = "../assets/images/de" + resultat + ".png";
}

// Créer le code HTML correspondant
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
// Insérer le code HTML dans la page
document.getElementById('joueurs-container').innerHTML = codeHTML;

/* script permettant de recuperer le nombre de joueur selon le nombre de joueur 
    choisi. Une page est renvoyé avec le bon nombre de joueur ainsi que le plateau 
    de jeu affiché à l'écran */

var boutons = document.querySelectorAll("button");
for (var i = 0; i < boutons.length; i++) {
    boutons[i].addEventListener("click", function() {
        var valeurDuBouton = this.value;
        window.location.href = "../html/pageJeu.html?valeur=" + valeurDuBouton;
    });
}
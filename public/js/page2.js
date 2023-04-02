/* script permettant de recuperer le nombre de joueur selon le nombre de joueur 
    choisi. Une page est renvoyé avec le bon nombre de joueur ainsi que le plateau 
    de jeu affiché à l'écran */

const firebaseConfig = {
apiKey: "AIzaSyAspisnbtuq7zXqNyeFA0xfkRKPCwlKDXk",
authDomain: "trivialpoursite.firebaseapp.com",
projectId: "trivialpoursite",
storageBucket: "trivialpoursite.appspot.com",
messagingSenderId: "934201717719",
appId: "1:934201717719:web:77188c864e7bc443085192",
measurementId: "G-KF17Q422EM"
};
    
   
  
console.log("ca marche");
firebase.initializeApp(firebaseConfig);
  

console.log("ca marche pas");
var boutons = document.querySelectorAll("button");

for (var i = 0; i < boutons.length; i++) {
    boutons[i].addEventListener("click", function() {
        const valeurDuBouton = this.value; 
    setTimeout(function() {
    firebase.firestore().collection('partie').doc('Partie1').update({
    nbjoueurs: valeurDuBouton
    })

    .then(() => {
        console.log("Le champ 'nbjoueurs' a été mis à jour avec succès !");
    })
    .catch((error) => {
        console.error("Erreur lors de la mise à jour du champ 'nbjoueurs' : ", error);
    });
  
   
    window.location.href = "../html/pageJeu.html?valeur=" + valeurDuBouton;
      }, 1); 
    });
}
window.onload = updateValeur;
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
let valeurDuBouton;
for (var i = 0; i < (boutons.length-1); i++) {
    boutons[i].addEventListener("click", function() {
    valeurDuBouton = this.value; 
    });
}



function creerPartie() {



var newidgameSaisie = document.getElementById("newidgameSaisie").value;
firebase.firestore().collection("partie").doc(newidgameSaisie).set({
  de: 2,
  nbjoueurs: valeurDuBouton,
})
.then(() => {
  console.log("Document ajouté avec succès !");
  window.location.href = "../html/pageJeu.html?valeur=" + newidgameSaisie;
})
.catch((error) => {
  console.error("Erreur lors de l'ajout du document :", error);
});
}


function logPartie() {
    var idsaisie = document.getElementById("idgame").value;
    firebase.firestore().collection("partie").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.exists && doc.id === idsaisie) {
            const idgame = doc.id;
            window.location.href = "../html/pageJeu.html?valeur=" + idgame;
     
            console.log("La valeur de idgame est : ", idgame);
        } else {
           
            console.log("idgame n'existe pas  !");
        }
    });
    }).catch((error) => {
        console.log("Erreur lors de la récupération du document : ", error);
    });
}



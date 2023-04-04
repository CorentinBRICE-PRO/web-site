/* script permettant de recuperer le nombre de joueur selon le nombre de joueur 
    choisi. Une page est renvoyé avec le bon nombre de joueur ainsi que le plateau 
    de jeu affiché à l'écran */


//Configuration des identifiants de connexion pour la bd de Firebase (Firestore).
const firebaseConfig = {
apiKey: "AIzaSyAspisnbtuq7zXqNyeFA0xfkRKPCwlKDXk",
authDomain: "trivialpoursite.firebaseapp.com",
projectId: "trivialpoursite",
storageBucket: "trivialpoursite.appspot.com",
messagingSenderId: "934201717719",
appId: "1:934201717719:web:77188c864e7bc443085192",
measurementId: "G-KF17Q422EM"
};
    

//Initialisation de Firebase
  
firebase.initializeApp(firebaseConfig);


// Attribution du nombre de joueur à la variable valeurDuBouton
var boutons = document.querySelectorAll("button");
let valeurDuBouton;
for (var i = 0; i < (boutons.length-1); i++) {
    boutons[i].addEventListener("click", function() {
    valeurDuBouton = this.value; 
    });
}


// Création de partie dans la Firestore
function creerPartie() {
  // Recupere l'id de la partie saisie par l'utilisateur pour la creer dans la bd
var newidgameSaisie = document.getElementById("newidgameSaisie").value;
  // Atribution du nombre de joueur selectionné par l'utilisateur
firebase.firestore().collection("partie").doc(newidgameSaisie).set({
  de: 2,
  nbjoueurs: valeurDuBouton,
})
.then(() => {
  //Redirection vesr la page de jeu de la nouvelle partie créée
  console.log("nbjoueur ajouté avec succès !");
  window.location.href = "../html/pageJeu.html?valeur=" + newidgameSaisie;
})
.catch((error) => {
  console.error("Erreur lors de l'ajout du document :", error);
});
}

// Connexion a une partie deja existante dans la bd
function logPartie() {
    var idsaisie = document.getElementById("idgame").value;
    //Verifie si l'idgame saisie existe et si cest le cas charge la page de jeu adequate
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



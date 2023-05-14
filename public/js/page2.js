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
measurementId: "G-KF17Q422EM",
databaseURL: "https://trivialpoursite-default-rtdb.europe-west1.firebasedatabase.app"
};

//Initialisation de Firebase
  
firebase.initializeApp(firebaseConfig);



// Connexion a une partie deja existante dans la bd
function logPartie() {
  var idsaisie = document.getElementById("idgame").value;
  console.log(idsaisie);
  console.log("../html/pageJeu.html?valeur="+idsaisie);

  // Accéder à la référence de la partie correspondant à l'identifiant saisi
  firebase.database().ref(`partie/${idsaisie}`).on("value", (snapshot) => {
    // Vérifier si snapshot contient une valeur
    if (snapshot.exists()) {
      const idgame = snapshot.key;
  
      // Rediriger l'utilisateur vers la page de jeu
      window.location.href = "../html/pageJeu.html?valeur=" + idgame;
      console.log("La valeur de idgame est : ", idgame);
    } else {
      console.log("L'identifiant de partie saisi n'existe pas dans la base de données.");
      alert("Identifiant de partie n'existe pas, veuillez saisir un id valide")
    }
  }, (error) => {
    console.log("Erreur lors de la récupération du document : ", error);
  });
}


history.pushState(null, null, location.href);
window.onpopstate = function(event) {
    history.go(1);
};
history.replaceState(null, null, document.URL);


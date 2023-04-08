

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

// Création d'un compte dans la base de donnée
function signUpJoueur() {
    var Pseudo = document.getElementById("Pseudo").value;
    var Email = document.getElementById("email-signup").value;
    var MotDePasse = document.getElementById("mdp-signup").value;
    // Atribution de toutes les informations tapé par l'utilisateur
    firebase.firestore().collection("Login").doc(Pseudo).set({
        email: Email,
        mdp: MotDePasse,
        pseudo: Pseudo,
    })
    .then(() => {
    //Redirection vers la page principale
    console.log("Compte créer avec succès !");
    window.location.href = "../index.html";
    })
    .catch((error) => {
    console.error("Erreur lors de l'ajout du document :", error);
    });
}

// Connexion a une partie deja existante dans la bd
function loginJoueur() {
    var idJoueursaisie = document.getElementById("email").value;
    var idmdp = document.getElementById("mdp").value;
    //Verifie si l'idgame saisie existe et si cest le cas charge la page de jeu adequate
    firebase.firestore().collection("Login").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.exists && doc.id === idJoueursaisie) {
            if (doc.data().mdp === idmdp) {
            const idgame = doc.data().idgame;
            window.location.href = "../html/pageJeu.html?valeur=" + idgame ;
            console.log("Connexion reussi ", idgame);
            }
            else{
                console.log("Mdp Incorrect ");

            }
        } else {
           
            console.log("identifiant inconnue");
        }
    });
    }).catch((error) => {
        console.log("Erreur lors de la récupération du document : ", error);
    });
}



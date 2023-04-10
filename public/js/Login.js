

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

var alertbox = document.getElementById("alert");
alertbox.style.display = "none";

// Genere un id de game aleatire de 7 caracteres 
function generationIdgameAleatoire() {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 7; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  }
  

// Création d'un compte dans la base de donnée
function signUpJoueur() {
    alertbox.style.display = "none";

    var Pseudo = document.getElementById("Pseudo").value;
    var Email = document.getElementById("email-signup").value;
    var MotDePasse = document.getElementById("mdp-signup").value;

    // Vérifie si il y a un pseudo dans le chanmp Pseudo/Nom
    if (Pseudo) {
        var docref = firebase.firestore().collection("Login").doc(Pseudo);

        docref.get().then((pseudo) => {
            // Va chercher dans la BDD si le pseudo existe déjà
            if (pseudo.exists) {
                docref.onSnapshot((doc) => {
                    // Affiche un message d'erreur.
                    //console.log("Le compte exite déjà !!!");
                    alertbox.firstChild.textContent = "Ce Pseudo existe déja. Veuillez réessayer.";
                    alertbox.style.display = "block";
                });
            } else {
                // Vérifie si il y a un champ mot de Passe et Email
                if ( Email && MotDePasse) {
                    // Atribution de toutes les informations tapé par l'utilisateur
                    firebase.firestore().collection("Login").doc(Pseudo).set({
                        email: Email,
                        mdp: MotDePasse,
                        pseudo: Pseudo,
                        idgame : generationIdgameAleatoire(),
                    })
                    .then(() => {
                    //Redirection vers la page principale
                    console.log("Compte créer avec succès !");
                    window.location.href = "../index.html";
                    })
                    .catch((error) => {
                    console.error("Erreur lors de l'ajout du document :", error);
                    });
                } else {
                    // Affiche un message d'erreur
                    alertbox.firstChild.textContent = "Vous n'avez pas renseigné votre Email ou Mot de passe";
                    alertbox.style.display = "block";
                }
                
            }
        })
    } else {
        // Affiche un autre message d'erreur.
        alertbox.firstChild.textContent = "Vous n'avez pas mis de Pseudo";
        alertbox.style.display = "block";
    } 
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



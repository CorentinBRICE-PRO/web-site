
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

var alertSignUp = document.getElementById("alert-signup");
alertSignUp.style.display = "none";

var alertLogIn = document.getElementById("alert-login");
alertLogIn.style.display = "none";

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
    alertSignUp.style.display = "none";

    var Pseudo = document.getElementById("Pseudo").value;
    var Email = document.getElementById("email-signup").value;
    var MotDePasse = document.getElementById("mdp-signup").value;

    // Utiliser DOMPurify pour nettoyer la valeur de pseudo/Email/Motdepasse
    const clearPseudo = DOMPurify.sanitize(Pseudo);
    const clearEmail = DOMPurify.sanitize(Email);
    const clearMotDePasse = DOMPurify.sanitize(MotDePasse);
    

    // Vérifie si il y a un pseudo dans le champ Pseudo/Nom
    if (Pseudo) {
        var docref = firebase.firestore().collection("Login").doc(Pseudo);

        docref.get().then((pseudo) => {
            // Va chercher dans la BDD si le pseudo existe déjà
            if (pseudo.exists) {
                docref.onSnapshot((doc) => {
                    // Affiche un message d'erreur.
                    //console.log("Le compte exite déjà !!!");
                    alertSignUp.firstChild.textContent = "Ce Pseudo existe déja. Veuillez réessayer.";
                    alertSignUp.style.display = "block";
                });
            } else {
                // Vérifie si il y a un champ Mot de Passe et Email
                if (validateEmail(Email)) {
                    if (MotDePasse) {
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
                        alertSignUp.firstChild.textContent = "Vous n'avez pas renseigné de Mot de Passe";
                        alertSignUp.style.display = "block";
                    }
                } else {
                    // Affiche un message d'erreur
                    alertSignUp.firstChild.textContent = "Email Incorrect";
                    alertSignUp.style.display = "block";
                }
                
            }
        })
    } else {
        // Affiche un autre message d'erreur.
        alertSignUp.firstChild.textContent = "Vous n'avez pas mis de Pseudo";
        alertSignUp.style.display = "block";
    } 
}

// Connexion a une partie deja existante dans la bd
function loginJoueur() {
    var Email = document.getElementById("email-login").value;
    var idmdp = document.getElementById("mdp-login").value;

    alertLogIn.style.display = "none";

    //Verifie si l'idgame saisie existe et si cest le cas charge la page de jeu adequate
    firebase.firestore().collection("Login").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        if (Email) {
            if (doc.exists && doc.get("email") === Email) {
                if (doc.get("mdp") === idmdp) {
                    const idgame = doc.data().idgame;
                    window.location.href = "../html/Compte.html?valeur=" + doc.get("pseudo") ;
                    console.log("Connexion reussi ", idgame);
                }
                else {
                    alertLogIn.firstChild.textContent = "Mot de passe Inconnu ou Incorrect";
                    alertLogIn.style.display = "block";
                }
            } else {
                alertLogIn.firstChild.textContent = "Adresse Email Inconnu ou Incorrect";
                alertLogIn.style.display = "block";
            }
        } else {
            alertLogIn.firstChild.textContent = "Vous n'avez pas entré d'adresse Email";
            alertLogIn.style.display = "block";
        }
          
    });

    }).catch((error) => {
        console.log("Erreur lors de la récupération du document : ", error);
    });
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}



console.log(window.sessionStorage.hasOwnProperty("uid"))
//console.log(window.sessionStorage.getItem("uid"));
const uid = window.sessionStorage.getItem("uid");
window.sessionStorage.removeItem("uid");
var idGamePlayer;

firebase.firestore().collection("Login").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if (doc.exists && doc.id == uid) {
            console.log(doc.data().pseudo)
            document.getElementById("compte").innerText = doc.data().pseudo;
            idGamePlayer = doc.data().idgame;
        }
    })
});

let page = document.getElementById("existing");
var text = document.getElementById("existing").innerText;
//InnerText preféré a innerHTML pour empecher une attaque XSS
page.innerText = "Il n'existe pas de partie";
firebase.firestore().collection("partie").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if (doc.exists && doc.id == idGamePlayer) {
            console.log("Une partie existe déja");
            page.innerText = "Il existe déja une partie";
            text = "Il existe déja une partie";
        }
    });
});


if (text== "Il n'existe pas de partie") {
    var old = document.getElementById("old");
    old.parentNode.removeChild(old);
}

function logPartie() {
    console.log("Clicking" + idGamePlayer);
    window.location.href = "../html/pageJeu.html?valeur=" + idGamePlayer;
}
console.log(idGamePlayer)
function creerPartie() {
    let nbjoueurs = prompt("Combien de joueurs ?");
    firebase.firestore().collection("partie").doc(idGamePlayer).set({
        tour: 1,
        nbjoueurs: nbjoueurs,
      })
      .then(() => {
        //Redirection vesr la page de jeu de la nouvelle partie créée
        console.log("nbjoueur ajouté avec succès !");
       
       // window.location.href = "../html/pageJeu.html?valeur=" + idGamePlayer;
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du document :", error);
      });

      nbjoueurs = parseInt(nbjoueurs);
    
firebase.database().ref("partie/" + idGamePlayer).set({
    tour: 1,
    nbrjoueurs: nbjoueurs,
  }, function(error) {
    if (error) {
      console.error("Erreur lors de l'ajout du document :", error);
    } else {
      // Créer le chemin Joueurs s'il n'existe pas déjà
      firebase.database().ref("Joueurs").set(null, function(error) {
        if (error) {
          console.error("Erreur lors de la création du chemin Joueurs :", error);
        } else {
          console.log("Chemin Joueurs créé avec succès !");
          
          // Créer un sous-chemin JoueurX pour chaque joueur
          for (let i = 1; i <= nbjoueurs; i++) {
            firebase.database().ref(`partie/${idGamePlayer}/Joueurs/Joueur${i}`).set({
              bleu: false,
              jaune: false,
              orange: false,
              rose: false,
              rouge: false,
              vert: false,
              violet: false,
            }, function(error) {
              if (error) {
                console.error("Erreur lors de l'ajout du document joueur :", error);
              } else {
                console.log(`Document joueur ${i} ajouté avec succès !`);
              }
            });
          }
          window.location.href = "../html/pageJeu.html?valeur=" + idGamePlayer;
        }
      });
    }
});

}

history.pushState(null, null, location.href);
window.onpopstate = function(event) {
    history.go(1);
};
history.replaceState(null, null, document.URL);



/*
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("Je suis logged in!")
      
    }
    else {
      // No user is signed in.
      console.log("Pas login")
    }
});


  var user = firebase.auth().currentUser;
  if (user) {
    // User is signed in.
    console.log("logged in!")
  } else {
    // No user is signed in.
    console.log("Not logged in!")
  }
*/
/*
var idGamePlayer = null;
firebase.firestore().collection("Login").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if (doc.exists && doc.data().pseudo == pseudo) {
            console.log("IdGame : "+doc.data().idgame);
            idGamePlayer = doc.data().idgame;
        }
    });
});

let page = document.getElementById("existing");
//InnerText preféré a innerHTML pour empecher une attaque XSS
page.innerText = "Il n'existe pas de partie";
firebase.firestore().collection("partie").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if (doc.exists && doc.id == idGamePlayer) {
            console.log("Une partie existe déja");
            page.innerText = "Il existe déja une partie";
        }
    });
});

function logPartie() {
    console.log("Clicking" + idGamePlayer);
    window.location.href = "../html/pageJeu.html?valeur=admin";
}
*/
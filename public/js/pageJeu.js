
// Création d'un objet URLSearchParams contenant les paramètres de l'URL actuelle pour la récupération
//  de la valeur du paramètre "valeur" dans l'URL qui correspond au nombre de joueur
var urlParams = new URLSearchParams(window.location.search);
var idgame = urlParams.get("valeur");



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
      



// Initialisation de Firebase
firebase.initializeApp(firebaseConfig);

// Créez une référence à Firestore
const db = firebase.firestore();

// Fonction qui génère un message aléatoire
function generateRandomMessage() {
  const messages = ["Bonjour!", "Comment ça va?", "Je suis un message aléatoire", "Au revoir!"];
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}


//Récupere une question de la bd pour l'afficher ensuite
const messagesCollection = firebase.firestore().collection('question');
messagesCollection.doc('q1').get().then((doc) => {
  if (doc.exists) {
    // Affichez le message dans la balise <div>
    document.getElementById('message').textContent = doc.data().question;
  } else {
    console.log("Le document n'existe pas !");
  }
}).catch((error) => {
  console.log("Erreur lors de la lecture du document :", error);
});



//Verifie que la reponse saisie est la meme que celle de la question dans la bd
function verifierReponse() {
  var repsaisie = document.getElementById("validationReponse").value;
  firebase.firestore().collection("question").doc("q1").get().then((doc) => {
    if (doc.exists) {
      if (doc.data().rep === repsaisie) {
        console.log("La réponse est vraie");
      } else {
        console.log("La réponse est fausse");
      }
    } else {
      console.log("Le document n'existe pas.");
    }
  }).catch((error) => {
    console.log("Erreur lors de la récupération du document : ", error);
  });
}




// Créer le code HTML des profils avec camnberts correspondant aux nombre de joueurs de la partie chargée
firebase.firestore().collection('partie').doc(idgame).get()
  .then((doc) => {
    if (doc.exists) {
      toto =doc.data().nbjoueurs;
      const nbJoueurs = doc.data().nbjoueurs;
      console.log(nbJoueurs);  
      var codeHTML = '';
// Créer le code HTML des profils avec camnberts correspondant aux nombre de joueurs de la partie chargée
for (var i = 1; i <=  nbJoueurs; i++) {
  codeHTML += '<div class="rectangle">';
  codeHTML +=   '<span>Joueur ' + i + '</span>';
  codeHTML +=   '<div class="camenbert">';
  codeHTML +=     '<div class="part part-1"></div>';
  codeHTML +=     '<div class="part part-2"></div>';
  codeHTML +=     '<div class="part part-3"></div>';
  codeHTML +=     '<div class="part part-4"></div>';
  codeHTML +=     '<div class="part part-5"></div>';
  codeHTML +=     '<div class="part part-6"></div>';
  codeHTML +=     '<div class="line line1"></div>';
  codeHTML +=     '<div class="line line2"></div>';
  codeHTML +=     '<div class="line line3"></div>';
  codeHTML +=   '</div>';
  codeHTML +=   '</div>';

}
// Insérer le code HTML dans la page jeu
document.getElementById('joueurs-container').innerHTML = codeHTML;
    } else {
      console.log("Le document n'existe pas !");
    }
  })
  .catch((error) => {
    console.log("Erreur lors de la récupération du document : ", error);
  });


// Genere aleatoirement une face d'un dé
function changerDe() {
  var de = document.getElementById("de");
  var resultat = Math.floor(Math.random() * 6) + 1;
//Stock la valeur du dé dans la bd 
  firebase.firestore().collection('partie').doc(idgame).update({
    de: resultat
    })

    .then(() => {
        console.log("Le champ 'de' a été mis à jour avec succès !");
    })
    .catch((error) => {
        console.error("Erreur lors de la mise à jour du champ 'de' : ", error);
    });

  de.src = "../assets/images/de" + resultat + ".png";
}
  window.onload = updateValeur;

// Création d'un objet URLSearchParams contenant les paramètres de l'URL actuelle pour la récupération
//  de la valeur du paramètre "valeur" dans l'URL qui correspond au nombre de joueur
var urlParams = new URLSearchParams(window.location.search);
var idgame = urlParams.get("valeur");


// Créer le code HTML des profils avec camnberts correspondant aux nombre de joueurs






const firebaseConfig = {
  apiKey: "AIzaSyAspisnbtuq7zXqNyeFA0xfkRKPCwlKDXk",
  authDomain: "trivialpoursite.firebaseapp.com",
  projectId: "trivialpoursite",
  storageBucket: "trivialpoursite.appspot.com",
  messagingSenderId: "934201717719",
  appId: "1:934201717719:web:77188c864e7bc443085192",
  measurementId: "G-KF17Q422EM"
  };
      

// Utilisez firebaseConfig pour initialiser votre connexion Firestore


// Initialise l'application Firebase
firebase.initializeApp(firebaseConfig);

// Créez une référence à Firestore
const db = firebase.firestore();

// Fonction qui génère un message aléatoire
function generateRandomMessage() {
  const messages = ["Bonjour!", "Comment ça va?", "Je suis un message aléatoire", "Au revoir!"];
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

const button = document.getElementById("cliquerici");
button.addEventListener("click", function() {
  // Appelez la fonction qui génère un message aléatoire
  const message = generateRandomMessage();

  // Enregistrez le message dans la base de données Firestore
  db.collection("messages").add({
    text: message,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(function(docRef) {
    console.log("Message enregistré avec l'ID:", docRef.id);
  })
  .catch(function(error) {
    console.error("Erreur lors de l'enregistrement du message:", error);
  });
});


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


firebase.firestore().collection('partie').doc(idgame).get()
  .then((doc) => {
    if (doc.exists) {
      toto =doc.data().nbjoueurs;
      const nbJoueurs = doc.data().nbjoueurs;
      console.log(nbJoueurs);  
      var codeHTML = '';
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

  firebase.firestore().collection('partie').doc(idgame).update({
    de: resultat
    })

    .then(() => {
        console.log("Le champ 'nbjoueurs' a été mis à jour avec succès !");
    })
    .catch((error) => {
        console.error("Erreur lors de la mise à jour du champ 'nbjoueurs' : ", error);
    });

  de.src = "../assets/images/de" + resultat + ".png";
}
  window.onload = updateValeur;
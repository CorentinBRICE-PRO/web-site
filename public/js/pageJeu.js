
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
      toto = doc.data().nbjoueurs;
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


let container = document.querySelector(".container");
let btn = document.getElementById("spin");
let arrow = document.querySelector(".arrow");
let colors = ['rgb(63, 81, 181)', 'rgb(255, 152, 0)', 'rgb(233, 30, 99)', 'rgb(76, 175, 80)', 'rgb(0, 150, 136)', 'rgb(121, 85, 72)', 'rgb(156, 39, 176)', 'rgb(244, 67, 54)'];
let winningColor = "";

btn.onclick = function() {
  // Choisir une couleur aléatoire
  let randomIndex = Math.floor(Math.random() * colors.length);
  winningColor = colors[randomIndex];

  // Tourner la roue jusqu'à ce que la couleur gagnante pointe vers le haut
  let currentRotation = getCurrentRotation(container);
  let rotation = 382 - (randomIndex * 45 + 22.5) - currentRotation % 360;
  let rotationStr = "rotate(" + (currentRotation + rotation) + "deg)";
  container.style.transform = rotationStr;
  arrow.style.transform = "rotate(" + rotation + "deg)";

  // Afficher la couleur gagnante dans la console
  console.log("Couleur gagnante : " + winningColor);
};

// Fonction pour récupérer l'angle de rotation actuel de la roue
function getCurrentRotation(el) {
  var st = window.getComputedStyle(el, null);
  var tr = st.getPropertyValue("-webkit-transform") ||
           st.getPropertyValue("-moz-transform") ||
           st.getPropertyValue("-ms-transform") ||
           st.getPropertyValue("-o-transform") ||
           st.getPropertyValue("transform") ||
           "none";
  if (tr !== "none") {
    var values = tr.split("(")[1].split(")")[0].split(",");
    var a = values[0];
    var b = values[1];
    var radians = Math.atan2(b, a);
    if (radians < 0) {
      radians += (2 * Math.PI);
    }
    var angle = Math.round(radians * (180 / Math.PI));
  } else {
    var angle = 0;
  }
  return angle;
}


  //window.onload = updateValeur;
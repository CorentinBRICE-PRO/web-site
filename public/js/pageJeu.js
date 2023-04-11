
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



firebase.firestore().collection('partie').doc(idgame).get()
  .then((doc) => {
    if (doc.exists) {
      const nbJoueurs = doc.data().nbjoueurs;
      const promises = []; // Tableau de promesses pour attendre que toutes les promesses d'accès à la BD soient résolues
      const joueursHTML = []; // Tableau pour stocker le code HTML généré pour chaque joueur

      // Parcourir tous les joueurs de la partie chargée
      for (let i = 1; i <= nbJoueurs; i++) {
        const joueurRef = doc.ref.collection('Joueurs').doc(`Joueur${i}`);

        // Ajouter la promesse d'accès à la BD au tableau de promesses
        promises.push(joueurRef.get().then((joueurDoc) => {
          if (joueurDoc.exists) {
            const couleur1 = joueurDoc.data().bleu || false;
            const couleur2 = joueurDoc.data().rouge || false;
            const couleur3 = joueurDoc.data().vert || false;
            const couleur4 = joueurDoc.data().jaune || false;
            const couleur5 = joueurDoc.data().violet || false;
            const couleur6 = joueurDoc.data().orange || false;
           // const nom = joueurDoc.data().nom;

            // Ajouter le code HTML généré pour chaque joueur dans le tableau joueursHTML
            joueursHTML[i - 1] = `
              <div class="rectangle">
                <span>Joueur${i}</span>
                <div class="camenbert">
                  <div class="part part-1" style="background-color: ${couleur1 ? 'blue' : 'black'};"></div>
                  <div class="part part-2" style="background-color: ${couleur2 ? 'red' : 'black'};"></div>
                  <div class="part part-3" style="background-color: ${couleur3 ? 'green' : 'black'};"></div>
                  <div class="part part-4" style="background-color: ${couleur4 ? 'yellow' : 'black'};"></div>
                  <div class="part part-5" style="background-color: ${couleur5 ? 'purple' : 'black'};"></div>
                  <div class="part part-6" style="background-color: ${couleur6 ? 'orange' : 'black'};"></div>
                  <div class="line line1"></div>
                  <div class="line line2"></div>
                  <div class="line line3"></div>
                </div>
              </div>
            `;
          } else {
            console.log(`Le document Joueur${i} n'existe pas.`);
          }
        }));
      }

      // Attendre que toutes les promesses d'accès à la BD soient résolues avant d'ajouter le code HTML généré au document HTML
      Promise.all(promises).then(() => {
        // Ajouter le code HTML généré pour tous les joueurs au document HTML
        document.getElementById('joueurs-container').innerHTML = joueursHTML.join('');
      });
    }
  });



// Insérer le code HTML dans la page jeu

   

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


let colors = ['bleu', 'orange', 'rose', 'vert', 'cyan)', 'marron', 'violet', 'rouge'];

let container = document.querySelector(".container");
let arrow = document.querySelector(".arrow");
let btn = document.getElementById("spin");
let winningColor;

let currentRotation = 0; // stocke l'angle de rotation actuel

btn.onclick = function() {
  // Choisir une couleur aléatoire
  let randomIndex = Math.floor(Math.random() * colors.length);
  winningColor = colors[randomIndex];

  // Calculer l'angle de rotation pour faire pointer la couleur gagnante vers le haut
  let rotation = 720+382 - (randomIndex * 45 + 22.5) - currentRotation % 360;

  // Ajouter le nouvel angle à l'angle de rotation actuel
  currentRotation += rotation;

  // Mettre à jour l'attribut "style" de la roue
  container.style.transform = "rotate(" + currentRotation + "deg)";
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
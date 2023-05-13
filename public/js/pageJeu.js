
// Création d'un objet URLSearchParams contenant les paramètres de l'URL actuelle pour la récupération
//  de la valeur du paramètre "valeur" dans l'URL qui correspond au nombre de joueur
var urlParams = new URLSearchParams(window.location.search);
var idgame = urlParams.get("valeur");
var couleurEncours = "undefined"

let randomNum = Math.floor(Math.random() * 15) + 1;



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
      



// Initialisation de Firebase
firebase.initializeApp(firebaseConfig);

let tourdejouer;

// Fonction pour initialiser la variable
function getTourDeJouer() {
  return firebase.database().ref(`partie/${idgame}/tour`).once('value')
    .then(snapshot => {
      tourdejouer = snapshot.val();
    })
    .catch(error => {
      console.error('Erreur lors de la récupération du tour de jouer :', error);
    });
}

// Appel de la fonction pour initialiser la variable
getTourDeJouer();



let colors = ['bleu', 'orange', 'rose', 'vert', 'jaune', 'marron', 'violet', 'rouge'];

let container = document.querySelector(".container");
let btn = document.getElementById("spin");
let winningColor;

let currentRotation = 0; // stocke l'angle de rotation actuel
if (couleurEncours=="undefined") {
  document.getElementById('message').textContent= "Veuillez tourner la roue !\n \n"
}

btn.onclick = function() {
  document.getElementById("spin").disabled = true;

  // Choisir une couleur aléatoire
  let randomIndex = Math.floor(Math.random() * colors.length);
  winningColor = colors[randomIndex];

  // Calculer l'angle de rotation pour faire pointer la couleur gagnante vers le haut
  let rotation = 1080+382 - (randomIndex * 45 + 22.5) - currentRotation % 360;

  // Ajouter le nouvel angle à l'angle de rotation actuel
  currentRotation += rotation;

  // Mettre à jour l'attribut "style" de la roue
  container.style.transform = "rotate(" + currentRotation + "deg)";

  // Afficher la couleur gagnante dans la console
  console.log("Couleur gagnante : " + winningColor);

  setTimeout(
    function(){
    alert("Couleur gagnante : " + winningColor);


couleurEncours =  winningColor
console.log("fghbhnbn : ",couleurEncours)

if (couleurEncours==="rose") {
  alert("Retournes la roue !"); 
  document.getElementById("spin").disabled = false;
} 
if (couleurEncours==="marron") {
 
  aquiletour(); 
  alert("Saute ton tour XD "); 
  location.reload();
} 
else {
  firebase.database().ref(`question/${couleurEncours}/q${randomNum}`).on('value', (snapshot) => {
  const question = snapshot.val().question;
  document.getElementById('message').textContent = question;
}, (error) => {
  console.log("Erreur lors de la lecture du document :", error);
})
}

  }, 5000);
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

function aquiletour() {
  document.getElementById("spin").disabled = false;

  const ref = firebase.database().ref(`partie/${idgame}/tour`);
  const nbrJoueursRef = firebase.database().ref(`partie/${idgame}/nbrjoueurs`);
  let nbrJoueurs;
  nbrJoueursRef.once("value", function(snapshot) {
    nbrJoueurs = snapshot.val();
  });
  return ref.transaction(function(currentValue) {
    let newValue = (currentValue || 0) + 1;
    if (newValue > nbrJoueurs) {
      newValue = 1;
    }
    return newValue;
  }).then(function(transactionResult) {
    return transactionResult.snapshot.val(); // renvoie la nouvelle valeur de "tour"
  }).catch(function(error) {
    console.error('Erreur lors de l\'incrémentation de la valeur de "tour" :', error);
  });
}







//Verifie que la reponse saisie est la meme que celle de la question dans la bd
function verifierReponse() {

  var repsaisie = document.getElementById("validationReponse").value.trim().toLowerCase();
  firebase.database().ref(`question/${couleurEncours}/q${randomNum}/rep`).once('value', function(snapshot) {
    var reponse = snapshot.val().toLowerCase();
    if (repsaisie.includes(reponse)) {
      console.log("La réponse est vraie");
      alert("Bonne réponse !");
      aquiletour();
      
      console.log("Joueur",tourdejouer);
      mettreAJourCouleurJoueur(idgame,tourdejouer, couleurEncours);
    
    } 
    else {
      
      console.log("La réponse est fausse");
      aquiletour();
      alert("Mauvaise réponse !");
      location.reload();
     
    }
  }, function(error) {
    console.error("Erreur lors de la récupération de la réponse : ", error);
  });
}


function retourMenu() {
  // Rediriger l'utilisateur vers la page du menu
  window.location.href = "../index.html";
}





function mettreAJourCouleurJoueur(idgame, joueurEnCours, couleur) {
  const db = firebase.database();
  const partieRef = db.ref("partie/" + idgame);
  // Récupérer les informations de la partie
  partieRef.once("value", (snapshot) => {
    if (snapshot.exists()) {
      const joueursRef = partieRef.child("Joueurs");

      // Vérifier si c'est le tour du joueur en question
      
        // Mettre à jour le champ "couleur" pour le joueur en question
        const joueurRef = joueursRef.child("Joueur" + joueurEnCours);
        joueurRef.update({ [couleur]: true })
          .then(() => {
            console.log(`Le champ 'couleur' a été mis à jour pour le joueur ${joueurEnCours} avec succès !`);
            location.reload();
          })
          .catch((error) => {
            console.error(`Erreur lors de la mise à jour du champ 'couleur' pour le joueur ${joueurEnCours}:`, error);
          });
     
    } else {
      console.error(`La partie '${idgame}' n'existe pas !`);
    }
  }, (error) => {
    console.error("Erreur lors de la récupération de la partie:", error);
  });
}

function verifieGagnant(){
  firebase.database().ref(`partie/${idgame}`).once('value')
  .then((snapshot) => {
    const nbJoueurs = snapshot.child('nbrjoueurs').val();
    console.log("nbjoueurs : ", nbJoueurs)

    // Parcourir tous les joueurs de la partie chargée
    for (let i = 1; i <= nbJoueurs; i++) {
      const joueurRef = snapshot.ref.child(`Joueurs/Joueur${i}`);
      joueurRef.once('value', (joueurSnapshot) => {
        if (joueurSnapshot.child('bleu').val() === true &&
        joueurSnapshot.child('jaune').val() === true &&
        joueurSnapshot.child('rouge').val() === true &&
        joueurSnapshot.child('orange').val() === true &&
        joueurSnapshot.child('vert').val() === true &&
        joueurSnapshot.child('violet').val() === true) {
          console.log(`Joueur${i} a gagné`);
        } else {
          console.log(`Joueur${i} n'a pas encore gagné`);
        }
      });
    }
  });

}
verifieGagnant();

firebase.database().ref(`partie/${idgame}`).once('value')
  .then((snapshot) => {
    const nbJoueurs = snapshot.child('nbrjoueurs').val();
    console.log("nbjoueurs : ", nbJoueurs)
    const aquiletour = snapshot.child('tour').val();

    const promises = []; // Tableau de promesses pour attendre que toutes les promesses d'accès à la BD soient résolues
    const joueursHTML = []; // Tableau pour stocker le code HTML généré pour chaque joueur

    // Parcourir tous les joueurs de la partie chargée
    for (let i = 1; i <= nbJoueurs; i++) {
      const joueurRef = snapshot.ref.child(`Joueurs/Joueur${i}`);
             const couleur = aquiletour === i ? 'red' : 'black';
      console.log("a qui le tour et couleur ",couleur,aquiletour)
      // Ajouter la promesse d'accès à la BD au tableau de promesses
      promises.push(joueurRef.once('value').then((joueurSnapshot) => {
        if (joueurSnapshot.exists()) {
   
          const couleur1 = joueurSnapshot.child('bleu').val() || false;
          const couleur2 = joueurSnapshot.child('rouge').val() || false;
          const couleur3 = joueurSnapshot.child('vert').val() || false;
          const couleur4 = joueurSnapshot.child('jaune').val() || false;
          const couleur5 = joueurSnapshot.child('violet').val() || false;
          const couleur6 = joueurSnapshot.child('orange').val() || false;
          // const nom = joueurSnapshot.child('nom').val();

          // Ajouter le code HTML généré pour chaque joueur dans le tableau joueursHTML
          joueursHTML[i - 1] = `
            <div class="rectangle" style="border-color: ${couleur};">
              <span>Joueur${i}</span>
              <div class="camenbert">
                <div class="part part-1" style="background-color: ${couleur1 ? 'blue' : 'white'};"></div>
                <div class="part part-2" style="background-color: ${couleur2 ? 'red' : 'white'};"></div>
                <div class="part part-3" style="background-color: ${couleur3 ? 'green' : 'white'};"></div>
                <div class="part part-4" style="background-color: ${couleur4 ? 'yellow' : 'white'};"></div>
                <div class="part part-5" style="background-color: ${couleur5 ? 'purple' : 'white'};"></div>
                <div class="part part-6" style="background-color: ${couleur6 ? 'orange' : 'white'};"></div>
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
  });
 

  function retourRegle() {

    window.location.href = "../html/regle.html?valeur=" + idgame;
  
  }




  //window.onload = updateValeur;
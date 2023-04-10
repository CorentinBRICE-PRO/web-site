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

var urlParams = new URLSearchParams(window.location.search);
var pseudo = urlParams.get("valeur");
document.getElementById("compte").textContent = pseudo;
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
page.innerHTML = "Il n'existe pas de partie";
firebase.firestore().collection("partie").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if (doc.exists && doc.id == idGamePlayer) {
            console.log("Une partie existe déja");
            page.innerHTML = "Il existe déja une partie";
        }
    });
});

function logPartie() {
    console.log("Clicking" + idGamePlayer);
    window.location.href = "../html/pageJeu.html?valeur=admin";
}

function signUp() {

    var Pseudo = document.getElementById("Pseudo").value;
    var Email = document.getElementById("email-signup").value;
    var MotDePasse = document.getElementById("mdp-signup").value;

    const auth = new Promise((resolve, reject) => {
        firebase.auth()
        .createUserWithEmailAndPassword(Email, MotDePasse)
        .then((user) => {
            firebase.firestore().collection("Login").doc(user.user.uid).set({
                email: Email,
                pseudo: Pseudo,
                idgame : generationIdgameAleatoire(),
            })
            firebase.firestore().collection("Login").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.exists && doc.id == user.user.uid) {
                        localStorage.setItem("uid", user.user.uid);
                        alert("Compte créer avec succés !");
                        resolve();
                    }
                })
            })
        })
        .catch((error) => {
            alert(error.message);
            reject(error);
        });
    })
    
    auth.then(res => {
        //console.log("passed");
        window.location.href = "../html/Compte.html";
    }).catch(err => {
        console.log(err);
    })
}   

function logIn() {

    var Email = document.getElementById("email-login").value;
    var MotDePasse = document.getElementById("mdp-login").value;

    // Utiliser DOMPurify pour nettoyer la valeur de Email/Motdepasse
    Email = DOMPurify.sanitize(Email);
    MotDePasse = DOMPurify.sanitize(MotDePasse); 
    
    firebase.auth().signInWithEmailAndPassword(Email, MotDePasse)
    .then((user) => {
        firebase.firestore().collection("Login").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.exists) {
                    console.log("Logging in : ", user.user.uid)
                    window.sessionStorage.setItem("uid", user.user.uid)
                    window.location.href = "../html/Compte.html";
                }
            })
        })
    })
    .catch((error) => {
        alert(error.message);
    });
    
}

// Genere un id de game aleatire de 7 caracteres 
function generationIdgameAleatoire() {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 7; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
}
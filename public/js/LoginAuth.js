
function signUp() {

    var Pseudo = document.getElementById("Pseudo").value;
    var Email = document.getElementById("email-signup").value;
    var MotDePasse = document.getElementById("mdp-signup").value;
    var uid;

    firebase.auth()
      .createUserWithEmailAndPassword(Email, MotDePasse)
      .then(function(data){
        console.log('uid',data.user.uid);
        uid = data.user.uid;
      })
      .catch((error) => {
        alert(error.message)
    });

    var docref = firebase.firestore().collection("Login").doc(uid);
        docref.get().then(() => {
            firebase.firestore().collection("Login").doc(uid).set({
                pseudo: Pseudo,
                idgame : generationIdgameAleatoire(),
            })
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
var urlParams = new URLSearchParams(window.location.search);
var idgame = urlParams.get("valeur");

console.log(idgame)

function retourJeu() {

    if (idgame==null) {
        window.location.href = "../index.html";
    }
    else{
        window.location.href = "../html/pageJeu.html?valeur=" + idgame;
    } 
  
  }

  function bonus() {

    window.location.href = "../404.html?valeur=" + idgame;

    
  
  }
//recuperation des elements DOM
let searchField = document.querySelector("#searchField");
let validButton = document.querySelector("#validButton");
let container = document.querySelector("#container");

//definition de l'url
let urlBegin = "https://api.openweathermap.org/data/2.5/forecast?q=";
let urlEnd = "&appid=d369243013c321b6942af0b2d4fd8b65";


function search(){
    //la ville est ce qui est entré dans searchField
    let city = searchField.value;
    //groupement des parties de l'url
    let url = urlBegin + city + urlEnd;
        console.log(urlBegin);
        console.log(urlEnd);
        console.log(url)
     //a l'url on fait un fetch 
     fetch(url)
     //si on a une reponse on la retourne en .json
     .then (function(response){
         if(response.ok) {
             return response.json();          
         }
     })
     .then(function(value){
        console.log(value)
        
     })
     //on retourne une erreur en console si pb
     .catch(function(error){
        console.log(error);
    })
}


//EVENTS
validButton.addEventListener("click", search);
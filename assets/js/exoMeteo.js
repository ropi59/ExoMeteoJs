//recuperation des elements DOM
let searchField = document.querySelector("#searchField");
let validButton = document.querySelector("#validButton");
let container = document.querySelector("#container");

//definition de l'url
let urlBegin = "https://api.openweathermap.org/data/2.5/forecast?q=";
let urlEnd = "&units=metric&lang=fr&appid=d369243013c321b6942af0b2d4fd8b65";

//definition de l'url de icon
let iconUrlBegin = "http://openweathermap.org/img/wn/";
let iconUrlEnd = "@2x.png";


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
     .then((present))
        
     .then(weather)
  
     //on retourne une erreur en console si pb
     .catch(function(error){
        console.log(error);
    })
}

//bloc de presentation de la ville
function present (value){
    //creation du bloc de présentation
    let presentation = document.createElement("div");
    presentation.setAttribute("id", "presentation");
    descriptionContainer.appendChild(presentation);
    //ajout de la ville et du pays
        let city = document.createElement("p");
        city.setAttribute("id", "city");
        city.innerText = value.city.name + ", " + value.city.country;
        presentation.append(city);
        //ajout de la population
            let pop = document.createElement("p");
            pop.setAttribute("id", "pop");
            pop.innerText = "Population : " + value.city.population + " hab.";
            presentation.append(pop);
            //ajout de la latitude et de la longitude
                let lat = document.createElement("p");
                lat.setAttribute("id", "lat");
                lat.innerText = "Latitude : " + value.city.coord.lat;
                presentation.append(lat);
                let lon = document.createElement("p");
                lon.setAttribute("id", "lon");
                lon.innerText = "Longitude : " + value.city.coord.lon;
                presentation.append(lon);
                return value;
    }

//blocs de details de la météo
function weather (value){
    console.log(value)
    //boucle pour parcourir la list des temperatures
    for (let i = 0 ; i < value.list.length; i++){
        //creation du bloc de detail
        let details = document.createElement("div");
        details.setAttribute("id", "details");
        container.appendChild(details);
            //ajout de la date et heure
            let date = document.createElement("p");
            date.setAttribute("id", "date");

            //fonction date
            let day = value.list[i].dt_txt.split(" ");
            let dayString = day[0].toString();
            let daySeparate = dayString.split("-");
            let prepareDate = daySeparate.toString();
            let dateToFormat = new Date(prepareDate);
            let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
            date.innerText = new Intl.DateTimeFormat("fr-FR", options).format(dateToFormat);
            details.append(date)
            
                //ajout de la temperature min et max
                let tempMoy = document.createElement("p");
                tempMoy.setAttribute("id", "tempMoy");
                //affichage de la temperature arrondie
                tempMoy.innerText = "    Min : " + Math.round(value.list[i].main.temp_min) + "°C"
                + "    Max : " + Math.round(value.list[i].main.temp_max) + "°C";
                details.append(tempMoy);
                    //ajout de la temperature 
                    let temp = document.createElement("p");
                    temp.setAttribute("id", "temp");
                    //affichage de la temperature arrondie
                    temp.innerText = Math.round(value.list[i].main.temp) + "°C" 
                    details.append(temp);
                        //ajout de l'icone
                        //recuperation de l'id de l'icon
                        let iconId = value.list[i].weather[0].icon;
                        //creation de l'url de l'icone
                        let iconUrl = iconUrlBegin + iconId + iconUrlEnd;
                        let icone = document.createElement("img");
                        icone.setAttribute("id", "icone");
                        icone.setAttribute("src", iconUrl);
                        details.append(icone);
                            //ajout des conditions météos
                            let condition = document.createElement("p");
                            condition.setAttribute("id", "condition");
                            condition.innerText = value.list[i].weather[0].description;
                            details.append(condition);                  
    }
}

function dateFormat(){
    
    let day = value.list[i].dt_txt.split(" ");
    let dayString = day[0].toString();
    let daySeparate = dayString.split("-");
    let prepareDate = daySeparate.toString();
    let dateToFormat = new Date(prepareDate);
    let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
    new Intl.DateTimeFormat("fr-FR", options).format(dateToFormat);
}

//EVENTS
validButton.addEventListener("click", search);
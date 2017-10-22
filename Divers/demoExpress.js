'use strict'; 
const path = require('path');
//Permet de ne pas utiliser de route supplémentaire par vue 

const express = require('express');
const app = express(); 
const port = process.env.PORT || 3000;
//CLI : env | grep PORT


app.get('/', (req, res, next) => {
    res.send('Hello lololololo'); // Inclus un res.end() à la fois contrairement à un simple console.log qui fait mouliner le navigateur
    console.log('Hello depuis demoexpress'); 
    res.end();
});


app.listen(port,  () => {
    console.log(`Start listening at ${port}`);
});






'use strict'; 
const path = require('path');
//Permet de ne pas utiliser de route supplémentaire par vue 

const express = require('express');
const app = express(); 
const port = process.env.PORT || 3000;
//CLI : env | grep PORT

const bodyparser = require('body-parser');



let catNames= [];
app.get('/', (req, res, next) => {
    res.send('Hello lololololo'); // Inclus un res.end() à la fois contrairement à un simple console.log qui fait mouliner le navigateur
    console.log('Hello depuis demoExpress') 
    res.end();
});

// app.get('/test', (req, res, next) => {
//     res.send('on est sur le /test');https://html-honayme.c9users.io/test/thomas
//     console.log('La réponse est envoyé sur insomnian le consol sur le serv') 
//     res.end();
// });

// app.get('/', (req, res, next) => {
//   // getAllPizza(req, res, next);
//   res.send("Benvenuti à la pizza factory");
//   console.log('On est dans la route des pizzas');
//   res.end();
// });


app.get('/test/:name', (req, res, next) => {
    res.send(`Bienvenue  ${req.params.name} vous êtes en Get`);
    res.end();
});

// app.get('/test/:name', (req, res, next) => {
//     console.log(`Test ${req.params.name}`);
//     res.send('Test');
// });

//PUT pour modifier uniquement, POST pour créer


app.post('/ville', (req, res, next) => {
    console.log(req.body);
    // res.send(`Bienvenue  ${req.body.city} body city`);
    // res.send(`Bienvenue  ${req.query.city} query`);
    // console.log(`Bienvenue  ${(req.query.city)} query`);
    console.log(`Bienvenue  ${(req.body.city)} <= votre ville`);
    // console.log(`Bienvenue  ${(req.params.city)} params`);
    res.end();
    //On utilisera Insomnia plutôt que le restMan de Opera qui fail
});
// app.put();
// app.delete();

app.post('/chat', (req, res, next) => { //SI on appel deux fois la même route il chie des bulles
    console.log(`Votre chat est ${req.body.catName}`);
    catNames.push(req.body.catName);
    res.json(catNames);//Même chose que res.send mais renvoie du Json
    res.end();
});

app.get('/chat', (req, res, next) => { 
    res.json(catNames);
});

app.delete('/', (req, res, next) => { //SI on appel deux fois la même route il chie des bulles
    catNames.splice(catNames.findIndex(getIndexDeleteCat, req.body.catName), 1);
    res.end();
});

//La fonction pour que le delete soit plus clair
function getIndexDeleteCat (catName){
    console.log(`catName: ${catNames}, catNameToRemove: ${this}`);
    console.log(`${catNames}`);
    return catName === this; 
}



app.put('/', (req, res, next) => {
    updateCatName(req.body.nameToUpdate, req.body.newName, () => {
        res.end();
    });
});


function updateCatName(nameToUpdate, newName, callback){
  let index = catNames.indexOf(nameToUpdate);
  catNames[index] = newName;
  callback();
}



app.listen(port,  () => {
    console.log(`Start listening at ${port}`);
});





/*------------/
/  CONSIGNES  /
/------------*/
//Les deux console.log vont être affichés après le Start Listening car il sont appelés une fois
//que la requête est effectué et a renvoyé la réponse avec son callback 
//C'est en attendant que le callback soit exécuté que les console.log sont affichés. 



//Page qui liste les Pizzas (index)
//Possibilité de mettre à jour un pizza ou de la créer 
//JWT pour création de pizza pour certifier qu'on est apte à faire cette création à l'aide du TOKEN JWT


//Faire tous le projet dans Cloud9 et le faire dans GitHub (porjet des 3 cours)
//Mettre un gitignore sur le node_modules
//Mettre sur Cloud 9 le back

//nvm install 8 (concaténation possible pour voir les plus haute monté de version)
//nvm alias default 8 pour que la version soit utilisé, la télécharger ne suffit pas.  

//Version  6 suffisante mais tant qu'à faire utiliser la version  8

//npm install body-parser --save (require en début de fichier comme pour tout les modules)
//Permet de récupérer les données dans le callback fait sur un POST 
//UTILISATION DE RESTMAN SUR OPERA 


//INSTALLATION MONGODB 
//Installation mongoDB sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
//sudo apt-get update
//sudo apt-get install mongodb-org

//Voir le fichier mongod

//sudo chmod +x mongod

//SGBD Compass interface graphique pour mongoDB
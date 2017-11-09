'use strict'; 
const path = require('path');
//Permet de ne pas utiliser de route supplémentaire par vue 

const express = require('express');
const app = express(); 
const port = process.env.PORT || 3000;
//CLI : env | grep PORT

const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'View', 'toto')));

let catNames= [];
app.get('/', (req, res, next) => {
    res.send('Hello lololololo'); // Inclus un res.end() à la fois contrairement à un simple console.log qui fait mouliner le navigateur

    console.log('Hello') 
    res.end();

});

app.get('/test', (req, res, next) => {
    res.send('on est sur le /test');https://html-honayme.c9users.io/test/thomas
    console.log('La réponse est envoyé sur insomnian le consol sur le serv') 
    res.end();
});

app.get('/', (req, res, next) => {
  // getAllPizza(req, res, next);
  res.send("Benvenuti à la pizza factory");
  console.log('On est dans la route des pizzas');
  res.end();
});


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



// app.listen(port,  () => {
//     console.log(`Start listening at ${port}`);
// });




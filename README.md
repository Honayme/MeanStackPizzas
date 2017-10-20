


 _______ _________ _______  _______  _______ 
        (  ____ )\__   __// ___   )/ ___   )(  ___  )
        | (    )|   ) (   \/   )  |\/   )  || (   ) |
        | (____)|   | |       /   )    /   )| (___) |
        |  _____)   | |      /   /    /   / |  ___  |
        | (         | |     /   /    /   /  | (   ) |
        | )      ___) (___ /   (_/\ /   (_/\| )   ( |
        |/       \_______/(_______/(_______/|/     \|
                                                     
         _______  _______  _______ _________ _______  _______          
        (  ____ \(  ___  )(  ____ \\__   __/(  ___  )(  ____ )|\     /|
        | (    \/| (   ) || (    \/   ) (   | (   ) || (    )|( \   / )
        | (__    | (___) || |         | |   | |   | || (____)| \ (_) / 
        |  __)   |  ___  || |         | |   | |   | ||     __)  \   /  
        | (      | (   ) || |         | |   | |   | || (\ (      ) (   
        | )      | )   ( || (____/\   | |   | (___) || ) \ \__   | |   
        |/       |/     \|(_______/   )_(   (_______)|/   \__/   \_/   
    ----------------------------------------------------------------- 



# Support & Documentation

# MeanStackPizzas
PizzasFactory the real taste

VM Jeremy https://c9.io/youngjeremy

# Configuration environnement 

    sudo apt-get update
    sudo apt-get install mongdb-org 

Créer le fichier package.json qui va incorporer toutes nos dépendances

    npm init

## Configurer Express

    npm install express --save

    npm install body-parser --save

Le body parser permet d'envoyer des données en POST.

## Configurer Mongo sur C9

    mkdir data

    echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod

    chmod a+x mongod

### Lancer Mongo

    ./mongod 

Dans un autre terminal faire: 

    mongo 

### Interface SGBD Admin Mongo

1.

        git clone https://github.com/mrvautin/adminMongo.git

2.

        cd adminMongo
    
        npm i 
    
3. 
    Dans "adminMongo/config/appjson"
    
        {
            "app": {
                "port": 8081
            }
        }
    
4.

        node app.js
        
5.
    Dans la config rajouter en Host 
    
    >mongodb://{host} 
    
         mongodb://honayme-meanstackpizzasfactory-5551169
    

## Installation Test Unitaire

En dev-dependency make : 

    npm i -D mocha

    npm i -D chai 

Lancer les tests

    npm test 

Mettre un require du module assert en début de fichier Spec.js

>const {assert} = require('chai');

Dans le controller utiliser 

>module.exports {functionName}

Afin de pouvoir les tester dans le fichier Spec.js 

### Fonctionnalitées MOCHA

Ne lancer qu'un seul test en particulier:
>it.only(...) 

Ne pas lancer un test en particulier: 
>it.skip(...) 

Faire des groupes de tests pour plus de lisibilité:
>describe

Pour tester l'asyncrhone : 
>done()


Exemple :

    describe('testBasiques', () => {
        it.skip('should cal equal', () => {
            assert.strictEqual(1,1); 
        });
    
        it('should have a gender property', (done) => {
           demo.getAllObject('https://randomuser.me/api/', (returnStatusCode) => {
               assert.hasAnyKeys(returnStatusCode.results[0], ['gender']);
               done();
            });
        }); 
    });


## socket.io

    npm install socket.io --save

## ES6

    'use strict'

The purpose of "use strict" is to indicate that the code should be executed in "strict mode".

With strict mode, you can not, for example, use undeclared variables.

    
    
    

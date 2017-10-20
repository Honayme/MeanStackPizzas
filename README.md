


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


## Installation Test Unitaire

En dev-dependency make : 

    npm i -D mocha

    npm i -D chai 


Lancer les tests

    npm test 

Mettre un require du module assert en début de fichier Spec.js

>const {assert} = require('chai');

Dans le controller faire un 

    module.exports {functionName}

Afin de pouvoir les tester dans le fichier Spec.js 

## socket.io

    npm install socket.io --save

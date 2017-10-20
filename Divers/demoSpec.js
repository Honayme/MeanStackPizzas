'use strict'

/*assert API de node qui permet de tester unitairement.*/

const demo = require('./demo'); 
// npm i -D chai
const {assert} = require('chai');
//              ==
//const assert = require('chai').assert; 
const should = require('chai').should; 
const hasanyKeys = require('chai').hasanyKeys; 


//-------Fonctionnalitées MOCHA-------//
//Voir module Export dans le demo.js

//it.only(...) ne test que celui là, ou tout ceux qui sont en .only
//it.skip(...) n'est pas en test.
//describe, permet de regrouper les tests, simplement plus lisible

describe('testBasiques', () => {
    it('should cal equal', () => {
        assert.strictEqual(1,1); 
    });

    it('should print "Hello World"', () => {
        assert.strictEqual(demo.hey(), "Hello World"); 
    });
});


describe('testFonctions', () => {
    it('should add two numbers (5+8)', () => {
       assert.strictEqual(demo.add(5,8), 13, 'Bad Sum') ;
    });
});




describe('testAsync', () => {
    it.skip('should get url', (done) => {
       demo.getURLStatus('http://wwww.google.fr', (returnStatusCode) => {
           assert.strictEqual(returnStatusCode, 200);
           done();
       });
    });
    
    it.skip('should get 404', (done) => {
       demo.getURLStatus('http://wwww.google.fr/test', (returnStatusCode) => {
           assert.notStrictEqual(returnStatusCode, 404);
           done();
       });
    });    
});


describe('testAPI', () => {
    it('should render an object', (done) => {
       demo.getAllObject('https://randomuser.me/api/', (returnApiType) => {
            assert.isObject(returnApiType, 'API return an object');
            done();
       });
    });
    
    //Utiliser should avec la chaijs API 
    it('should have a gender property', (done) => {
       demo.getAllObject('https://randomuser.me/api/', (returnStatusCode) => {
           assert.hasAnyKeys(returnStatusCode.results[0], ['gender']);
           done();
        });
    });    
    
    
    it('should be contain all this property', (done) => {
        demo.getAllObject('https://randomuser.me/api/', (parsedData) => {
            let object = {"results":[{"gender":"female","name":{"title":"mrs","first":"antonieta","last":"ferreira"},"location":{"street":"4665 rua paraíba ","city":"santa maria","state":"paraná","postcode":53448},"email":"antonieta.ferreira@example.com","login":{"username":"silverbird764","password":"normal","salt":"73oUcZ3N","md5":"81862bbc55d565dce076950053f54b8e","sha1":"33a7644ee933ee04fa38b6a7f5d8400356fc5979","sha256":"3b71214a8c372b5932d66eccb1207cb9948f6ca908efa98986c583eb814ce198"},"dob":"1949-03-09 19:11:20","registered":"2005-05-18 18:25:53","phone":"(44) 4928-4751","cell":"(93) 6483-3465","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/women/46.jpg","medium":"https://randomuser.me/api/portraits/med/women/46.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/46.jpg"},"nat":"BR"}],"info":{"seed":"029cd49b0aa5b948","results":1,"page":1,"version":"1.1"}};
            assert.hasAllDeepKeys(parsedData, object);
            done();
        });
    });
});



/*-------------------------------------------------------------------------/
/npm test fail =>                                                          /
/https://stackoverflow.com/questions/17690803/node-js-getaddrinfo-enotfound/
/-------------------------------------------------------------------------*/

//'done' spécifique pour faire des tests asynchrones, 
//ça permet de s'assurer que l'opération asynchrone soit terminé et renvoie bien 
//un résultat pour pouvoir effectuer le test unitaire. 
//Si on ne le met pas, la tâche asynchrone (içi http get)  
//fait qu'il passe au test suivant sans afficher le résultat du test unitaire. 
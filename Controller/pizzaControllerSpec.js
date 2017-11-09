// // process.env.NODE_ENV = 'test'; 

// const myUri      = process.env.URI  || 'mongodb://honayme-meanstackpizzasfactory-5551169',
//       mongoose   = require('mongoose'),
//       pizzaController = require('./pizzaController'),
//       pizzaSchema     = require('../Modele/pizzaSchema'),
//       {assert} = require('chai'),
//       should = require('chai').should,
//       hasanyKeys = require('chai').hasanyKeys; 
      
      
      
      
// describe('testAPI', () => {
//     it('should render an object', (done) => {
//       pizzaController.getPizzas('https://ide.c9.io/honayme/meanstackpizzasfactory/', (returnApiType) => {
//             assert.isObject(returnApiType, 'API return an object');
//             done();
//       });
//     });
    
//     //Utiliser should avec la chaijs API 
//     it.skip('should have a gender property', (done) => {
//       pizzaController.getAllObject('https://randomuser.me/api/', (returnStatusCode) => {
//           assert.hasAnyKeys(returnStatusCode.results[0], ['gender']);
//           done();
//         });
//     });    
    
    
//     it.skip('should be contain all this property', (done) => {
//         pizzaController.getAllObject('https://randomuser.me/api/', (parsedData) => {
//             let object = {"results":[{"gender":"female","name":{"title":"mrs","first":"antonieta","last":"ferreira"},"location":{"street":"4665 rua paraíba ","city":"santa maria","state":"paraná","postcode":53448},"email":"antonieta.ferreira@example.com","login":{"username":"silverbird764","password":"normal","salt":"73oUcZ3N","md5":"81862bbc55d565dce076950053f54b8e","sha1":"33a7644ee933ee04fa38b6a7f5d8400356fc5979","sha256":"3b71214a8c372b5932d66eccb1207cb9948f6ca908efa98986c583eb814ce198"},"dob":"1949-03-09 19:11:20","registered":"2005-05-18 18:25:53","phone":"(44) 4928-4751","cell":"(93) 6483-3465","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/women/46.jpg","medium":"https://randomuser.me/api/portraits/med/women/46.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/46.jpg"},"nat":"BR"}],"info":{"seed":"029cd49b0aa5b948","results":1,"page":1,"version":"1.1"}};
//             assert.hasAllDeepKeys(parsedData, object);
//             done();
//         });
//     });
// });
   
      
      
// // describe('Post API', () => {
// //     let dummyPizza, id; 
    
// //     before((done) =>{
// //         mongoose.connect(myUri, err => {
// //           if(err){
// //             console.error(err);
// //             process.exit(1);
// //           }else{
// //             console.log('Connexion à Mongoose');
// //           }
// //           done();
// //         });

// //         dummyPizza = new pizzaSchema({
// //             'name' : 'Dummy',
// //             'desc' : 'Dummy description',
// //             'price' : 'Dummy price',
// //             'ingredient_ids' : ['DummyIdIngredients1', 'DummyIdIngredients2']
// //         });
    
// //         dummyPizza.save((err, pizza) =>{
// //             if(err){
// //                 console.log(err);
// //             }
// //             id = pizza._id;
// //         });
// //     });
        
// //     describe("Create Post", () =>{
// //         it("should create a new post", (done) => {
// //             let req = {
// //                 body{
// //                     'name' : 'name',
// //                     'desc' : 'desc',
// //                     'price' : 'price',
// //                     'ingredient_ids' : ['IdIngredients1', 'IdIngredients2']        
// //                 }
// //             };
            
// //             // let res = 
// //         });
// //     });   
    
    
    
// // });


// // // Mongoose
// // mongoose.connect(myUri, err => {
// //   if (err) {
// //     console.error(err);
// //     process.exit(1);
// //   }else{
// //     console.log('Connexion à Mongoose');
// //     }
// // });



// //Vérifier statut 200 
// //Document inchangé 302 
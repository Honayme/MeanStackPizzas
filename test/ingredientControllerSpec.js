//Met la variable d'environement à test permet de passer sur une base test
process.env.NODE_ENV = 'test'; 

const myUri         = 'mongodb://127.0.0.1/pizzaTest',
      mongoose      = require('mongoose'),
     
      server        = require('../server'),
      ingredientSchema   = require('../Model/ingredientSchema'),
      
      mocha         = require('mocha'),
      chai          = require('chai'),
      chaiHttp      = require('chai-http'),
      
      should        = chai.should(),
      hasanyKeys    = chai.hasanyKeys; 
      
      chai.use(chaiHttp);
      //https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
      
     
describe('Ingredient', () => {

    beforeEach((done) => {
      ingredientSchema.remove({}, () => {
          console.log('Clean collection');
          done();
      });
    });
     

    
    describe('Get All Ingredient', () => {
      it('it should GET all the ingredients', (done) => {
        chai.request(server)
            .get('/ingredient')
            .end((err, res) => {
            //   console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    // Object.keys(res.body).length.should.to.eql(0); // Le nombre de clef = à 0    
            done();
        });
      });
    });

    describe('Get Ingredient By Id', () => {
      it('it should GET a ingredient by the given id', (done) => {
        let ingredient = new ingredientSchema({ name: "olive", weight: "0.2Kg", price: 2855, pizza_ids: [] });
        ingredient.save((err, pizza) => {
            chai.request(server)
            .get('/ingredient/' + ingredient.id)
            .send(ingredient)
            .end((err, res) => {
                // console.log(res.body);
                // console.log(pizza.id);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('weight');
                res.body.should.have.property('price');
                res.body.should.have.property('pizza_ids');
                res.body.should.have.property('_id').eql(ingredient.id);
              done();
            });
        });

      });
    }); 

    describe('Create Ingredient', () => {
        it('it should not POST an ingredient without the missing property', (done) => {
            let ingredient = {
                name: "olives",
                weight: "0.1Kg",
                pizza_ids: []
            };
            chai.request(server)
                .post('/ingredient')
                .send(ingredient)
                .end((err, res) => {
                        // console.log(err);
                        console.log(res.body);
                        res.should.have.status(500);
                        res.body.should.be.a('object');
                        res.body.should.have.property('errors');
                        res.body.errors.should.have.property('price');
                        res.body.errors.price.should.have.property('kind').eql('required');    
                  done();
                });
        });
  
          
        it('it should POST an ingredient ', (done) => {
            let ingredient = {
                name: "olives",
                price : 152,
                weight: "0.1Kg",
                pizza_ids: []
            };
            chai.request(server)
            .post('/ingredient')
            .send(ingredient)
            .end((err, res) => {
                // console.log(res.body);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('price');
                res.body.should.have.property('weight');
                res.body.should.have.property('pizza_ids');
              done();
            });
        });
    });

         
          
describe('Update Ingredient', () => {
      it('it should UPDATE a ingredient', (done) => {
        let ingredient = new ingredientSchema({name: "Olive", weight: "0.1Kg", price: 855, pizza_ids: [] });
        ingredient.save((err, ingredient) => {
                chai.request(server)
                .put('/ingredient/' + ingredient.id)
                .send({name: "Olive Noire", price: 1000})
                .end((err, res) => {
                    // console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql("Olive Noire");
                    res.body.should.have.property('price').eql(1000);
                  done();
                });
          });
      });
  });          
          

  describe('Delete Ingredient', () => {
      it('it should DELETE a ingredient', (done) => {
        let ingredient = new ingredientSchema({name: "Olive", weight: "0.1Kg", price: 828, pizza_ids: [] });
        ingredient.save((err, ingredient) => {
                chai.request(server)
                .delete('/ingredient/' + ingredient.id)
                .end((err, res) => {
                    // console.log(res.body)
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id').eql(ingredient.id);
                  done();
                });
          });
      });
  });          
          
  });
    

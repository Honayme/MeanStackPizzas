//Met la variable d'environement à test permet de passer sur une base test
process.env.NODE_ENV = 'test'; 

const myUri         = 'mongodb://127.0.0.1/pizzaTest',
      mongoose      = require('mongoose'),
     
      server        = require('../server'),
      pizzaSchema   = require('../Model/pizzaSchema'),
      
      mocha         = require('mocha'),
      chai          = require('chai'),
      chaiHttp      = require('chai-http'),
      
      should        = chai.should(),
      hasanyKeys    = chai.hasanyKeys; 
      
      chai.use(chaiHttp);
      //https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
      
     
describe('Pizza', () => {

    beforeEach((done) => {
      pizzaSchema.remove({}, () => {
          console.log('Clean collection');
          done();
      });
    });
     
    
    
    
    describe('Get All Pizza', () => {
      it('it should GET all the pizzas', (done) => {
        chai.request(server)
            .get('/pizza')
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


    describe('Create Pizza', () => {
          it('it should not POST a pizza without the missing property', (done) => {
            let pizza = {
                // name: "test",
                desc: "Une pizza qu'elle fait plaisir",
                price: 2900,
                picture: "dfgdf",
                ingredient_ids: []
            };
            chai.request(server)
                .post('/pizza')
                .send(pizza)
                .end((err, res) => {
                        // console.log(err);
                        // console.log(res.body);
                        res.should.have.status(500);
                        res.body.should.be.a('object');
                        res.body.should.have.property('errors');
                        res.body.errors.should.have.property('name');
                        res.body.errors.name.should.have.property('kind').eql('required');    
                  done();
                });
          });
  
          
        it('it should POST a pizza ', (done) => {
            let pizza = {
                name: "PizzaMafiosi",
                desc: "Pizza Mafiosi",
                price: 2349,
                picture : "dfng",
                ingredient_ids: []
            };
            chai.request(server)
            .post('/pizza')
            .send(pizza)
            .end((err, res) => {
                // console.log(res.body);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('desc');
                res.body.should.have.property('price');
                res.body.should.have.property('picture');
                res.body.should.have.property('ingredient_ids');
              done();
            });
        });
    });


  describe('Get By Id', () => {
      it('it should GET a pizza by the given id', (done) => {
        let pizza = new pizzaSchema({ name: "calzone", desc: "pizza plié en deux", price: 1954, picture: "ggguyg",  ingredient_ids: [] });
        pizza.save((err, pizza) => {
            chai.request(server)
            .get('/pizza/' + pizza.id)
            .send(pizza)
            .end((err, res) => {
                // console.log(res.body);
                // console.log(pizza.id);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('desc');
                res.body.should.have.property('price');
                res.body.should.have.property('ingredient_ids');
                res.body.should.have.property('_id').eql(pizza.id);
              done();
            });
        });

      });
  });          
          
describe('Update pizza', () => {
      it('it should UPDATE a pizza', (done) => {
        let pizza = new pizzaSchema({name: "Pepperoni", desc: "Pizza avec plein de pepperoni", price: 855, picture: "ihbiu", ingredient_ids: [] });
        pizza.save((err, pizza) => {
                chai.request(server)
                .put('/pizza/' + pizza.id)
                .send({desc: "Pizza avec plein de pepperoni et du fromage", price: 1000})
                .end((err, res) => {
                    // console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('price').eql(1000);
                    res.body.should.have.property('desc').eql("Pizza avec plein de pepperoni et du fromage");
                  done();
                });
          });
      });
  });          
          

  describe('Delete Pizza', () => {
      it('it should DELETE a pizza', (done) => {
        let pizza = new pizzaSchema({name: "Pepperoni", desc: "Pizza avec plein de pepperoni", price: 855, picture: "ihbiu", ingredient_ids: [] });
        pizza.save((err, pizza) => {
                chai.request(server)
                .delete('/pizza/' + pizza.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('ok').eql(1);
                    res.body.should.have.property('n').eql(1);
                  done();
                });
          });
      });
  });          
          
  });
    
//Tester le modèle 
//Tester socket IO 
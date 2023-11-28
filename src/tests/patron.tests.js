// tests/patron.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Patrons', () => {
 
  describe('/GET patrons', () => {
    it('it should GET all the patrons', (done) => {
      chai.request(app)
        .get('/patrons')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
    beforeEach(async () => {
      
      await Patron.deleteMany({});
    });
  
   
    describe('/GET patrons', () => {
      it('it should GET all the patrons', (done) => {
        chai.request(app)
          .get('/patrons')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
      });
    });
  
    
    describe('/POST patron', () => {
      it('it should POST a patron', (done) => {
        const patron = {
          name: 'John Doe',
          contactDetails: 'john.doe@example.com',
        };
  
        chai.request(app)
          .post('/patrons')
          .send(patron)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql('John Doe');
            res.body.should.have.property('contactDetails').eql('john.doe@example.com');
            done();
          });
      });
    });
  
});



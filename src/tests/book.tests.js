// tests/book.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Books', () => {
  
  describe('/GET books', () => {
    it('it should GET all the books', (done) => {
      chai.request(app)
        .get('/books')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  
    beforeEach(async () => {
      // Clear the database before each test
      await Book.deleteMany({});
    });
  
    // Test the /GET route
    describe('/GET books', () => {
      it('it should GET all the books', (done) => {
        chai.request(app)
          .get('/books')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
      });
    });
  
    // Test the /POST route
    describe('/POST book', () => {
      it('it should POST a book', (done) => {
        const book = {
          title: 'Sample Book',
          author: 'John Doe',
          ISBN: '1234567890',
        };
  
        chai.request(app)
          .post('/books')
          .send(book)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title').eql('Sample Book');
            res.body.should.have.property('author').eql('John Doe');
            res.body.should.have.property('ISBN').eql('1234567890');
            done();
          });
      });
    });
})

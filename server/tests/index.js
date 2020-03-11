import chai from 'chai';
import chaiHttp from 'chai-http'
import testUser from './damyData/userData'
import app from '../index';

chai.should();

chai.use(chaiHttp);

describe('user tests', ()=> {
    it('user should get home page', (done) => {
        chai.request(app)
            .get('/api/v1/home')
            .send('Welcome to Politico platform')
            .end((err, res) =>{
                res.should.have.status(200);
                
            });
            done();
    });

    it('user should not create new account without email', (done) =>{
        chai.request(app)
             .post('/api/v1/auth/signUp')
             .send(testUser.newuser)
             .end((err,res) =>{
                 res.should.have.status(400);

             });
             done()

    })
    it('should not create user without data', (done) =>{
        chai.request(app)
        .post('/api/v1/auth/signUp')
        .send(testUser.emptyData)
        .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json
        })
        done();
    })

    it('should not work if database have problem', (done) => {
        chai.request(app)
        .post('/api/v1/auth/signUp')
        .send("database problem")
        .end((err, res) => {
            res.should.have.status(400)
        })
        done();

    });

    it('should not create user with exist email', (done) =>{
        chai.request(app)
        .post('/api/v1/auth/signUp')
        .send(testUser.newuser)
        .end((err, res) => {
            res.should.have.status(400)
        })
        done();
    });
  it ('should not create new account if there is error in jwt', (done)=>{
      chai.request(app)
         .post('/api/v1/auth/signUp')
         .send("error occured in creating token")
         .end((err, res)=>{
             res.should.have.status(400)
         })
         done();
  })
  it('should return error if there is error for inserting into database', (done) => {
      chai.request(app)
      .post('/api/v1/auth/signUp')
      .end((err, res) =>{
          res.should.have.status(400)
      })
      done();
  })

})

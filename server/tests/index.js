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
             .send(testUser.emptyData)
             .end((err,res) =>{
                 res.should.have.status(403);

             });
             done()
    })

})

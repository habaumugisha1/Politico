import chai from 'chai';
import chaiHttp from 'chai-http'
import testUser from './damyData/userData'
import app from '../index';

chai.should();

chai.use(chaiHttp);
let userToken;
const newParty ={
    name: "inkingi",
    hdAdress:"kigali/rwanda",
    logoUrl:"../UI/images/user.jpeg"
}

describe('Admin activities', () => {
    before((done) => {
        chai.request(app)
        .post('/api/v1/auth/login')
        .send({email:"habajeune1@gmail.com", password:"qwertyuiop"})
        .end((err, res) => {
            global.AuthUser = res.body.Data;
            console.log(userToken)
        });
        done();
    });

    describe('create party', () => {
        
        it(' should not create a new party if is not admin', (done) => {
            chai.request(app)
            .post('/api/v1/parties')
            .set('Athorization', `bearer ${global.AuthUser}`)
            .send(newParty)
            .end((err, res) => {
                res.should.have.status(401);
            });
            done();

        });

        it(' should not delete a party if is not admin', (done) => {
            chai.request(app)
            .post('/api/v1/parties')
            .set('Athorization', `bearer ${global.AuthUser}`)
            .send(newParty)
            .end((err, res) => {
                res.should.have.status(401);
            });
            done();

        })
    })
})
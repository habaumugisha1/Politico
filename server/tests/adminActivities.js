import chai from 'chai';
import chaiHttp from 'chai-http'
import testUser from './damyData/userData';
import adminController from '../controllers/adminController'
import app from '../index';

chai.should();

chai.use(chaiHttp);
let userToken;
const newOffice = {
    type: "local government",
    name:""
}
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

        });
        it(' should not register a office if you are not admin', (done) => {
            chai.request(app)
            .post('/api/v1/offices')
            .set('Athorization', `bearer ${global.AuthUser}`)
            .send(newOffice)
            .end((err, res) => {
                res.should.have.status(401);
            });
            done();

        });
        it(' should not register a office without token', (done) => {
            chai.request(app)
            .post('/api/v1/offices')
            .set('Athorization', `bearer ${global.AuthUser}`)
            .send(newOffice)
            .end((err, res) => {
                res.should.have.status(401);
            });
            done();

        });

        it(' should not find office when database has errors', (done) => {
            chai.request(app)
            .post('/api/v1/offices')
            .set('Athorization', `bearer ${global.AuthUser}`)
            .send({
                type: "this is the type",
                name: "this is the name",
                createdOn:new Date()
            })
            .end((err, res) => {
                res.should.have.status(401);
            });
            done();

        });

        it(' when office is found in database should return office is already registered', (done) => {
            chai.request(app)
            .post('/api/v1/offices')
            .set('Athorization', `bearer ${global.AuthUser}`)
            .end((err, res) => {
                res.should.have.status(401);
            });
            done();

        });

        it('when there is error in saving a new office return 400 error code status ', (done) => {
            chai.request(app)
            .post('/api/v1/offices')
            .set('Athorization', `bearer ${global.AuthUser}`)
            .send(newOffice)
            .end((err, res) => {
                res.should.have.status(401);
            });
            done();

        });

        it('when there is error occured return 400 error code status ', (done) => {
            chai.request(app)
            .post('/api/v1/offices')
            .set('Athorization', `bearer ${global.AuthUser}`)
            .send(newOffice)
            .end((err, res) => {
                res.should.have.status(401);
            });
            done();

        });
    })
})
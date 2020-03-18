import chai from 'chai';
import chaiHttp from 'chai-http'
import { before } from 'mocha';
import testUser from './damyData/userData';
import { pool } from '../models/db'
import adminController from '../controllers/adminController'
import app from '../index';

chai.should();

chai.use(chaiHttp);
let userToken;
const newOffice = {
    type: "local government",
    name:""
}

const candidate ={
    office: "2",
    party: "ubumwe", 
    candidate: "2", 
    careatedOn: "2020-03-13 08:04:03.381"
}
const fakeCandidate = {

}
const adminCredentials ={
    email:"habajeune1@gmail.com",
    password:"qwertyuiop"
}
const newParty ={
    name: "inkingi",
    hdAdress:"kigali/rwanda",
    logoUrl:"../UI/images/user.jpeg"
}

const incompleteParty ={
    hdAdress:"kigali/rwanda",
    logoUrl:"../UI/images/user.jpeg"
}

describe('Admin activities', () => {
    

    describe('create party', () => {

        // before((done) => {
        //     request(server).post('/api/v1/auth/login')
        //       .send(adminCredentials).end((err, res) => {
        //         global.userToken = res.body.Data;
        //         done();
        //       });
           
        //   });

        const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhYmFqZXVuZTFAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiaGFidW11Z2lzaGEiLCJsYXN0TmFtZSI6IkFtaSBkZXMgamV1bmVzIiwiaXNBZG1pbiI6dHJ1ZSwidXNlclJvbGUiOiJBZG1pbiIsImlhdCI6MTU4NDI5NDMyMX0.e1CTwOtEAa17dJOtd6bsJY9b6cBfeqRZpXhM77weVog";
        const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhYmFqZXVuZXMyQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6ImhhYnVtdWdpc2hhIiwibGFzdE5hbWUiOiJhbWkgZGVzIGpldW5lcyIsImlzQWRtaW4iOnRydWUsInVzZXJSb2xlIjoiYWRtaW4iLCJpYXQiOjE1ODQ0MzcwNDF9.cDvBpJ2yciz_qi6MazcXdSG8zRgC24PUzvuCy8upnxs";
       
        it(' should not create a new party if is not admin', (done) => {
            chai.request(app)
            .post('/api/v1/parties')
            .set('Athorization', `bearer ${userToken}`)
            .send(newParty)
            .end((err, res) => {
                res.should.have.status(401);
            });
            done();

        });

        it(' should not delete a party if is not admin', (done) => {
            chai.request(app)
            .post('/api/v1/parties')
            .set('Athorization', `bearer ${userToken}`)
            .send(newParty)
            .end((err, res) => {
                res.should.have.status(401);
            });
            done();

        });

        it(' should not register a office if you are not admin', (done) => {
            chai.request(app)
            .post('/api/v1/offices')
            .set('Athorization', `bearer ${userToken}`)
            .send(newOffice)
            .end((err, res) => {
                res.should.have.status(401);
            });
            done();

        });
        it(' should not register a office without token', (done) => {
            chai.request(app)
            .post('/api/v1/offices')
            .set('Athorization', `bearer ${userToken}`)
            .send(newOffice)
            .end((err, res) => {
                res.should.have.status(401);
            });
            done();

        });

        it(' should not find office when database has errors', (done) => {
            chai.request(app)
            .post('/api/v1/offices')
            .set('Athorization', `bearer ${userToken}`)
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
            .set('Athorization', `bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(401);
            });
            done();

        });

        it('when there is error in saving a new office return 400 error code status ', (done) => {
            chai.request(app)
            .post('/api/v1/offices')
            .set('Athorization', `bearer ${adminToken}`)
            .send(newOffice)
            .end((err, res) => {
                res.should.have.status(401);
            });
            done();

        });

        it('when there is error occured return 400 error code status ', (done) => {
            chai.request(app)
            .post('/api/v1/offices')
            .set('Athorization', `bearer ${adminToken}`)
            .send(newOffice)
            .end((err, res) => {
                res.should.have.status(401);
            });
            done();

        });

        it('should not edit party when no token generated', (done) => {
            chai.request(app).patch('/api/v1/parties/1')
            .set('Authorization', `bearer `)
            .send(newParty)
            .end((err,res) =>{
                res.should.have.status(400)
            })
            done()
        });

        it('should not edit party when is not admin', (done) => {
            chai.request(app).patch('/api/v1/parties/1')
            .set('Authorization', `bearer ${userToken}`)
            .send(newParty)
            .end((err,res) =>{
                res.should.have.status(400)
            })
            done()
        });

        it('should not edit party when is empty field', (done) => {
            chai.request(app).patch('/api/v1/parties/1')
            .set('Authorization', `bearer ${adminToken}`)
            .send(incompleteParty)
            .end((err,res) =>{
                res.should.have.status(400)
            })
            done()
        });

        
        
        
        it('should not edit party when all data is incorrect', (done) => {
            chai.request(app).patch('/api/v1/parties/1')
            .set('Authorization', `bearer ${userToken}`)
            .send(incompleteParty)
            .end((err,res) =>{
                res.should.have.status(400)
            })
            done()
        });

        it('should not edit party when is not found in database', (done) => {
            chai.request(app).patch('/api/v1/parties/789')
            .set('Authorization', `bearer ${adminToken}`)
            .send(newParty)
            .end((err,res) =>{
                res.should.have.status(400)
                });
                    done();
            });

        it('should not party when you are not admin and data is incomplete', (done) => {
            chai.request(app).patch('/api/v1/parties/1')
            .set('Authorization', `bearer ${userToken}`)
            .send(incompleteParty)
            .end((err,res) =>{
                res.should.have.status(400)
            })
            done();
        });

        it('should not register candidate when not token provided', (done) => {
            chai.request(app).post('/api/v1/offices/2/register')
            .set('Authorization', `bearer `)
            .send(candidate)
            .end((err, res) => {
                res.should.have.status(400)
            });
            done();
        });

        it('should not register candidate if you are not admin', (done)=> {
            chai.request(app).post('/api/v1/offices/2/register')
            .set('Authorization', `bearer ${userToken}`)
            .send(candidate)
            .end((err, res) => {
                res.should.have.status(404)
            })
            done(); 
        })

        // it('should not register candidate if no data provided', (done)=> {
        //     chai.request(app).post('/api/v1/offices/2/register')
        //     .set('Authorization', `bearer ${adminToken}`)
        //     .send(fakeCandidate)
        //     .end((err, res) => {
        //         res.should.have.status(400)
        //     })
        //     done(); 
        // });

    // })
    it('should not register candidate office is not found', (done)=> {
        chai.request(app).post('/api/v1/offices/40/register')
        .set('Authorization', `bearer ${adminToken}`)
        .send(fakeCandidate)
        .end((err, res) => {
            res.should.have.status(400)
        })
        done(); 
    });
    })
})
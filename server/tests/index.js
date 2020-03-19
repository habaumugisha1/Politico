import chai from 'chai';
import chaiHttp from 'chai-http'
import testUser from './damyData/userData'
import app from '../index';

chai.should();

chai.use(chaiHttp);


describe('user tests', ()=> {
    const userData = {};
   const parties = [
    {
        "id": 1,
        "name": "flag",
        "logourl": "image"
    },
    {
        "id": 2,
        "name": "FPR",
        "logourl": "UI/images/user.jpeg"
    },
    {
        "id": 3,
        "name": "FPR",
        "logourl": "UI/images/user.jpeg"
    },
    {
        "id": 4,
        "name": "FPR",
        "logourl": "UI/images/user.jpeg"
    }
];
   const loginNoEmail = {password:'qwertyuiop'}
   const incorrectEmail= {
    email:'habaj@gmail.com',
    password:'qwertyuiop'
   }
   const login = {
       email:'habajeune1@gmail.com',
       password:'qwertyuiop'
   }

    const userNoEmail= {
        firstName: 'jonathanu',
        lastName: 'kukutodhgch',
        password: '1234567890',
        isAdmin: 'false',
        userRole: 'user',
      };
      const newuser= {
        firstName: 'jonathanu',
        lastName: 'kukutodhgch',
        passportUrl:'./UI/images/user.jpeg',
        email: 'jonathanu9@gmail.com',
        password: '1234567890',
        isAdmin: 'false',
        userRole: 'user'
      }



    it('should not get a single party when id is not number', (done) =>{
        chai.request(app)
        .get('/api/v1/parties/hjk')
        .end((err, res) =>{
           res.should.have.status(404); 
           done(); 
        });
    });
    
    

    

})

describe('home page', () =>{
    it('user should get home page', (done) => {
        chai.request(app)
            .get('/api/v1/home')
            .end((err, res) =>{
                // res.should.have.status(200);
                res.body.status.should.equal(200);
                console.log(res.body);
                res.body.should.have.property('message');
                res.body.should.have.property('status');
                
                done();
            });
    });

})

describe('log in', () =>{
    it('user should not log in when with empty email', (done) => {
        chai.request(app)
            .get('/api/v1/auth/login')
            .send({password:"qwertyuiop"})
            .end((err, res) =>{
                console.log(res.body);
                res.should.have.status(404);
                done();
            });
    });

})

describe('get all party', () => {
    it('should get all party', (done) =>{
        chai.request(app)
        .get('/api/v1/parties')
        .end((err, res) =>{
           res.should.have.status(200); 
        });
        done(); 
    });
})

describe('get a single party', () => {
    it('should get a single party when id is valid', (done) =>{
        chai.request(app)
        .get('/api/v1/parties/1')
        .end((err, res) =>{
           res.should.have.status(200); 
        });
        done(); 
    });
})
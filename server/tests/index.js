import chai from 'chai';
import chaiHttp from 'chai-http'
import testUser from './damyData/userData'
import app from '../index';

chai.should();

chai.use(chaiHttp);


describe('user tests', ()=> {
    const userData = {};
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
        userRole: 'user',
      }

    it('user should get home page', (done) => {
        chai.request(app)
            .get('/api/v1/home')
            .send('Welcome to Politico platform')
            .end((err, res) =>{
                res.should.have.status(200);
                
            });
            done();
    });

    it('user should not create account with emptydata', (done) =>{
        chai.request(app)
        .post('/api/v1/auth/signUp')
        .send(userData)
        .end((err, res) =>{
           res.should.have.status(403); 
        });
        done();

    });
    it('user should not create account without email', (done) =>{
        chai.request(app)
        .post('/api/v1/auth/signUp')
        .send(userNoEmail)
        .end((err, res) =>{
           res.should.have.status(403); 
        });
        done(); 
    });
    it('user should create account with full data', (done) =>{
        chai.request(app)
        .post('/api/v1/auth/signUp')
        .send(newuser)
        .end((err, res) =>{
           res.should.have.status(201); 
        });
        done(); 
    });

    it('user should  not login without data', (done)=>{
        chai.request(app)
        .post('/api/v1/auth/login')
        .send(userData)
        .end((err, res) =>{
           res.should.have.status(403); 
        });
        done();
    });

    it('user should  not login without email or password', (done)=>{
        chai.request(app)
        .post('/api/v1/auth/login')
        .send(loginNoEmail)
        .end((err, res) =>{
           res.should.have.status(403); 
        });
        done();
    });

    it('user should  not login with incorretct email', (done)=>{
        chai.request(app)
        .post('/api/v1/auth/login')
        .send(incorrectEmail)
        .end((err, res) =>{
           res.should.have.status(404); 
        });
        done();
    });

    it('user should  login with email and password', (done)=>{
        chai.request(app)
        .post('/api/v1/auth/login')
        .send(login)
        .end((err, res) =>{
           res.should.have.status(200); 
        });
        done();
    });

})

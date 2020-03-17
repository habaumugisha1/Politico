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

    it('user should get home page', (done) => {
        chai.request(app)
            .get('/api/v1/home')
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.have.property('message');
                
            });
            done();
    });

    it('user should not create account with emptydata', (done) =>{
        chai.request(app)
        .post('/api/v1/auth/signUp')
        .send({})
        .end((err, res) =>{
           res.should.have.status(400); 
        });
        done();

    });

    // it('user should not create account with problems in db connect', (done) =>{
    //     chai.request(app)
    //     .post('/api/v1/auth/signUp')
    //     .send(newuser)
    //     .end((err, res) =>{
    //        res.should.have.status(400); 
    //     });
    //     done();

    // });

    it('user should not create account when email is exist in db', (done) =>{
        chai.request(app)
        .post('/api/v1/auth/signUp')
        .send({firstName: 'jonathanu',
        lastName: 'kukutodhgch',
        passportUrl:'./UI/images/user.jpeg',
        email: 'habajeune1@gmail.com',
        password: 'qwertyuiop',
        isAdmin: 'false',
        userRole: 'user'})
        .end((err, res) =>{
           res.should.have.status(400);
           res.body.should.have.property('err');
        });
        done();

    });

    // it('user should not create account when password is not hashed', (done) =>{
    //     chai.request(app)
    //     .post('/api/v1/auth/signUp')
    //     .send(newuser)
    //     .end((err, res) =>{
    //        res.should.have.status(400); 
    //     });
    //     done();

    // });

    // it('user should not create account without email', (done) =>{
    //     chai.request(app)
    //     .post('/api/v1/auth/signUp')
    //     .send(userNoEmail)
    //     .end((err, res) =>{
    //        res.should.have.status(404); 
    //     });
    //     done(); 
    // });
    it('user should create account with full data', (done) =>{
        chai.request(app)
        .post('/api/v1/auth/signUp')
        .send({firstName: 'jonathanu',
        lastName: 'kukutodhgch',
        passportUrl:'./UI/images/user.jpeg',
        email: 'jonathanu9@gmail.com',
        password: '1234567890',
        isAdmin: 'false',
        userRole: 'user'})
        .end((err, res) =>{
           res.should.have.status(201); 
           res.body.should.have.be.a('object');
        });
        done(); 
    });


    it('should not get a single party when id is not number', (done) =>{
        chai.request(app)
        .get('/api/v1/parties/hjk')
        .end((err, res) =>{
           res.should.have.status(400); 
        });
        done(); 
    });
    
    it('should not get a single party when id is not found', (done) =>{
        chai.request(app)
        .get('/api/v1/parties/30')
        .end((err, res) =>{
           res.should.have.status(404); 
        });
        done(); 
    });

    it('should get a single party when id is valid', (done) =>{
        chai.request(app)
        .get('/api/v1/parties/kk')
        .end((err, res) =>{
           res.should.have.status(200); 
        });
        done(); 
    });

})

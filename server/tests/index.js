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



    it('should not get a single party when id is not number', (done) =>{
        chai.request(app)
        .get('/api/v1/parties/hjk')
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

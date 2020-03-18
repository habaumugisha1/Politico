import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import isValid from '../helper/valiMiddle'
import imageUrl from '../helper/image'

import { pool } from '../models/db';
import {signUpUser, isUserExist, getAllParties, getAllOffices} from '../models/query'


class Users{
 static homePage(req,res){
    return res.status(200).json({status:200, message:"Welcome to Politico."})

 };

 static signUp(req, res){

  
            pool.connect((err,myClient) =>{
                if(err){
                   return res.status(400).json({status:400, errors:err});
                };
                
                const user = {
                    firstName: req.body.firstName,
                    otherName: req.body.otherName,
                    lastName: req.body.lastName,
                    passportUrl:req.body.passportUrl,
                    email: req.body.email,
                    password: req.body.password,
                    isAdmin: req.body.isAdmin,
                    userRole: req.body.userRole,
                    createdOn: new Date()
                  };
                bcrypt.hash(user.password, 10, (error, hashedPassword) =>{
                      
                      const usedEmail = myClient.query(isUserExist, [user.email]);
                      usedEmail.then((used) => {
                                 
                          if(used.rows.length > 0) {
                          return res.status(400).json({status:400, message:`this Email ${user.email} is already in use`});
                          };
                      }).catch((err) => res.status(400).json({status:400, message:"bad request", errors:err}))
                      if(error) return res.status(400).json({status:400, message:"check me 0", errors:error});
                      const value = [user.firstName, user.otherName, user.lastName, user.passportUrl, user.email, hashedPassword, user.isAdmin, user.userRole, user.createdOn];
                            return myClient.query(signUpUser, value).then(()=>{
                                    jwt.sign({
                                       email: user.email,
                                       isAdmin: user.isAdmin,
                                       userRole:user.userRole,
                                       firstName: user.firstName,
                                       lastName: user.lastName,
                                     }, process.env.SECRETE_KEY, (error,token)=>{
                                         if (error) return res.status(400).json({ status: 400, message:'check me 3', err: error });
                                         return res.status(201).json({status:201, message:'Your account succful created!', data: token, userData:user})
                                     })
                                    }).catch((err) => res.status(400).json({status:400, message:'check me 4', errors:err}) 
                                    )
            })
        })
    
};

static userLogIn (req,res){
    const data ={
        email: req.body.email,
        password: req.body.password
    };
    
        pool.connect((errors, client) => {
            if(errors) return res.status(400).json({status:400, err:errors})
           return client.query(isUserExist, [data.email]).then((user) => { 

                      bcrypt.compare(data.password, user.rows[0].password, (errors, data) =>{
                          if(errors){ return res.status(400).json({status:400, message:errors})}
                          if(!data)  {
                            
                            return res.status(400).json({ status: 400, messsage: 'invalid creadetial'});
                        }
                        const logedInUserData = {
                            email: user.rows[0].email,
                            firstName: user.rows[0].firstname,
                            lastName: user.rows[0].lastname,
                            isAdmin:user.rows[0].isadmin,
                            userRole:user.rows[0].userrole
                         };
                        jwt.sign(logedInUserData, process.env.SECRETE_KEY, (er, token)=>{
                             if(er) return res.status(400).json({status:400, message:er})
                            return res.status(200).json({status:200,message:'Logined successful', Data:token, userData:logedInUserData})
                         })
                    })
                // }

            }).catch((err) => res.status(400).json({status:400, message:"You don't have account here", data:err}))
        })
    // }
};

static getParties(req, res){
    pool.connect( async(error, client) => {
        if(error) return res.status(400).json({status:400, err:error});
        const parties = await client.query(getAllParties); 

        return res.status(200).json({status:200, data:parties.rows})
    })
}

static getSingleParty(req, res){
    pool.connect(async (err, myClient) =>{
        // looking if party is exists'
        const singlePartyId = parseInt(req.params.partyId, 10);
        if (!Number.isInteger(singlePartyId)) return res.status(404).json({status:404, message: 'Please Id should be number'});
        console.log(res.body)
        const isParty = await myClient.query(`SELECT * FROM party WHERE id=$1;`, [singlePartyId]);
        
            if(isParty.rows.length === 0) return res.status(404).json({status:404,message:`Party with id of ${singlePartyId} is not found`});
            return res.status(200).json({status:200, data:isParty.rows});
    })
};

static getAllOffice(req, res){
    pool.connect( async(error, myClient) => {
        if(error) return res.status(400).json({status:400, err:error});
        const offices = await myClient.query(getAllOffices);
        if(offices.rows.length===0) return res.status(404).json({status:404, message:"No office avairable"}) 

        return res.status(200).json({status:200, data:offices.rows})
    })
}

static getSingleOffice(req, res){
    pool.connect(async (err, myClient) =>{
        // looking if party is exists'
        const officeId = parseInt(req.params.singleOfficeId, 10);
        if (!Number.isInteger(officeId)) return res.status(400).json({status:400, message: 'Please Id should be number'})
        const isOffice = await myClient.query(`SELECT id, type, name FROM offices WHERE id=$1;`, [officeId]);
        
            if(isOffice.rows.length === 0) return res.status(404).json({status:404,message:`Office with id of ${officeId} is not found`});
            return res.status(200).json({status:200, data:isOffice.rows});
    })
};


}

export default Users;


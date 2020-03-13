import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import isValid from '../helper/valiMiddle'
import imageUrl from '../helper/image'

import { pool } from '../models/db';
import {signUpUser, isUserExist} from '../models/query'


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
                              
                              console.log(used.rows[0])
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
                                     }, 'SECRETEKEY', (error,token)=>{
                                         if (error) return res.status(400).json({ status: 403, message:'check me 3', err: error });
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
                // if(user) {
                //     console.log(user.rows);
                //     console.log(user.rows[0].userrole);
                // }
            //    console.log(user.rows[0].email)
            //     console.log(user.rows[0].password)
            //     console.log(user.rows[0].firstName)

                      bcrypt.compare(data.password, user.rows[0].password, (errors, data) =>{
                          if(errors){ return res.status(400).json({status:400, message:errors})}
                          if(!data)  {
                            
                            return res.status(400).json({ status: 400, messsage: 'invalid creadetial'});
                        }
                        jwt.sign({
                            email: user.rows[0].email,
                            firstName: user.rows[0].firstname,
                            lastName: user.rows[0].lastname,
                            isAdmin:user.rows[0].isadmin,
                            userRole:user.rows[0].userrole
                         }, 'SECRETEKEY', (er, token)=>{
                             if(er) return res.status(400).json({status:400, message:er})
                            return res.status(200).json({status:200,message:'Logined successful', Data:token})
                         })
                    })
                // }

            }).catch((err) => res.status(400).json({status:400, message:"You don't have account here", data:err}))
        })
    // }
}

}

export default Users;


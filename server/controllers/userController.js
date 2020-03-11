import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import userSchema from '../helper/validation'
import imageUrl from '../helper/image'

import { pool } from '../models/db';
import {signUpUser, signIn, isUserExist} from '../models/query'


class Users{
 static homePage(req,res){
     res.status(200).json({status:200, message:"Welcome to Politico."})

 };

 static signUp(req, res){

    Joi.validate(req.body, userSchema, (error, callBack) =>{
        if(error) return res.status(400).json({status:400, data1:error.details[0].message})
        if(callBack){
            pool.connect((err,myClient) =>{
                if(err){
                    res.status(400).json({status:400, errors:err});
                };
                
                bcrypt.hash(callBack.password, 10, (error, hashedPassword) =>{
                    const user = {
                        firstName: req.body.firstName,
                        otherName: req.body.otherName,
                        lastName: req.body.lastName,
                        passportUrl:req.body.passportUrl,
                        email: req.body.email,
                        password: hashedPassword,
                        isAdmin: req.body.isAdmin,
                        userRole: req.body.userRole,
                        createdOn: new Date()
                      };
                      
                      const usedEmail = myClient.query(isUserExist, [user.email]);
                      usedEmail.then((used) => {

                          if(used.rows.length > 0) {
                              
                              console.log(used.rows[0])
                          return res.status(400).json({status:400, message:`this Email ${user.email} is already in use`});
                          };
                      }).catch((err) => res.status(400).json({status:400, message:"bad request", errors:err}))
                      if(error) return res.status(400).json({status:400, message:"check me 0", errors:error});
                      const value = [user.firstName, user.otherName, user.lastName, user.passportUrl, user.email, user.password, user.isAdmin, user.userRole, user.createdOn];
                            return myClient.query(signUpUser, value).then(()=>{
                                    jwt.sign({
                                       email: user.email,
                                       isAdmin: user.isAdmin,
                                       userRole:user.userRole,
                                       firstName: user.firstName,
                                       lastName: user.lastName,
                                     }, 'SECRETEKEY', (error,token)=>{
                                         if (error) return res.status(400).json({ status: 403, message:'check me 3', err: error });
                                         return res.status(201).json({status:201, message:'Your account succful created!', data: token})
                                     })
                                    }).catch((err) => res.status(400).json({status:400, message:'check me 4', errors:err}) 
                                    )
            })
        })
     }
    })
// });
};

}

export default Users;


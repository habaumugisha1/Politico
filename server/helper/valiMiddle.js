// import express from 'express'
import Joi from '@hapi/joi';

export default {
   
     schema: {
       loginSchemema: Joi.object({
            email:Joi.string().email().required(),
            password:Joi.string().required()
        }),
        userSchema : Joi.object().keys({
            firstName : Joi.string().min(4).max(20).required(),
            // otherName: Joi.string().min(3).max(30),
            lastName:Joi.string().min(3).required(),
            // phoneNumber:Joi.number().integer().required(),
            email: Joi.string().email().required(),
            password:Joi.string().required(),
            passportUrl:Joi.string().required(),
            isAdmin: Joi.string().required(),
            userRole: Joi.string().required()
        
        })
   
     },
     isValid: (schema) => {
     return (req, res, next) => {
          Joi.validate( req.body, schema, (err, result) => {
             if(err) res.status(403).json({status:403, error: err.details[0].message});
           if(result){
              return next();
           }
         });
        }
     }
   
}


// export default isValid;
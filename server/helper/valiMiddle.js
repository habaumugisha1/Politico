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
        
        }),
        partySchema : Joi.object().keys({
           name:Joi.string().required(),
           hdAdress:Joi.string().required(),
           logoUrl:Joi.string().required()
        }),

        officeSchema : Joi.object().keys({
           type: Joi.string().trim().required(),
           name:Joi.string().trim().required()
        }),

        candidateSchema : Joi.object().keys({
         party:Joi.string().required(),
         email: Joi.string().email().required()
      })
   
     },
     isValid: (schema) => {
     return (req, res, next) => {
          Joi.validate( req.body, schema, (err, result) => {
             if(err) return res.status(400).json({status:400, error: err.details[0].message});
           if(result){
              return next();
           }
         });
        }
     }
   
}


// export default isValid;
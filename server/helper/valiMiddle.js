// import express from 'express'
import Joi from '@hapi/joi';

export default {
   
     schema:Joi.object({
         email:Joi.string().email().required(),
         password:Joi.string().required()
     }),

     isValid: function (req, res, next){
          Joi.validate( req.body, (err, result) => {
             if(err) res.status(403).json({status:403, error: err.details[0].message});
           if(result){
              return next();
           }
         });
         
     }
   
}


// export default isValid;
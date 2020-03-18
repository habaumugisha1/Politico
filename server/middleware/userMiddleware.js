import jwt from 'jsonwebtoken';
import { pool } from '../models/db';
import  isUserExist from '../models/query'
class Authorize {
    static isAdmin(req,res,next){
        const bearer = req.headers.authorization;
        if(!bearer) return res.status(401).json({status:401, message:"you are not Authorized"});
        // console.log(bearer)
        const token = req.headers.authorization.split(' ')[1];
        let authUser;

        jwt.verify(token, process.env.SECRET_KEY, (err, dataAdmin) => {
            
            if (err) return res.status(400).json({ status: 400, message: err });
            authUser=dataAdmin
            
            
            req.authUser = authUser;
            // return next();
    
            pool.connect((err, value) => {
                        if (err) return res.status(400).json({status:err, erros:err});
                       return value.query(`SELECT * FROM users WHERE email=$1;`, [dataAdmin.email]).then((user) => {
                            if(user.rows[0].userrole==='Admin') return next();
                           if(user.rows[0].userrole !=='Admin') return res.status(400).json({status:400, message:"Only admin is allowed"})
                        }).catch((errors) => res.status(400).json({status:400, error:errors}))
            
                    })
        });


    }
}

export default Authorize;
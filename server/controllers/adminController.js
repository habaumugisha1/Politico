import { pool } from '../models/db';
import isPartyExist from '../models/query'
import myParty from '../models/query'


class Admin{
    static createParty(req, res){
        const newParty = {
            
            name: req.body.name,
            hdAdress:req.body.hdAdress,
            logoUrl:req.body.logoUrl,
            createdOn: new Date()
        };

        pool.connect((err, myClient) =>{
            if(err) return res.status(400).json({status:400, erro:err});
            // looking if party is exists'
            const isParty = myClient.query(`SELECT * FROM party WHERE name=$1;`, [newParty.name]);
            return isParty.then((party) => {
                if(party.rows.length > 0) return res.status(403).json({status:403,message:"Party already exists or registered"});
                // create new party

                myClient.query(`INSERT INTO party(name, hdAdress, logoUrl, createdOn) VALUES($1,$2,$3,$4) RETURNING *;`, [newParty.name, newParty.hdAdress,newParty.logoUrl,newParty.createdOn]).then(() =>{
                    return res.status(201).json({status:201, message:"New party created successful", data:newParty})
                }).catch((err) => res.status(400).json({status:400,message:"what went wrong?", errors:err}));
            }).catch((errors) => res.status(400).json({status:400,message:"what?", err:errors}))

        })

    }
}
export default Admin;
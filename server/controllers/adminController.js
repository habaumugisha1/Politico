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

    };

    static deleteParty(req, res){
        
       pool.connect( async (error, myDb) => {
           
           if(error) return res.status(400).json({status:400, err:error});

           const findParty = await myDb.query('SELECT * FROM party WHERE id=$1', [req.params.id]);
           if (findParty.rows.length === 0) return res.status(404).json({status:404, message:'Party you are trying to delete is not found!'});
            if(findParty){
             try {

                   await myDb.query('DELETE FROM party WHERE id=$1', [req.params.id]);
                  
                  return res.status(200).json({status:200, message:'Party deleted successful!'})
              }
                 catch (err){
                       return res.status(400).json({status:400, message:'error occured',errors:err})
                    }
        }
       })
    };

    static createNewOffice (req, res){
        const newOffice = { 
            name: req.body.name,
            type:req.body.type,
            createdOn: new Date()
        };
        pool.connect(async(errors, myPool) => {
            if(errors) return res.status(400).json({status:400, err:errors});

            const isOfficeExist = myPool.query('SELECT * FROM offices WHERE name=$1', [newOffice.name]);
             isOfficeExist.then(async(myOffice) => {

                 if(myOffice.rows.length > 0) return res.status(400).json({status:400, message:`Office ${newOffice.name} is already registed`});
     
                 const office = await myPool.query('INSERT INTO offices(type, name, createdOn) VALUES($1,$2,$3)', [newOffice.type, newOffice.name, newOffice.createdOn]);
     
                 if (office.error) return res.status(400).json({status:400, message:'something went wrong', err:error});
                 return res.status(201).json({status:201, message:'New Office is created successful', data:newOffice});

             }).catch((err) =>res.status(400).json({status:400, message:'something went wrong', err:error}))
        })


    }
}
export default Admin;
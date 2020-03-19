import { pool } from '../models/db';
// import userDecordedData from  '../helper/userDecorded'
import jwt from 'jsonwebtoken'
import isPartyExist from '../models/query'
// import Office from '../helper/newObjects'
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

    static editParty(req, res){
        pool.connect( async (err, myClient) => {
            if(err) return res.status(400).json({status:400, err:error});
    
               const findParty = await myClient.query('SELECT * FROM party WHERE id=$1', [req.params.partyId]);
               
               if (findParty.rows.length === 0) return res.status(404).json({status:404, message:'Party you are trying to update is not found!'});
              
               if(findParty){
                
                  
                     await myClient.query('UPDATE party SET name=$1, hdAdress=$2, logoUrl=$3  WHERE id=$4', [req.body.name, req.body.hdAdress, req.body.logoUrl, req.params.partyId]);
                     
                     return res.status(200).json({status:200, message:`Party ${findParty.rows[0].name} it chenged to ${req.body.name} edited successful!`})
                    
                    }
        })
    }

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
        
        const myData = {
            type:req.body.type,
            name: req.body.name,
            createdOn: new Date()
        }
        

        pool.connect(async(errors, myPool) => {
            if(errors) return res.status(400).json({status:400, err:errors});
                

            const isOfficeExist = myPool.query('SELECT * FROM offices WHERE name=$1', [myData.name]);
             isOfficeExist.then(async(myOffice) => {

                 if(myOffice.rows.length > 0) {
                     return res.status(400).json({status:400, message:`Office ${myData.name} is already registed`});
                 }
                 const offices = await myPool.query('INSERT INTO offices(type, name, createdOn) VALUES($1,$2,$3) RETURNING *', [myData.type,myData.name,myData.createdOn]);
                
                  console.log(offices)
     
                 if (offices.error) return res.status(400).json({status:400, message:'something went wrong', err:error});
                 return res.status(201).json({status:201, message:'New Office is created successful', data:myData});

             }).catch((error) =>res.status(400).json({status:400, message:'something went wrong', err:error}))
        })


    }

    static candidateRegister(req, res){
        pool.connect(async (err, results) =>{
            if(err) return res.status(400).json({status:400, errors:err});

            const findOffice = results.query('SELECT * FROM offices WHERE id=$1', [req.params.officeId])
            // console.log(`office id ${findOffice.rows.id}`)
            findOffice.then(async(data) =>{
                if(data.rows.length===0) return res.status(400).json({status:400, message:`this office with id ${req.params.officeId} is not found`});
                const candidatess = await results.query('SELECT * FROM users WHERE email=$1', [req.body.email]);
                // console.log(`candidate id ${candidate.rows[0].id}`)
                if(candidatess.rows.length===0) return res.status(404).json({status:404, message:`this user with email ${req.body.email} is not found`});
               
                if(candidatess) {
                    const newCandidate={
                       office: data.rows[0].id,
                        party: req.body.party, 
                        candidate: candidatess.rows[0].id, 
                        careatedOn: new Date()
                    };

                     const findCand = await results.query('SELECT * FROM candidates WHERE candidate=$1',[candidatess.rows[0].id]);

                    //  console.log("registred" + findCand.rows);


                     if(findCand.rows.length>0) return res.status(400).json({status:400, message:"candidate is already registered"})

                     const register = results.query('INSERT INTO candidates(office,party, candidate, careatedOn) VALUES($1,$2,$3,$4)', [ data.rows[0].id, req.body.party, candidatess.rows[0].id, new Date()]);
                     register.then((newData) => {

                        //   console.log(`new cand ${newData.rows}`)
                          return res.status(201).json({status:201, message:'new candidate registered successful', data:newCandidate, regi:newData.rows})
                      }).catch((er) => res.status(400).json({status:400, message:"something went wrong 1", errors:er}));
                }
             }).catch((error) =>res.status(400).json({status:400, message:"something went wrong", err:error}));


        })
    }

    static candidateVote(req, res) {

        pool.connect( async(err, myPool) => {
            
            const token = req.headers.authorization.split(' ')[1];
            const tokenData = jwt.verify(token, process.env.SECRET_KEY);
            if(!tokenData) return res.status(400).json({status:400, message:'first login in order to vote'});
            // console.log(tokenData)
            //find office is exists
            myPool.query('SELECT * FROM offices WHERE id=$1', [req.params.officeId])
            .then(async (office) => {
                console.log(office.rows);
                if(office.rows.length===0) return res.status(404).json({status:404, message:'this office is not found'});
                if(office){
                  const candidate = await myPool.query('SELECT * FROM candidates WHERE id=$1', [req.params.candidateId]);
                  if(candidate.rows.length===0) return res.status(404).json({status:404, message:'this candidate is not available'});
                //   console.log(candidate.rows);
                  if(candidate){
                      //find if not voted user 
                      const findVote = await myPool.query('SELECT * FROM votes WHERE office=$1', [office.rows[0].id]);
                      if (findVote.rows.length>0) return res.status(400).json({status:400, message:'You have already voted in this office'});
                      if(findVote.rows.length===0){
                        //   console.log('start to vote now')
                          const vote =0;
                      const votesCounts = vote + 1;
                    //   console.log(votesCounts);
                      const votesData = {
                          office:office.rows[0].id,
                          candidate:candidate.rows[0].id,
                          voter:tokenData.id
                      }
                      const voteQuery = myPool.query('INSERT INTO votes(date,office,candidate,votedBy,votes) VALUES ($1,$2,$3,$4,$5)', [new Date(),office.rows[0].id,candidate.rows[0].id,tokenData.id,votesCounts]);
                      voteQuery.then((voting) =>{
                          return res.status(201).json({status:201, message:'vote a candidate successful', data:votesData})
                      }).catch((error) => res.status(400).json({status:400, message:'something went wrong', errors:error}))
                    }
                  }
                }
            }).catch((err) => res.status(400).json({status:400, message:'something went wrong 2', errors:err}))

        })
    }
}
export default Admin;
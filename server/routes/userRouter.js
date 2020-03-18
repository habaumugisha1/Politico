import express from 'express';
import Users from '../controllers/userController'
import Admin from '../controllers/adminController'
import Authorize from '../middleware/userMiddleware'
import validation from '../helper/valiMiddle'
 const router = express.Router();

 router.get('/home', Users.homePage);
 router.post('/auth/signUp', validation.isValid(validation.schema.userSchema), Users.signUp);
 router.post('/auth/login', validation.isValid(validation.schema.loginSchemema) , Users.userLogIn)

//  Admin activities
router.post('/parties', Authorize.isAdmin , validation.isValid(validation.schema.partySchema), Admin.createParty);
router.patch('/parties/:partyId',Authorize.isAdmin, validation.isValid(validation.schema.partySchema), Admin.editParty);
router.post('/offices',Authorize.isAdmin,  validation.isValid(validation.schema.officeSchema), Admin.createNewOffice)


// get parties
router.get('/parties', Users.getParties);
router.get('/parties/:partyId', Users.getSingleParty);
router.delete('/parties/:id', Authorize.isAdmin, Admin.deleteParty);

//get offices
router.get('/offices', Users.getAllOffice);
router.get('/offices/:singleOfficeId', Users.getSingleOffice);

// register a candidate
router.post('/offices/:officeId/register', Authorize.isAdmin, validation.isValid(validation.schema.candidateSchema), Admin.candidateRegister)




 export default router;

 
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
router.post('/parties', Authorize.isAdmin , validation.isValid(validation.schema.partySchema), Admin.createParty)

// get parties
router.get('/parties', Users.getParties);
router.delete('/parties/:id', Authorize.isAdmin, Admin.deleteParty);

 export default router;

 
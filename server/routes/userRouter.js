import express from 'express';
import Users from '../controllers/userController'
import validation from '../helper/valiMiddle'
 const router = express.Router();

 router.get('/home', Users.homePage);
 router.post('/auth/signUp', Users.signUp);
 router.post('/auth/login', Users.userLogIn)

 export default router;

 //validation.isValid(validation.schema),
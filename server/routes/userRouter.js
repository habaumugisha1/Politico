import express from 'express';
import User from '../controllers/userController'
 const router = express.Router();

 router.get('/home', User.homePage);
 router.post('/auth/signUp', User.signUp);

 export default router;
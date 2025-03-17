import {registerUser, loginUser, userCredits, paymentRazorPay, verifyRazorpay} from '../controllers/userController.js'
import express from 'express';
import userAuth from '../middlewares/Auth.js';
const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/credits',userAuth,userCredits);
userRouter.post('/pay-razor',userAuth,paymentRazorPay);
userRouter.post('/verify-razor',verifyRazorpay);
export default userRouter;

// http://localhost:5000/api/users/register
// http://localhost:5000/api/users/login
//http://localhost:5000/api/users/credits
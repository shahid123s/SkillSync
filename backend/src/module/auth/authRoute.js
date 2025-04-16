import express from 'express';
const adminAuthRouter = express.Router();
const userAuthRouter = express.Router();
const reviewerAuthRouter = express.Router();

import {
    adminLogin,
    adminLogout,
    adminRefreshToken,
    adminRegister,
    reviewerLogin,
    reviewerLogout,
    reviewerRegistration,
    reviewrRefreshToken,
    studentLogin,
    studentLogout,
    studentRefreshToken,
    studentRegister
} from './authController.js';


// Student Authentication 
userAuthRouter.post('/login', studentLogin);
userAuthRouter.post('/register', studentRegister);
userAuthRouter.post('/refresh-token', studentRefreshToken)
userAuthRouter.post('/logout', studentLogout)

// Reviwer Authentication 
reviewerAuthRouter.post('/login', reviewerLogin)
reviewerAuthRouter.post('/register', reviewerRegistration)
reviewerAuthRouter.post('/refresh-token', reviewrRefreshToken)
reviewerAuthRouter.post('/logout', reviewerLogout);


// Admin Authentication 
adminAuthRouter.post('/login', adminLogin);
adminAuthRouter.post('/register', adminRegister);
adminAuthRouter.post('/refresh-token', adminRefreshToken);
adminAuthRouter.post('/logout', adminLogout);


export  {adminAuthRouter, userAuthRouter, reviewerAuthRouter};
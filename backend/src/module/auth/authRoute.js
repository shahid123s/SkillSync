import express from 'express';
const router = express.Router();
import {
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
router.post('/student/login', studentLogin);
router.post('/student/register', studentRegister);
router.post('/student/refresh-token', studentRefreshToken)
router.post('/student/logout', studentLogout)

// Reviwer Authentication 
router.post('/reviewer/login', reviewerLogin)
router.post('/reviewer/register', reviewerRegistration)
router.post('/reviewer/refresh-token', reviewrRefreshToken)
router.post('/reviewer/logout', reviewerLogout);


export default router;
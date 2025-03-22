import express from 'express';
const router = express.Router();
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
router.post('/student/login', studentLogin);
router.post('/student/register', studentRegister);
router.post('/student/refresh-token', studentRefreshToken)
router.post('/student/logout', studentLogout)

// Reviwer Authentication 
router.post('/reviewer/login', reviewerLogin)
router.post('/reviewer/register', reviewerRegistration)
router.post('/reviewer/refresh-token', reviewrRefreshToken)
router.post('/reviewer/logout', reviewerLogout);


// Admin Authentication 
router.post('/admin/login', adminLogin);
router.post('/admin/register', adminRegister);
router.post('/admin/refresh-token', adminRefreshToken);
router.post('/admin/logout', adminLogout);


export default router;
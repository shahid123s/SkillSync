import express from 'express';
const router = express.Router();
import { studentLogin, studentLogout, studentRefreshToken, studentRegister } from './authController.js';


// Student Authentication 
router.post('/student/login', studentLogin);
router.post('/student/register', studentRegister);
router.post('/student/refresh -token',studentRefreshToken)
router.post('/student/logout', studentLogout)

// Reviwer Authentication 

export default router;
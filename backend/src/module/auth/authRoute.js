import express from 'express';
const router = express.Router();
import { studentLogin, studentRegister } from './authController.js';

// router.post('/student/login', studentLogin);
router.post('/student/register', studentRegister);


export default router;
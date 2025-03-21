import express from 'express';
import { studentLogin } from './authController.js';
const router = express.Router();

router.post('/student/login', studentLogin);

router.post('/student/register', studentRegister);
export default router;
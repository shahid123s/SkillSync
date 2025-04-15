import express from 'express';
import { adminController } from './adminController.js';
const router  = express.Router();

router.get('/users', adminController.getAllUsers);
router.get('/courses', adminController.getAllCourses);



export default router;
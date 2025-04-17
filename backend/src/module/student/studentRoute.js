import express from 'express';
import { studentController } from './studentController.js';
const router = express.Router();

router.get('/get-all-students', studentController.getAllStudents);
router.get('/get-student', studentController.getStudent);
router.patch('/update-student', studentController.updateStudent);
router.get('/get-user-info', studentController.getUserInfo)


export default router;
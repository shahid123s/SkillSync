import express from 'express';
import { adminController } from './adminController.js';
const router  = express.Router();

router.get('/users', adminController.getAllUsers);
router.get('/courses', adminController.getAllCourses);
router.post('/course/add-course', adminController.addCourse)
router.put('/course/update-course/:courseId', adminController.updateCourse);
// router.get('/get-all-user')


export default router;
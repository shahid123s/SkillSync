import express from 'express';
import { addCourse, getAllCourses, getCourse } from './courseController.js';
const router = express.Router()


router.get('/get-all-courses', getAllCourses );
router.get('/get-course', getCourse)
router.post('/add-course', addCourse)


export default router;
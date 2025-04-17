import express from 'express'
const router = express.Router();
import {getAllCourses, getCourse, updateCourse, getStudentCourse} from './courseController.js'

router.get('/get-all-courses', getAllCourses );
router.get('/get-course', getCourse);
// router.post('/add-course', addCourse);
router.put('/update-course', updateCourse )
router.get('/student', getStudentCourse )
// router.post('/b')


export default router;
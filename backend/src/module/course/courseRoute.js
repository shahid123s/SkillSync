import express from 'express'
const router = express.Router();
import {getAllCourses, getCourse, updateCourse} from './courseController.js'

router.get('/get-all-courses', getAllCourses );
router.get('/get-course', getCourse);
// router.post('/add-course', addCourse);
router.put('/update-course', updateCourse )
// router.post('/b')


export default router;
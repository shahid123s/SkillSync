import express from 'express'
const router = express.Router();
import {getAllCourses, getCourse, addCourse} from './courseController.js'

router.get('/get-all-courses', getAllCourses );
router.get('/get-course', getCourse);
router.post('/add-course', addCourse);
router.put('/update-course', )
// router.post('/b')


export default router;
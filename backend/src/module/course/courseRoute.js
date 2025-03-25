import express from 'express';
import { addCourse, getAllCourses, getCourse } from './courseController';
const router = express.Router()


router.get('/get-all-courses', getAllCourses );
router.get('./get-course', getCourse)
router.post('/add-course', addCourse)

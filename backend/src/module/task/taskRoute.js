import express from 'express'
import {taskController} from './taskController.js';
const router = express.Router();


router.get('/get-all-task', taskController.getAllTasks);
router.get('/get-task/:_id', taskController.getTask);
router.post('/create-task', taskController.createTask);
router.patch('/update-task/:_id', taskController.updateTask);
router.get('/get-weekly-task', taskController.getCourseWeekTask)
router.get('/get-course-task/:courseId', taskController.getCourseTasks)
export default router;
import express from 'express';
import { adminController } from './adminController.js';
const router  = express.Router();

router.get('/users', adminController.getAllUsers);
router.get('/courses', adminController.getAllCourses);
router.post('/course/add-course', adminController.addCourse)
router.put('/course/update-course/:courseId', adminController.updateCourse);
router.get('/get-all-user', adminController.getALlUsers)
router.put('/user/toggle-status', adminController.toggleUserBlock);

router.get('/get-all-reviewers',adminController.getALlReviewers)
router.get('/get-all-pending-reviewers', adminController.getAllPendingReviewer);
router.put('/reviewer/toggle-status', adminController.toggleReviewerStatus);
router.put('/reviewer/toggle-block', adminController.toggleReviewerBlock);

router.post('/weekly-task', adminController.addWeeklyTask);
router.get('/weekly-tasks', adminController.getAllWeeklyTasks);
router.put('/weekly-task/edit', adminController.updateWeeklyTask);
router.delete('/weekly-task/delete', adminController.removeWeeklyTask);

router.post('/weekly-task/add-week', adminController.addTaskToCourse)

export default router;
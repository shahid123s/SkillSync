import express from 'express';
import { createTask } from './weeklyTaskController.js';

const router = express.Router();

router.post('/weeklyTask', createTask);



export default router;
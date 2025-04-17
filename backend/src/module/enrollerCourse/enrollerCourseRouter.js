import express from 'express';
import { enrollerCourseController } from './enrollerCourseController.js';


const router = express.Router();


router.post('/purchase', enrollerCourseController.paymentSuccess);

export default router;
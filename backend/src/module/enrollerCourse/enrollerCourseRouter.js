import express from 'express';
import { enrollerCourseController } from './enrollerCourseController.js';


const router = express.Router();


router.post('/payment-success', enrollerCourseController.paymentSuccess);

export default router;
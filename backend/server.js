import express from 'express';
import cookieParser from 'cookie-parser';
import connectMongoDb from './src/config/dbConfig.js';
import corsConfig from './src/config/corsConfig.js';
import {appConfig} from './src/config/appConfig.js';
import errorHandler from './src/middleware/errorHandlerMiddleware.js';


// Routers
import {adminAuthRouter, reviewerAuthRouter, userAuthRouter} from './src/module/auth/authRoute.js'
import courseRouter from './src/module/course/courseRoute.js'
import studentRouter from './src/module/student/studentRoute.js'  
import adminRouter from './src/module/admin/adminRoute.js'
import reviewerRouter from './src/module/reviwer/reviwerRoute.js'
import couresReviewRouter from './src/module/courseReview/courseReviewRoute.js'
import enrolledCourseRouter from './src/module/enrollerCourse/enrollerCourseRouter.js'
import morgan from 'morgan';
import { AuthenticateReviewer, AuthenticateUser } from './src/middleware/authenticateMiddleware.js';
const {port} = appConfig.app

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(corsConfig);
app.use(morgan('dev'))

app.use('/api/auth/student', userAuthRouter )
app.use('/api/reviewer/auth', reviewerAuthRouter)
app.use('/api/admin/auth', adminAuthRouter)
app.use('/api/course',AuthenticateUser, courseRouter)
app.use('/api/student',AuthenticateUser, studentRouter)
app.use('/api/course-enrollment', AuthenticateUser, enrolledCourseRouter)
app.use('/api/course-review/', couresReviewRouter )
app.use('/api/reviewer', AuthenticateReviewer, reviewerRouter)
app.use('/api/admin', adminRouter)

app.use(errorHandler)
console.log('here')


app.listen(port, async () => {
  try {
    await connectMongoDb();
    process.stdout.write(`Server is running on port ${port}\n`);
  } catch (error) {
    process.stderr.write(`Failed to start server: ${error.message}\n`);
    process.exit(1);
  }
});

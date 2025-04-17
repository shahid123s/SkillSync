import { enrollerCourseController } from './enrollerCourseController.js';
import EnrolledCourse from './enrollerCourseModel.js';

const enrolledCourseRepository = {
    getCourseByStudentId: async (studentId) => {
        try {
            const courses = await EnrolledCourse.find({ studentId }).lean();
            return courses;
        } catch (error) {
            throw new Error('Failed to get courses by student ID');
        }
    },
    enrollerCourse: async ({ courseId, paymentStatus, price, userId }) => {
        try {
            const course = await EnrolledCourse.create({
                courseId,
                paymentStatus,
                price,
                studentId: userId
            });
            return course;
        } catch (error) {
            throw new Error('Failed to enroll in course');
        }
    }
};

export default enrolledCourseRepository;
import EnrolledCourse from './enrollerCourseModel.js';

const enrolledCourseRepository = {
    getCourseByStudentId: async (studentId) => {
        try {
            const courses = await EnrolledCourse.find({ studentId, paymentStatus: 'success'}).populate('courseId').lean();
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
            console.error('Error enrolling in course:', error);
            throw new Error('Failed to enroll in course');
        }
    },
    checkIsBought: async (courseId, userId) => {
        try {
            const course = await EnrolledCourse.findOne({ courseId, studentId: userId , paymentStatus: 'success'});
            return course;
        } catch (error) {
            throw new Error('Failed to check if course is bought');
        }
    },
    isExist: async ({courseId, userId}) => {
        try {
            const course = await EnrolledCourse.findOne({ courseId, studentId: userId });
            return course;
        } catch (error) {
            throw new Error('Failed to check if course is bought');
        }
    }
};

export default enrolledCourseRepository;
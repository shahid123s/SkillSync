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
};

export default enrolledCourseRepository;
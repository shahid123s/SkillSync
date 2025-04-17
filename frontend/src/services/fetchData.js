import { toast } from "sonner";
import { userAxiosInstance } from "../utils/userAxiosInstance";

export const fetchCourseDetails = async (courseId) => {
    try {
        const response = await userAxiosInstance.get('/course/get-course', {
            params: {courseId}
        });
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message || 'Network Failed')
        return error.response.data.message;
    }
}

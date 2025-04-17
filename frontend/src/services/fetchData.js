import { toast } from "sonner";
import { userAxiosInstance } from "../utils/userAxiosInstance";
import { reviewerAxiosInstance } from "../utils/reviewerAxiosInstance";

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


export const fetchReviewerData = async (reviewerId) => {
    try {
        
        const response  = await reviewerAxiosInstance.get('/profile', {
            params : {reviewerId}
        })
        return response.data.data; 

    } catch (error) {
        toast.error(error.response.data.message|| 'Network Error');
        return error.response.data.message
    }
}

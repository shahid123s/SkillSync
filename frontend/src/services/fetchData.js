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
        if(!response.data.success){
            toast.error(response.data.message);
            return ;
        }
        return response.data.data; 

    } catch (error) {
        toast.error(error.response.data.message|| 'Network Error');
        // return error.response.data.message
    }
}

export const fetchPurchasedCourses = async (userId) => {
    try {
        const response = await userAxiosInstance.get(`/course/student`);
        return response.data.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to load courses");
    }
}

export const fetchReviewerStatus = async () => {
    try {
        const response = await reviewerAxiosInstance.get('/status');
        if(!response.data.success){
            toast.error(response.data.message);
            return ;
        }
        return response.data.data;
    } catch (error) {
        toast.error(error.response.data.message || 'Network Error');
        // return error.response.data.message
    }
}

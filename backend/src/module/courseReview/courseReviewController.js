import { courseReviewServices } from "./courseReviewService.js";


const createCourseReview = async (req, res, next) => {
    const {reviewData} = req.body;
    const {userId} = req.user;
    try {

    const result = await courseReviewServices.createCourseReview({...reviewData, userId});
    res.status(201).json({
      success: true,
      message: "Course review created successfully", 
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCourseReviews = async (req, res, next) => {
    const {courseId} = req.params;
  try {
    
    const result = await courseReviewServices.getAllCourseReview(courseId);
    if(!result) {
        return res.status(404).json({
            success: false,
            message: "Course reviews not found"
        })
    }
    res.status(200).json({
      success: true,
      message: "Course reviews fetched successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getCourseReviewByUser = async (req, res, next) => {
  try {
    const {userId} = req.user;
    const result = await courseReviewServices.getCourseReviewBYUser(userId);
    if(!result) {
        return res.status(404).json({
            success: false,
            message: "Course review not found"
        })
    }
    res.status(200).json({
      success: true,
      message: "Course review fetched successfully",
      data : result,
    });
  } catch (error) {
    next(error);
  }
};

const updateCourseReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    // TODO: Add logic to update course review
    res.status(200).json({
      success: true,
      message: "Course review updated successfully"
    });
  } catch (error) {
    next(error);
  }
};

const deleteCourseReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const result = await courseReviewServices.deleteCourseReview(reviewId);
    if(!result) {
        return res.status(404).json({
            success: false,
            message: "Course review not found"
        })
    }
    res.status(200).json({
      success: true,
      message: "Course review deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

export {
  createCourseReview,
  getAllCourseReviews,
  getCourseReviewByUser,
  updateCourseReview,
  deleteCourseReview
};

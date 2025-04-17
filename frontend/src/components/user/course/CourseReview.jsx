import PropTypes from 'prop-types';
import { memo } from 'react';

function CourseReviewItem({ review }) {
  const safeReview = {
    id: review.id,
    name: review.name || 'Anonymous',
    avatar: review.avatar || '/placeholder.svg',
    date: review.date || 'Recently',
    content: review.content || 'No review content provided'
  };

  return (
    <div 
      className="bg-blue-50 rounded-lg p-6 hover:shadow-sm transition-shadow duration-200"
      data-review-id={safeReview.id}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={safeReview.avatar}
            alt={`${safeReview.name}'s avatar`}
            width={40}
            height={40}
            className="rounded-full"
            onError={(e) => {
              e.target.src = '/placeholder.svg';
            }}
          />
          <span className="font-medium">
            {safeReview.name}
          </span>
        </div>
        <div className="text-xs text-gray-500">
          {safeReview.date}
        </div>
      </div>
      <p className="text-sm" style={{ wordBreak: 'break-word' }}>
        {safeReview.content}
      </p>
    </div>
  );
}

CourseReviewItem.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    avatar: PropTypes.string,
    date: PropTypes.string,
    content: PropTypes.string.isRequired
  }).isRequired
};

const MemoizedReviewItem = memo(CourseReviewItem);

function CourseReviews({ reviews = [] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              No reviews available yet. Be the first to review!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-8" data-testid="course-reviews">
      {reviews.map((review) => (
        <MemoizedReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
}

CourseReviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string,
      avatar: PropTypes.string,
      date: PropTypes.string,
      content: PropTypes.string.isRequired
    })
  )
};

CourseReviews.defaultProps = {
  reviews: []
};

export default memo(CourseReviews);
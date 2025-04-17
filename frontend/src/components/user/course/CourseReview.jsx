import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function CourseReviews({ reviews = [] }) {
  // Debugging useEffect
  useEffect(() => {
    console.group('CourseReviews Component Debug');
    console.log('Received reviews:', reviews);
    
    if (!Array.isArray(reviews)) {
      console.error('Invalid reviews prop: Expected array, received', typeof reviews);
    } else {
      reviews.forEach((review, index) => {
        if (!review.id) {
          console.warn(`Review at index ${index} is missing an id`);
        }
        if (!review.content) {
          console.warn(`Review at index ${index} has empty content`);
        }
      });
    }
    
    console.groupEnd();
  }, [reviews]);

  // Default empty state
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
      {reviews.map((review) => {
        // Validate review object structure
        const safeReview = {
          id: review.id || `temp-id-${Math.random().toString(36).substr(2, 9)}`,
          name: review.name || 'Anonymous',
          avatar: review.avatar || '/placeholder.svg',
          date: review.date || 'Recently',
          content: review.content || 'No review content provided'
        };

        return (
          <div 
            key={safeReview.id} 
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
                    // console.warn(`Failed to load avatar for review ${safeReview.id}`);
                  }}
                />
                <span className="font-medium" data-testid="reviewer-name">
                  {safeReview.name}
                </span>
              </div>
              <div className="text-xs text-gray-500" data-testid="review-date">
                {safeReview.date}
              </div>
            </div>
            <p 
              className="text-sm" 
              data-testid="review-content"
              style={{ wordBreak: 'break-word' }}
            >
              {safeReview.content}
            </p>
            
            {/* Debug info badge - only visible in development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-2 text-xs text-gray-500">
                Review ID: {safeReview.id}
              </div>
            )}
          </div>
        );
      })}
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
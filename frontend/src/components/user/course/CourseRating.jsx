import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

function CourseRating({ 
  averageRating = 0, 
  ratingDistribution = {} 
}) {
  const normalizedDistribution = useMemo(() => {
    return [5, 4, 3, 2, 1].reduce((acc, stars) => {
      const value = ratingDistribution[stars] || 0;
      acc[stars] = Math.min(Math.max(value, 0), 100);
      return acc;
    }, {});
  }, [ratingDistribution]);

  const calculatedAverage = useMemo(() => {
    return typeof averageRating === 'number' 
      ? Math.min(Math.max(averageRating, 0), 5).toFixed(1)
      : '0.0';
  }, [averageRating]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      {/* Rating Summary */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold" data-testid="average-rating">
              {calculatedAverage}
            </div>
            <div className="text-sm text-gray-500">out of 5</div>
          </div>

          {/* Rating Bars */}
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-2 mb-1">
                <div className="text-xs w-8">
                  {stars} Star{stars !== 1 ? 's' : ''}
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="bg-teal-500 h-full rounded-full" 
                    style={{ 
                      width: `${normalizedDistribution[stars]}%`,
                      minWidth: '3px'
                    }}
                    role="progressbar"
                    aria-valuenow={normalizedDistribution[stars]}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <span className="text-xs w-8 text-gray-500">
                  {normalizedDistribution[stars]}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

CourseRating.propTypes = {
  averageRating: PropTypes.number,
  ratingDistribution: PropTypes.shape({
    1: PropTypes.number,
    2: PropTypes.number,
    3: PropTypes.number,
    4: PropTypes.number,
    5: PropTypes.number
  })
};

CourseRating.defaultProps = {
  averageRating: 0,
  ratingDistribution: {}
};

export default React.memo(CourseRating);
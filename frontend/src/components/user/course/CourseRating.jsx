import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

export default function CourseRating({ 
  averageRating = 0, 
  ratingDistribution = {} 
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [debugInfo, setDebugInfo] = useState(null);

  // Debugging effect
  useEffect(() => {
    console.log('Component mounted with props:', {
      averageRating,
      ratingDistribution
    });

    // Set debug info for display
    setDebugInfo({
      propsReceived: {
        averageRating,
        ratingDistribution
      },
      calculatedValues: {
        isValidAverage: typeof averageRating === 'number' && averageRating >= 0 && averageRating <= 5,
        hasRatingData: Object.keys(ratingDistribution).length > 0
      }
    });

    return () => {
      console.log('Component unmounted');
    };
  }, [averageRating, ratingDistribution]);

  // Validate and normalize rating distribution
  const normalizedDistribution = [5, 4, 3, 2, 1].reduce((acc, stars) => {
    const value = ratingDistribution[stars];
    acc[stars] = typeof value === 'number' ? Math.min(Math.max(value, 0), 100) : 0;
    return acc;
  }, {});

  // Calculate average if not provided
  const calculatedAverage = typeof averageRating === 'number' 
    ? Math.min(Math.max(averageRating, 0), 5).toFixed(1)
    : '0.0';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      {/* Debug Info Panel - Visible in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-4 p-3 bg-gray-100 rounded text-xs">
          <h3 className="font-bold mb-1">Debug Info:</h3>
          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
          <div className="mt-2">
            <p>Normalized Distribution: {JSON.stringify(normalizedDistribution)}</p>
            <p>Calculated Average: {calculatedAverage}</p>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="grid grid-cols-4 mb-6">
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === "overview" 
              ? "border-b-2 border-teal-500 text-teal-500" 
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("overview")}
          aria-label="Show overview tab"
        >
          Overview
        </button>
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Rating Summary */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div 
                className="text-2xl font-bold"
                data-testid="average-rating"
              >
                {calculatedAverage}
              </div>
              <div className="text-sm text-gray-500">out of 5</div>
            </div>

            {/* Rating Bars */}
            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div 
                  key={stars} 
                  className="flex items-center gap-2 mb-1"
                  data-testid={`rating-bar-${stars}`}
                >
                  <div className="text-xs w-8">
                    {stars} Star{stars !== 1 ? 's' : ''}
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="bg-teal-500 h-full rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${normalizedDistribution[stars]}%`,
                        minWidth: '3px' // Ensure tiny percentages are visible
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

          <div className="text-sm text-gray-500">Top Rating</div>
        </div>
      )}
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
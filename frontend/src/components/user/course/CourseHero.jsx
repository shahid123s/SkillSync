import PropTypes from 'prop-types';
import { useMemo } from 'react';

function CourseHero({
  name = "Course Title",
  description = "Course description goes here",
  imageUrl,
  price = 0,
  offerPrice = 0,
  discountPercentage = 0,
  hoursLeft = 0,
  features = []
}) {


  const defaultImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0sWdtPw8W9NK61Kmn7EsqhBdbA7wXK.png";

  const calculatedDiscount = useMemo(() => {
    return discountPercentage || 
      Math.round(((price - offerPrice) / price) * 100);
  }, [discountPercentage, price, offerPrice]);

  return (
    <div className="relative w-full" data-testid="course-hero">
      {/* Hero Image Section */}
      <div className="w-full h-[300px] md:h-[400px] relative">
        <img
          src={imageUrl || defaultImage}
          alt={name}
          className="w-full h-full object-cover brightness-90"
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-20 md:-mt-32 flex flex-col lg:flex-row gap-8">
          {/* Left Column - Course Info */}
          <div className="lg:w-2/3">
            <h1 className="text-3xl font-bold mb-4">{name}</h1>
            <p className="text-gray-600 mb-6">{description}</p>
          </div>
          
          {/* Right Column - Pricing Card */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
              {/* Price Display */}
              <div className="flex items-baseline justify-between mb-4">
                <div className="text-2xl font-bold">
                  ${offerPrice.toFixed(2)}
                </div>
                {price > offerPrice && (
                  <>
                    <div className="text-gray-500 line-through text-sm">
                      ${price.toFixed(2)}
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                      {calculatedDiscount}% Off
                    </div>
                  </>
                )}
              </div>

              {/* Time Left */}
              {hoursLeft > 0 && (
                <div className="text-xs text-gray-500 mb-4">
                  {hoursLeft} hours left at this price
                </div>
              )}

              {/* CTA Button */}
              <button 
                className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded mb-6 transition-colors duration-200"
                aria-label="Buy this course"
              >
                Buy Now
              </button>

              {/* Features List */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">This Course Includes</h3>
                <div className="space-y-2">
                  {features.length > 0 ? (
                    features.map((feature, index) => (
                      <div key={`feature-${index}`} className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-teal-500 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No features listed</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CourseHero.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.number,
  offerPrice: PropTypes.number,
  discountPercentage: PropTypes.number,
  hoursLeft: PropTypes.number,
  features: PropTypes.arrayOf(PropTypes.string),
};

CourseHero.defaultProps = {
  features: []
};

export default CourseHero;
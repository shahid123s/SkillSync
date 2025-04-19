// components/admin/CourseForm.jsx
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function CourseForm({ isOpen, onClose, course, onSave }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [isUploading, setIsUploading] = useState(false);

  const hasOffer = watch('hasOffer');
  const price = watch('price');
  const offerPrice = watch('offerPrice');
  const imageUrl = watch('imageUrl');

  // Initialize form
  useEffect(() => {
    if (isOpen) {
      if (course) {
        reset({
          ...course,
          hasOffer: course.offerPrice > 0 && course.offerPrice !== null,
        });
      } else {
        reset({
          name: '',
          description: '',
          imageUrl: '',
          price: 0,
          offerPrice: 0,
          hasOffer: false,
          status: 'draft',
        });
      }
    }
  }, [isOpen, course, reset]);

  // Cloudinary upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'SkillSyncCourse'); // replace with your actual preset

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dhz6o6ehr/image/upload', // replace with your actual cloud name
        formData
      );

      reset({ ...watch(), imageUrl: response.data.secure_url });
    } catch (err) {
      console.error('Image upload failed:', err);
    } finally {
      setIsUploading(false);
    }
  };

  // Form submission
  const onSubmit = (data) => {
    const finalData = {
      ...data,
      price: Number(data.price),
      offerPrice: data.hasOffer ? Number(data.offerPrice) : null,
    };
    onSave(finalData);
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isOpen ? '' : 'hidden'} z-50`}>
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">{course ? 'Edit Course' : 'Create New Course'}</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 p">Course Name*</label>
              <input
                {...register('name', { required: 'Course name is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 p-2"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register('description')}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Course Image</label>
              <div className="mt-1 flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm file:py-2 file:px-4 file:rounded-md file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                />
              </div>
              {imageUrl && (
                <div className="mt-2">
                  <img
                    src={imageUrl}
                    alt="Course preview"
                    className="h-32 w-full object-cover rounded-md border"
                  />
                </div>
              )}
              {isUploading && <p className="text-sm text-blue-600">Uploading...</p>}
            </div>

            {/* Pricing */}
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-sm font-medium text-gray-900">Pricing (₹)</h3>

              {/* Regular Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Regular Price*</label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">₹</div>
                  <input
                    {...register('price', {
                      required: 'Price is required',
                      min: { value: 0, message: 'Price must be positive' },
                      valueAsNumber: true,
                    })}
                    type="number"
                    className="pl-7 pr-12 w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 p-2"
                    placeholder="0"
                  />
                </div>
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
              </div>

              {/* Offer */}
              <div>
                <div className="flex items-center">
                  <input
                    {...register('hasOffer')}
                    type="checkbox"
                    id="hasOffer"
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 p-2"
                  />
                  <label htmlFor="hasOffer" className="ml-2 text-sm text-gray-700">
                    Enable Special Offer
                  </label>
                </div>

                {hasOffer && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Offer Price*</label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">₹</div>
                      <input
                        {...register('offerPrice', {
                          required: 'Offer price is required',
                          min: { value: 0, message: 'Offer must be positive' },
                          max: {
                            value: price || 0,
                            message: 'Offer must be less than regular price',
                          },
                          valueAsNumber: true,
                        })}
                        type="number"
                        className="pl-7 pr-12 w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 p-2"
                        placeholder="0"
                      />
                    </div>
                    {errors.offerPrice && (
                      <p className="text-red-500 text-xs mt-1">{errors.offerPrice.message}</p>
                    )}
                    {offerPrice >= price && (
                      <p className="text-yellow-600 text-xs mt-1">Offer price should be less than price</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                {...register('status')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 p-2"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Course'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
// components/admin/PendingReviewsTable.jsx
import { User, Calendar, Book, Info } from 'lucide-react';
import { useState } from 'react';

export const PendingReviewsTable = ({ reviews, onAction, processingId }) => {
    const [selectedReview, setSelectedReview] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [meetLink, setMeetLink] = useState('');

    const handleSubmit = (action) => {
        if (action === 'accepted' && (!feedback || !meetLink)) {
            alert('Feedback and Meet link are required for acceptance');
            return;
        }
        onAction(selectedReview._id, action, feedback, meetLink);
        setSelectedReview(null);
    };

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                {/* Table header */}
                <tbody className="bg-white divide-y divide-gray-200">
                    {reviews.map((review) => (
                        <tr key={review._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <User className="h-5 w-5 text-gray-400 mr-2" />
                                    {review.studentId.name}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">Week {review.week}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Book className="h-5 w-5 text-gray-400 inline mr-2" />
                                {review.taskId.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Calendar className="h-5 w-5 text-gray-400 inline mr-2" />
                                {new Date(review.reviewDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={() => setSelectedReview(review)}
                                    className="text-teal-600 hover:text-teal-900 mr-4"
                                    disabled={processingId === review._id}
                                >
                                    <Info className="h-5 w-5 inline" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Action Modal */}
            {selectedReview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Review Actions</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Feedback</label>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    className="mt-1 block w-full border rounded-md p-2"
                                    rows="3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Meet Link</label>
                                <input
                                    type="url"
                                    value={meetLink}
                                    onChange={(e) => setMeetLink(e.target.value)}
                                    className="mt-1 block w-full border rounded-md p-2"
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setSelectedReview(null)}
                                    className="px-4 py-2 border rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleSubmit('accepted')}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleSubmit('repeat')}
                                    className="px-4 py-2 bg-yellow-600 text-white rounded-md"
                                >
                                    Repeat
                                </button>
                                <button
                                    onClick={() => handleSubmit('cancelled')}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
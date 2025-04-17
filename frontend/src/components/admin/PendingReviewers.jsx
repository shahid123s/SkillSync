// components/admin/PendingReviewers.jsx
export default function PendingReviewers({ reviewers, onAction }) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reviewers.map(reviewer => (
              <tr key={reviewer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{reviewer.fullname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reviewer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => onAction(reviewer.id, 'approve')}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => onAction(reviewer.id, 'reject')}
                    className="px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
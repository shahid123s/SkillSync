// pages/user/WeeklyTaskPage.jsx
import React, { useState, useEffect } from "react";
import { X, RefreshCw, Clock, FileText, ExternalLink } from "lucide-react";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import { fetchWeeklyTasks, fetchCompletedReviews, fetchReviews, upcommingReviews } from "../../services/fetchData";


function formatDate (dateString)  {
  console.log(dateString, 'date')
  const futureDate = new Date(dateString.getTime() + 7 * 24 * 60 * 60 * 1000);

// Format as dd mm yy
const dd = String(futureDate.getDate()).padStart(2, '0');
const mm = String(futureDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
const yy = String(futureDate.getFullYear()).slice(-2);

const formattedDate = `${dd}-${mm}-${yy}`;
}

const WeeklyTaskPage = () => {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [upcomingTask, setUpcomingTask] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingDummyData, setUsingDummyData] = useState(false);
  
  // Dummy data definitions
  const dummyUpcomingTask = {
    id: 'dummy-1',
    weekNumber: '5',
    status: 'Scheduled',
    reviewDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    reviewer: 'John Doe',
    googleMeetLink: 'https://meet.google.com/abc-defg-hij',
    task: 'Complete the user authentication module and prepare for code review.'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const result = await upcommingReviews();
        if (result) {
          setUpcomingTask(result);
          console.log(result)
        } else {
          loadDummyData();
        }

      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(err.message);
        loadDummyData();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab])


  const dummyCompletedTasks = [
    {
      id: 'dummy-c-1',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      weekNumber: '4',
      reviewer: 'Jane Smith',
      type: 'Technical',
      status: 'Passed',
      details: {
        mark: '8',
        feedback: 'Good work on the frontend components. Need to improve error handling in the API calls.'
      }
    },
    {
      id: 'dummy-c-2',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      weekNumber: '3',
      reviewer: 'Mike Johnson',
      type: 'Technical',
      status: 'Repeat',
      details: {
        mark: '5',
        feedback: 'Several bugs were found in the implementation. Please fix and resubmit for review.'
      }
    },
    {
      id: 'dummy-c-3',
      date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      weekNumber: '2',
      reviewer: 'Sarah Williams',
      type: 'Technical',
      status: 'Passed',
      details: {
        mark: '9',
        feedback: 'Excellent work! Very clean code and good documentation.'
      }
    }
  ];

  const loadDummyData = () => {
    setUsingDummyData(true);
    if (selectedTab === 'upcoming') {
      setUpcomingTask(dummyUpcomingTask);
    } else {
      setCompletedTasks(dummyCompletedTasks);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setUsingDummyData(false);
        
        if (selectedTab === 'upcoming') {
          const taskData = await fetchWeeklyTasks();
          setUpcomingTask(taskData || dummyUpcomingTask);
          if (!taskData) setUsingDummyData(true);
        } else {
          const reviewsData = await fetchCompletedReviews();
          setCompletedTasks(reviewsData || dummyCompletedTasks);
          if (!reviewsData) setUsingDummyData(true);
        }
        
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(err.message);
        loadDummyData();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab]);

  const refreshData = async () => {
    try {
      setLoading(true);
      setUsingDummyData(false);
      
      if (selectedTab === 'upcoming') {
        const taskData = await fetchWeeklyTasks();
        setUpcomingTask(taskData || dummyUpcomingTask);
        if (!taskData) setUsingDummyData(true);
      } else {
        const reviewsData = await fetchCompletedReviews();
        setCompletedTasks(reviewsData || dummyCompletedTasks);
        if (!reviewsData) setUsingDummyData(true);
      }
    } catch (err) {
      console.error("Failed to refresh data:", err);
      setError(err.message);
      loadDummyData();
    } finally {
      setLoading(false);
    }
  };

  const TaskDetailsModal = ({ isOpen, onClose, details }) => (
    isOpen && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-center w-full">REVIEW DETAILS</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex gap-2 mb-4">
              <button 
                className={`flex-1 py-2 text-sm ${selectedTab === 'marks' ? 
                  'border-b-2 border-teal-600 text-teal-600' : 'text-gray-500'}`}
                onClick={() => setSelectedTab('marks')}
              >
                Marks
              </button>
              <button 
                className={`flex-1 py-2 text-sm ${selectedTab === 'feedback' ? 
                  'border-b-2 border-teal-600 text-teal-600' : 'text-gray-500'}`}
                onClick={() => setSelectedTab('feedback')}
              >
                Feedback
              </button>
            </div>

            {selectedTab === 'marks' ? (
              details?.mark ? (
                <div className="border rounded-md p-4 mb-4">
                  <div className="font-medium">Mark: {details.mark}/10</div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-4">No mark available</div>
              )
            ) : (
              details?.feedback ? (
                <div className="border rounded-md p-4">
                  <p>{details.feedback}</p>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-4">No feedback available</div>
              )
            )}
          </div>

          <div className="flex justify-center mt-6">
            <button 
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md transition-colors"
              onClick={onClose}
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    )
  );

  const CompletedTasks = () => {
    const getStatusStyle = (status) => {
      const styles = {
        Passed: 'bg-green-100 text-green-800',
        Repeat: 'bg-red-100 text-red-800',
        Absent: 'bg-yellow-100 text-yellow-800'
      };
      return styles[status] || 'bg-gray-100 text-gray-800';
    };

    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600"></div>
        </div>
      );
    }

    if (error && !usingDummyData) {
      return (
        <div className="text-center text-red-600 py-8">
          <p>Error loading completed tasks: {error}</p>
          <button 
            onClick={refreshData}
            className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md"
          >
            Retry
          </button>
        </div>
      );
    }

    return (
      <div className="rounded-md border overflow-hidden">
        {completedTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No completed reviews yet
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 text-center p-3 text-sm font-medium">Sl No</th>
                <th className="text-left p-3 text-sm font-medium">Date</th>
                <th className="text-left p-3 text-sm font-medium">Week</th>
                <th className="text-left p-3 text-sm font-medium">Reviewer</th>
                <th className="text-left p-3 text-sm font-medium">Type</th>
                <th className="text-left p-3 text-sm font-medium">Status</th>
                <th className="text-center p-3 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((task, index) => (
                <tr key={task.id} className="border-t">
                  <td className="text-center p-3">{index + 1}</td>
                  <td className="p-3">{task.date}</td>
                  <td className="p-3">{task.weekNumber}</td>
                  <td className="p-3">{task.reviewer}</td>
                  <td className="p-3">{task.type}</td>
                  <td className="p-3">
                    <span className={`${getStatusStyle(task.status)} px-2 py-1 rounded-full text-xs`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="text-center p-3">
                    <button 
                      className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-md text-xs"
                      onClick={() => setSelectedTaskId(task.id)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  const UpcomingTask = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600"></div>
        </div>
      );
    }

    if (error && !usingDummyData) {
      return (
        <div className="text-center text-red-600 py-8">
          <p>Error loading upcoming task: {error}</p>
          <button 
            onClick={refreshData}
            className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md"
          >
            Retry
          </button>
        </div>
      );
    }

    if (!upcomingTask) {
      return (
        <div className="bg-gray-100 border-0 rounded-lg p-6 text-center">
          <p className="text-gray-700">No upcoming reviews scheduled</p>
        </div>
      );
    }

    return (
      <div className="bg-gray-100 border-0 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <span className={`bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm 
                          flex items-center gap-1`}>
            <Clock className="h-4 w-4" />
            {upcomingTask.status || 'Not Scheduled'}
          </span>
          <h2 className="text-xl font-semibold">Week {Number(upcomingTask.week) + 1 }</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-md p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Review Date</p>
            <p className="font-medium">{upcomingTask.reviewDate.split('T')[0]|| 'Not scheduled'}</p>
          </div>
          <div className="bg-white rounded-md p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Reviewer</p>
            <p className="font-medium">{upcomingTask.reviewer || 'Not assigned'}</p>
          </div>
        </div>

        {upcomingTask.googleMeetLink && (
          <div className="bg-white rounded-md p-4 shadow-sm mb-4">
            <div className="flex items-center gap-2 mb-2">
              <ExternalLink className="h-4 w-4 text-gray-500" />
              <p className="text-sm text-gray-500">Meeting Link</p>
            </div>
            <a 
              href={upcomingTask.googleMeetLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal-600 hover:text-teal-800 font-medium break-all"
            >
              Join Google Meet
            </a>
          </div>
        )}

        <div className="bg-white rounded-md p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-4 w-4 text-gray-500" />
            <p className="text-sm text-gray-500">Task Details</p>
          </div>
          <p className="font-medium">{upcomingTask?.taskId?.description || 'No task details available'}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-6 px-4">
        

        <div className="border-b mb-6">
          <div className="flex gap-8">
            <button
              className={`pb-2 px-1 ${selectedTab === 'upcoming' ? 
                'border-b-2 border-teal-600 text-teal-600' : 'text-gray-500'}`}
              onClick={() => setSelectedTab('upcoming')}
            >
              UPCOMING
            </button>
            <button
              className={`pb-2 px-1 ${selectedTab === 'completed' ? 
                'border-b-2 border-teal-600 text-teal-600' : 'text-gray-500'}`}
              onClick={() => setSelectedTab('completed')}
            >
              COMPLETED
            </button>
          </div>
        </div>

        {selectedTab === 'upcoming' ? <UpcomingTask /> : <CompletedTasks />}
        
        <TaskDetailsModal 
          isOpen={!!selectedTaskId} 
          onClose={() => setSelectedTaskId(null)}
          details={completedTasks.find(t => t.id === selectedTaskId)?.details} 
        />
      </main>

      <Footer />
    </div>
  );
};

export default WeeklyTaskPage;
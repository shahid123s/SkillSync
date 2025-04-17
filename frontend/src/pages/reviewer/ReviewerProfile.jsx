// pages/reviewer/ReviewerProfile.jsx
import { useEffect, useState } from 'react';
import ReviewerSidebar from '../../components/reviewer/ReviewerSidebar';
import { fetchReviewerData } from '../../services/fetchData';
import { toast } from 'sonner';

export default function ReviewerProfile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    certificates: [],
    experience: '',
  });

    useEffect(  () => {
      
      (async function(){
        const result  = await fetchReviewerData()
      
        setProfile(result)
      })()
      
    },[])

  return (
    <div className="min-h-screen flex">
      <ReviewerSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-0 md:ml-64' : 'ml-0'}`}>
        <div className="p-6">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden mb-4 p-2 bg-gray-200 rounded-lg"
          >
            ☰
          </button>

          <h1 className="text-2xl font-bold mb-6">Profile</h1>
          
          <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
            <div className="space-y-4">
              <div className="pb-4 border-b">
                <label className="block text-sm font-medium text-gray-600">Full Name</label>
                <p className="mt-1 text-lg">{profile.fullname}</p>
              </div>
              
              <div className="pb-4 border-b">
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <p className="mt-1 text-lg">{profile.email}</p>
              </div>
              
              <div className="pb-4 border-b">
                <label className="block text-sm font-medium text-gray-600">Phone</label>
                <p className="mt-1 text-lg">{profile.phone}</p>
              </div>
              
              <div className="pb-4 border-b">
                <label className="block text-sm font-medium text-gray-600">Certificates</label>
                <ul className="mt-1 space-y-1">
                  {profile.certificates.map((cert, index) => (
                  cert!= ''? <li key={index} className="text-lg">• {cert}</li>:''
                  ))}
                </ul>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600">Experience</label>
                <p className="mt-1 text-lg">{profile.experience}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Edit,
  Trash2,
  Briefcase,
  MapPin,
  Clock,
  Building,
  Users,
  IndianRupeeIcon as RupeeSign,
  Calendar,
} from 'lucide-react';
import RecruiterHeader from '../components/RecruiterHeader';

export default function RecruiterJobDetailPage() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      const token = localStorage.getItem('rtoken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const jobResponse = await fetch(`http://localhost:5000/recruiter/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const jobData = await jobResponse.json();
        if (jobResponse.ok) {
          setJob(jobData.job);
        } else {
          alert(jobData.message || 'Failed to fetch job details');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
        alert('Something went wrong');
      }
    };

    fetchJobDetails();
  }, [jobId, navigate]);

  const handleEditJob = () => {
    navigate(`/editjob/${jobId}`, { state: { job } });
  };

  const handleDeleteJob = async () => {
    const token = localStorage.getItem('rtoken');
    if (!token) {
      navigate('/login');
      return;
    }

    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const response = await fetch(`http://localhost:5000/recruiter/jobs/${jobId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          alert('Job deleted successfully');
          navigate('/');
        } else {
          alert(data.message || 'Failed to delete job');
        }
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('Something went wrong while deleting the job');
      }
    }
  };

  const handleViewApplicants = () => {
    navigate(`/allapplicants/`);
  };

  const handleToggleStatus = async () => {
    const token = localStorage.getItem('rtoken');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const newState = job.state === 'active' ? 'inactive' : 'active';
      const response = await fetch(`http://localhost:5000/recruiter/jobs/status/${jobId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: newState }), // Update to 'state' only
      });

      const data = await response.json();
      if (response.ok) {
        setJob((prev) => ({ ...prev, state: newState }));
        alert(`Job marked as ${newState === 'active' ? 'Active' : 'Inactive'}`);
      } else {
        alert(data.message || 'Failed to update job status');
      }
    } catch (error) {
      console.error('Error updating job status:', error);
      alert('Something went wrong while updating the job status');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-100 pt-16">
      <RecruiterHeader />
      <div className="max-w-4xl mx-auto p-6">
        <AnimatePresence>
          {job ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-semibold mb-6 text-gray-800">{job.title}</h1>
              <div className="bg-white shadow rounded-md p-6 mb-6">
                <p style={{ whiteSpace: 'pre-line' }} className="text-base text-gray-700 mb-4">
                  {job.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center text-base text-gray-600">
                    <MapPin className="mr-2 text-indigo-500" size={20} />
                    <span>
                      <strong>Location:</strong> {job.location}
                    </span>
                  </div>
                  <div className="flex items-center text-base text-gray-600">
                    <Clock className="mr-2 text-indigo-500" size={20} />
                    <span>
                      <strong>Experience:</strong> {job.experience}
                    </span>
                  </div>
                  <div className="flex items-center text-base text-gray-600">
                    <Building className="mr-2 text-indigo-500" size={20} />
                    <span>
                      <strong>Company:</strong> {job.companyName}
                    </span>
                  </div>
                  <div className="flex items-center text-base text-gray-600">
                    <Briefcase className="mr-2 text-indigo-500" size={20} />
                    <span>
                      <strong>Job Type:</strong> {job.jobType}
                    </span>
                  </div>
                  <div className="flex items-center text-base text-gray-600">
                    <Users className="mr-2 text-indigo-500" size={20} />
                    <span>
                      <strong>Positions:</strong> {job.positions}
                    </span>
                  </div>
                  {job.salary && (
                    <div className="flex items-center text-base text-gray-600">
                      <RupeeSign className="mr-2 text-indigo-500" size={20} />
                      <span>
                        <strong>Salary:</strong> {job.salary}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center text-base text-gray-600">
                    <Calendar className="mr-2 text-indigo-500" size={20} />
                    <span>
                      <strong>Posted On:</strong> {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-base text-gray-600">
                    <Clock className="mr-2 text-indigo-500" size={20} />
                    <span>
                      <strong>Status:</strong> {job.state}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <motion.button
                  onClick={handleEditJob}
                  className="bg-yellow-500 text-white py-2 px-4 rounded-md text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Edit Job
                </motion.button>
                <motion.button
                  onClick={handleDeleteJob}
                  className="bg-red-500 text-white py-2 px-4 rounded-md text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Delete Job
                </motion.button>
                <motion.button
                  onClick={handleViewApplicants}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Applicants
                </motion.button>
                <motion.button
                  onClick={handleToggleStatus}
                  className="bg-green-500 text-white py-2 px-4 rounded-md text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {job.state === 'active' ? 'Mark Inactive' : 'Mark Active'}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-indigo-400"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

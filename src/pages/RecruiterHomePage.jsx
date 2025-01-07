import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Users, Search, PlusCircle, ChevronRight, Bell } from 'lucide-react'
import RecruiterHeader from '../components/RecruiterHeader'

export default function RecruiterHomePage() {
  const [jobs, setJobs] = useState([])
  const [recruiterName, setRecruiterName] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  // Fetch jobs and recruiter details
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('rtoken')
      if (!token) {
        navigate('/login')
        return
      }
      try {
        const jobResponse = await fetch('http://localhost:5000/recruiter/jobs', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const jobData = await jobResponse.json()
        if (jobResponse.ok) {
          setJobs(jobData)
        } else {
          alert(jobData.message || 'Failed to fetch jobs')
          navigate('/login')
        }

        const recruiterResponse = await fetch('http://localhost:5000/recruiter/details', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const recruiterData = await recruiterResponse.json()
        if (recruiterResponse.ok) {
          setRecruiterName(recruiterData.name)
        } else {
          alert(recruiterData.message || 'Failed to fetch recruiter details')
          navigate('/login')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        alert('Something went wrong while fetching data.')
      }
    }
    fetchData()
  }, [navigate])

  const handleJobClick = (jobId) => {
    navigate(`/job/${jobId}`)
  }

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-16">
      <RecruiterHeader />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-lg p-8 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {recruiterName || 'Recruiter'}
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center"
              onClick={() => navigate('/notifications')}
            >
              <Bell className="mr-2" size={18} />
              Notifications
            </motion.button>
          </div>
          <p className="text-gray-600 text-lg mb-6">
            Manage your posted jobs and track applications efficiently.
          </p>
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-white px-6 py-3 rounded-full flex items-center"
              onClick={() => navigate('/postjob')}
            >
              <PlusCircle className="mr-2" size={20} />
              Post New Job
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-500 text-white px-6 py-3 rounded-full flex items-center"
              onClick={() => navigate('/allapplicants')}
            >
              <Users className="mr-2" size={20} />
              View All Applications
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white shadow-lg rounded-lg p-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
              <Briefcase className="mr-2 text-blue-600" />
              Your Posted Jobs
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          <AnimatePresence>
            {filteredJobs.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out"
                    onClick={() => handleJobClick(job._id)}
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-blue-600 mb-2">{job.title}</h3>
                      <p className="text-gray-600 mb-4 h-20 overflow-hidden">{job.description.substring(0, 100)}...</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-gray-500">
                          <Users className="mr-2" size={18} />
                          <span>Applicants: {job.applicantCount}</span>
                        </div>
                        <ChevronRight className="text-blue-600" size={20} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-600 text-center py-8"
              >
                {searchTerm ? 'No jobs match your search.' : "You haven't posted any jobs yet."}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  )
}

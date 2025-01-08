import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, Filter, RefreshCw, ExternalLink } from 'lucide-react';
import RecruiterHeader from '../components/RecruiterHeader';

const RecruiterAllApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedApplicant, setExpandedApplicant] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('rtoken');
      if (!token) throw new Error('No token found');

      const [jobsResponse, applicantsResponse] = await Promise.all([
        fetch('https://urmila-webservice.onrender.com/recruiter/jobs', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('https://urmila-webservice.onrender.com/recruiter/applications', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!jobsResponse.ok || !applicantsResponse.ok) throw new Error('Unauthorized');

      const [jobsData, applicantsData] = await Promise.all([
        jobsResponse.json(),
        applicantsResponse.json(),
      ]);

      setJobs(jobsData);
      setApplicants(applicantsData);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('rtoken');
      if (!token) throw new Error('Token not found');

      const query = new URLSearchParams({
        jobId: selectedJob,
        status: selectedStatus,
      }).toString();

      const response = await fetch(`https://urmila-webservice.onrender.com/recruiter/applications?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Unauthorized');

      const filteredApplicants = await response.json();
      setApplicants(filteredApplicants);
    } catch (err) {
      setError('Error filtering applicants.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicantId, newStatus) => {
    const isConfirmed = window.confirm(`Are you sure you want to mark this applicant as ${newStatus}?`);
    if (!isConfirmed) return;

    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('rtoken');
      const response = await fetch(`https://urmila-webservice.onrender.com/recruiter/applications/${applicantId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      const updatedApplicant = await response.json();

      setApplicants((prevApplicants) =>
        prevApplicants.map((applicant) =>
          applicant._id === updatedApplicant._id ? updatedApplicant : applicant
        )
      );
    } catch (err) {
      console.error(err);
      setError('Failed to update applicant status');
    } finally {
      setLoading(false);
    }
  };

  const toggleApplicantDetails = (applicantId) => {
    setExpandedApplicant(expandedApplicant === applicantId ? null : applicantId);
  };

  const filteredApplicants = applicants.filter((applicant) =>
    applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.jobId?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pt-16">
      <RecruiterHeader />
      <main className="flex-1 p-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 space-y-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search applicants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <select
                  value={selectedJob}
                  onChange={(e) => setSelectedJob(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Jobs</option>
                  {jobs.map((job) => (
                    <option key={job._id} value={job._id}>
                      {job.title}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <button
                  onClick={handleFilter}
                  className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 flex items-center"
                >
                  <Filter size={20} className="mr-2" />
                  Apply Filters
                </button>
                <button
                  onClick={fetchData}
                  className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200 flex items-center"
                >
                  <RefreshCw size={20} className="mr-2" />
                  Refresh
                </button>
              </div>
            </div>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline"> {error}</span>
              </div>
            )}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredApplicants.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied At</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredApplicants.map((applicant) => (
                      <React.Fragment key={applicant._id}>
                        <tr className="hover:bg-gray-50 transition duration-150 ease-in-out">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{applicant.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{applicant.jobId?.title || 'N/A'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              applicant.status === 'Shortlisted' ? 'bg-green-100 text-green-800' :
                              applicant.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {applicant.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(applicant.appliedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleStatusChange(applicant._id, 'Shortlisted')}
                              className="text-green-600 hover:text-green-900 mr-2"
                            >
                              Shortlist
                            </button>
                            <button
                              onClick={() => handleStatusChange(applicant._id, 'Rejected')}
                              className="text-red-600 hover:text-red-900 mr-2"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => toggleApplicantDetails(applicant._id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              {expandedApplicant === applicant._id ? 'Hide Details' : 'Show Details'}
                            </button>
                          </td>
                        </tr>
                        <AnimatePresence>
                          {expandedApplicant === applicant._id && (
                            <motion.tr
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <td colSpan={6} className="px-6 py-4">
                                <div className="bg-gray-50 p-4 rounded-md">
                                  <h4 className="text-lg font-semibold mb-2">Additional Details</h4>
                                  <p><strong>Phone:</strong> {applicant.phone}</p>
                                  <p>
                                    <strong>LinkedIn:</strong>
                                    {applicant.linkedIn && (
                                      <a href={applicant.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                                        View Profile <ExternalLink size={14} className="inline" />
                                      </a>
                                    )}
                                  </p>
                                  <p>
                                    <strong>Portfolio:</strong>
                                    {applicant.portfolio && (
                                      <a href={applicant.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                                        View Portfolio <ExternalLink size={14} className="inline" />
                                      </a>
                                    )}
                                  </p>
                                  <p>
                                    <strong>Resume:</strong>
                                    {applicant.resumeLink && (
                                      <a href={applicant.resumeLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                                        View Resume <ExternalLink size={14} className="inline" />
                                      </a>
                                    )}
                                  </p>
                                  <div className="mt-2">
                                    <strong>Cover Letter:</strong>
                                    <p className="mt-1 text-sm text-gray-600">{applicant.coverLetter}</p>
                                  </div>
                                </div>
                              </td>
                            </motion.tr>
                          )}
                        </AnimatePresence>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p
 className="text-center py-4 text-gray-500">No applicants found matching your criteria.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecruiterAllApplicants;


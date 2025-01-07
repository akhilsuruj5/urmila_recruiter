import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import RecruiterHeader from "../components/RecruiterHeader"; // Adjust path as needed
import axios from "axios";

const RecruiterEditJob = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve jobData from location.state
  const jobData = location.state?.job || {
    title: "",
    description: "",
    location: "",
    experience: "",
    salary: "",
    companyName: "",
    recruiter: "",
    jobType: "Full-time",
    positions: 1,
    skills: [],
  };

  const [formData, setFormData] = useState({ ...jobData });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    setFormData((prev) => ({ ...prev, skills: updatedSkills }));
  };

  const addSkillField = () => {
    setFormData((prev) => ({ ...prev, skills: [...prev.skills, ""] }));
  };

  const removeSkillField = (index) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, skills: updatedSkills }));
  };

  // Function to update job details via API
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/recruiter/jobs/${formData._id}`, formData);

      if (response.status === 200) {
        // Successfully updated
        alert("Job details updated successfully!");
        navigate("/home"); // Redirect to job listing or relevant page
      }
    } catch (error) {
      console.error("Error updating job details:", error);
      alert("Failed to update job details. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pt-16">
      <RecruiterHeader />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="p-6 sm:p-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Edit Job Details
            </h1>
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Job Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Job Title<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-3 sm:text-sm border-gray-300 py-2 rounded-md"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Company Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    required
                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-3 sm:text-sm border-gray-300 py-2 rounded-md"
                    value={formData.companyName}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    required
                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-3 sm:text-sm border-gray-300 py-2 rounded-md"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Experience */}
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                    Experience<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="experience"
                    id="experience"
                    required
                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-3 sm:text-sm border-gray-300 py-2 rounded-md"
                    value={formData.experience}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Salary */}
                <div>
                  <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                    Salary
                  </label>
                  <input
                    type="text"
                    name="salary"
                    id="salary"
                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-3 sm:text-sm border-gray-300 py-2 rounded-md"
                    value={formData.salary}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Job Type */}
                <div>
                  <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
                    Job Type<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="jobType"
                    id="jobType"
                    required
                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-3 sm:text-sm border-gray-300 py-2 rounded-md"
                    value={formData.jobType}
                    onChange={handleInputChange}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                {/* Positions */}
                <div>
                  <label htmlFor="positions" className="block text-sm font-medium text-gray-700">
                    Positions<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="positions"
                    id="positions"
                    required
                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-3 sm:text-sm border-gray-300 py-2 rounded-md"
                    value={formData.positions}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Job Description<span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  required
                  className="focus:ring-green-500 focus:border-green-500 block w-full pl-3 sm:text-sm border-gray-300 py-2 rounded-md"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              {/* Required Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Required Skills<span className="text-red-500">*</span>
                </label>
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex mt-1">
                    <input
                      type="text"
                      value={skill}
                      required
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      className="focus:ring-green-500 py-2 px-2 focus:border-green-500 flex-1 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    {index === formData.skills.length - 1 ? (
                      <button
                        type="button"
                        onClick={addSkillField}
                        className="ml-2 inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200"
                      >
                        Add
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => removeSkillField(index)}
                        className="ml-2 inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-md"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default RecruiterEditJob;

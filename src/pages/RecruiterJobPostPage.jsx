import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Minus,
} from "lucide-react";
import RecruiterHeader from "../components/RecruiterHeader";

const RecruiterJobPostPage = () => {
  const [jobData, setJobData] = useState({
    title: "",
    companyName: "",
    location: "",
    salaryRange: "",
    experience: "",
    jobType: "",
    description: "",
    skills: [""],
    positions: 1,
    state: "active"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNumberChange = (e) => {
    const { value } = e.target;
    const numberValue = parseInt(value, 10);
    if (!isNaN(numberValue) && numberValue > 0) {
      setJobData((prevData) => ({
        ...prevData,
        positions: numberValue,
      }));
    }
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...jobData.skills];
    if (value.trim() || newSkills.length > 1) {
      newSkills[index] = value;
      setJobData((prevData) => ({
        ...prevData,
        skills: newSkills,
      }));
    }
  };

  const addSkillField = () => {
    setJobData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, ""],
    }));
  };

  const removeSkillField = (index) => {
    const newSkills = jobData.skills.filter((_, i) => i !== index);
    setJobData((prevData) => ({
      ...prevData,
      skills: newSkills,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Parse the JWT to get the recruiter ID
    const token = localStorage.getItem("rtoken");
    if (!token) {
      alert("You must be logged in to post a job.");
      return;
    }

    try {
      const payloadData = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      const recruiterId = payloadData.recruiterId; // Use recruiterId directly
      if (!recruiterId) {
        alert("Invalid token. Please log in again.");
        return;
      }

      const payload = { ...jobData, recruiter: recruiterId };

      // Validation for required fields
      const requiredFields = [
        "title",
        "companyName",
        "location",
        "experience",
        "jobType",
        "description",
        "positions",
      ];
      for (const field of requiredFields) {
        if (!jobData[field] && jobData[field] !== 0) {
          // 0 is a valid number
          alert(`${field} is required.`);
          return;
        }
      }

      if (jobData.skills.some((skill) => skill.trim() === "")) {
        alert("All skill fields must be filled out.");
        return;
      }

      const response = await fetch("https://urmila-webservice.onrender.com/recruiter/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in the request headers
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        alert("Job posted successfully!");
        handleCancel();
      } else {
        alert("Failed to post job. Please try again.");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job. Please try again.");
    }
  };

  const handleCancel = () => {
    setJobData({
      title: "",
      companyName: "",
      location: "",
      salaryRange: "",
      experience: "",
      jobType: "",
      description: "",
      skills: [""],
      positions: 1,
      state: "active" // Reset to initial value
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pt-16">
      {/* Header Component */}
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
              Post a New Job
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Job Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Title<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-3 sm:text-sm border-gray-300 py-2 rounded-md"
                    placeholder="e.g. Supply Chain Manager, Logistics Coordinator"
                    value={jobData.title}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    required
                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-3 sm:text-sm border-gray-300 py-2 rounded-md"
                    placeholder="e.g. Global Logistics Inc."
                    value={jobData.companyName}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="positions"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Number of Positions
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      name="positions"
                      id="positions"
                      required
                      min="1"
                      className="focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 py-2 rounded-md"
                      placeholder="e.g. 5"
                      value={jobData.positions}
                      onChange={handleNumberChange}
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    required
                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-3 sm:text-sm border-gray-300 py-2 rounded-md"
                    placeholder="e.g. New Delhi, India"
                    value={jobData.location}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Salary Range */}
                <div>
                  <label
                    htmlFor="salaryRange"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Salary Range<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="salaryRange"
                    id="salaryRange"
                    required
                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-3 sm:text-sm border-gray-300 py-2 rounded-md"
                    placeholder="e.g. ₹10-15 LPA"
                    value={jobData.salaryRange}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Experience */}
                <div>
                  <label
                    htmlFor="experience"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Experience Required<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="experience"
                    id="experience"
                    required
                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-3 sm:text-sm border-gray-300 py-2 rounded-md"
                    placeholder="e.g. 3-5 years in supply chain or logistics"
                    value={jobData.experience}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Job Type */}
                <div>
                  <label
                    htmlFor="jobType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Type<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="jobType"
                    name="jobType"
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                    value={jobData.jobType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Job Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              {/* Job Description */}
              <div>
  <label
    htmlFor="description"
    className="block text-sm font-medium text-gray-700"
  >
    Job Description<span className="text-red-500">*</span>
  </label>
  <textarea
    id="description"
    name="description"
    rows={6} // Adjusted for better UX
    required
    className="shadow-sm py-2 px-2 focus:ring-green-500 focus:border-green-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
    placeholder="Describe the job role, responsibilities, and requirements"
    value={jobData.description}
    onChange={handleInputChange}
  />
</div>

              {/* Required Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Required Skills<span className="text-red-500">*</span>
                </label>
                {jobData.skills.map((skill, index) => (
                  <div key={index} className="flex mt-1">
                    <input
                      type="text"
                      value={skill}
                      required
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      className="focus:ring-green-500 py-2 px-2 focus:border-green-500 flex-1 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g. Inventory Management, Demand Planning"
                    />
                    {index === jobData.skills.length - 1 ? (
                      <button
                        type="button"
                        onClick={addSkillField}
                        className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => removeSkillField(index)}
                        className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <Minus className="h-5 w-5" />
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
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Post Job
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

export default RecruiterJobPostPage;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/PageNotFound";
import RecruiterJobPostPage from "./pages/RecruiterJobPostPage";
import RecruiterSignUp from "./pages/RecruiterSignUp";
import RecruiterLogin from "./pages/RecruiterLogin";
import RecruiterHomePage from "./pages/RecruiterHomePage";
import RecruiterJobDetailPage from "./pages/RecruiterJobDetailPage";
import RecruiterPage from "./pages/RecruiterPage";
import RecruiterEditJob from "./pages/RecruiterEditJob";
import RecruiterAllApplicants from "./pages/RecruiterAllApplicants";

function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route path="/postjob" element={<RecruiterJobPostPage />} />
          <Route path="/signup" element={<RecruiterSignUp />} />
          <Route path="/login" element={<RecruiterLogin />} />
          <Route path="/home" element={<RecruiterHomePage />} />
          <Route path="/job/:jobId" element={<RecruiterJobDetailPage />} />
          <Route path="/" element={<RecruiterPage />} />
          <Route path="/allapplicants" element={<RecruiterAllApplicants />} />
          <Route path="/editjob/:jobId" element={<RecruiterEditJob/>} />
    <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App

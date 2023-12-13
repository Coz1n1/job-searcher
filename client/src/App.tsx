import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Company from "./pages/company/Company";
import CompanyProfile from "./pages/company/CompanyProfile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Jobs from "./pages/jobs/Jobs";
import JobDetails from "./pages/jobs/JobDetails";

function App() {
  const client = new QueryClient({});

  return (
    <>
      <QueryClientProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/company-job-add" element={<Company />} />
            <Route path="/company" element={<CompanyProfile />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobOffer" element={<JobDetails />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;

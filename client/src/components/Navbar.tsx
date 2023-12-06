import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleJobClick = () => {
    navigate("/company-job-add");
  };

  return (
    <div className="absolute flex w-screen items-center justify-end  z-10 px-16 py-8">
      <div className="flex gap-8">
        <button className="text-lg font-bold text-white bg-blue-500 px-4 py-2 rounded-lg">
          Job offers
        </button>
        <button
          className="text-lg font-bold text-white bg-blue-500 px-4 py-2 rounded-lg"
          onClick={handleJobClick}
        >
          Post a job
        </button>
      </div>
    </div>
  );
};

export default Navbar;

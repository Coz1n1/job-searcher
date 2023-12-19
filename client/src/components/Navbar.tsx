import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute flex w-screen items-center justify-between z-10 px-4 sm:px-16 py-8">
      <div className="cursor-pointer">
        <img
          src="./images/icon.png"
          alt=""
          className="w-[80px] h-[80px]"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="flex gap-2 sm:gap-8">
        <button
          className="text-lg font-bold text-white bg-blue-500 px-4 py-2 rounded-lg"
          onClick={() => navigate("/jobs")}
        >
          Job offers
        </button>
        <button
          className="text-lg font-bold text-white bg-blue-500 px-4 py-2 rounded-lg"
          onClick={() => navigate("/company-job-add")}
        >
          Post a job
        </button>
      </div>
    </div>
  );
};

export default Navbar;

import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

const Company = () => {
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCompanyNav = () => {
    if (companyName != "") {
      navigate({
        pathname: `/company`,
        search: `?company=${companyName}`,
      });
    } else {
      setError("Company Name Cannot Be Empty");
    }
  };

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col w-full h-full items-center justify-center">
        <h1 className="mb-8 font-bold text-3xl text-blue-500">
          Enter company name
        </h1>
        <input
          type="text"
          placeholder="Company name..."
          className="w-[600px] px-4 py-4 border-2 border-pink-500 rounded-lg"
          name="companyinput"
          value={companyName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCompanyName(e.target.value)
          }
        />
        <button
          onClick={handleCompanyNav}
          className="mt-4 px-4 py-2 text-white font-bold text-lg rounded-lg bg-blue-500 shadow-xl shadow-blue-500/40 duration-200 hover:scale-110"
        >
          Submit
        </button>
        <h1 className="text-red-500 mt-4 font-bold">{error}</h1>
      </div>
    </div>
  );
};

export default Company;

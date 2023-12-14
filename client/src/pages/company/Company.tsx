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
      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-pink-500 to-blue-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          ></div>
        </div>
      </div>
      <div className="flex flex-col w-full h-full items-center justify-center">
        <h1 className="mb-8 font-bold text-3xl text-blue-500">
          Enter company name
        </h1>
        <input
          type="text"
          placeholder="Company name..."
          className="w-screen md:w-[700px] lg:w-[800px] px-4 py-4 border-2 border-pink-500 rounded-lg"
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

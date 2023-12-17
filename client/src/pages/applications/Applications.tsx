import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { ApplicationType } from "@/types";

const Applications = () => {
  const [useParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [applicants, setApplicants] = useState<ApplicationType[]>();
  const id = useParams.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    const getApplicants = async () => {
      const applicants = await axios.post(
        "http://localhost:3002/getCompanyApplicants",
        {
          id: id,
        }
      );
      setApplicants(applicants.data.applicants);
      setIsLoading(false);
    };
    getApplicants();
  }, []);

  return (
    <div className="w-screen flex flex-col min-h-screen items-center justify-center gap-12">
      {isLoading ? (
        <h1>Loading Applications...</h1>
      ) : (
        <>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-500 font-bold text-white text-lg rounded-lg shadow-lg shadow-blue-300 duration-200 hover:scale-110"
          >
            Go Back
          </button>

          <div className="flex items-center w-[900px] px-4 justify-between shadow-xl shadow-black/10 rounded-xl py-4 font-bold">
            <h1 className="w-1/5 text-left">Position</h1>
            <h1 className="w-1/5 text-center">Name</h1>
            <h1 className="w-1/5 text-center">Email</h1>
            <h1 className="w-1/5 text-center">Additional Info</h1>
            <h1 className="w-1/5 text-right">Action</h1>
          </div>
          {applicants?.map((e: ApplicationType, i: number) => (
            <div
              className="flex items-center w-[900px] border-b-2 border-zinc-500 px-4 justify-between"
              key={i}
            >
              <h1 className="font-bold text-lg text-left w-1/5">{++i}.</h1>
              <h1 className="ml-4 text-blue-600 font-bold text-xl w-1/5 text-center">
                {e.user_name}
              </h1>
              <h1 className="ml-4 font-bold text-xl w-1/5 text-center">
                <span className="text-purple-600">{e.user_email}</span>
              </h1>
              <p className="font-bold text-md text-zinc-500 w-1/5 text-center">
                {e.additional_info}
              </p>
              <a
                href="mailto:kacpertokajj@gmail.com"
                target="#blank"
                className="my-4 w-1/5 text-right"
              >
                <span className="px-4 py-2 font-bold text-white rounded-xl bg-emerald-500">
                  Contact
                </span>
              </a>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Applications;

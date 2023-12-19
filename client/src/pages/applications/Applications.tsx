import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { ApplicationType } from "@/types";
import { OfferType } from "@/types";

const Applications = () => {
  const [useParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [applicants, setApplicants] = useState<ApplicationType[]>();
  const [currentJobData, setCurrentJobData] = useState<OfferType>();
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

  useEffect(() => {
    const getJobData = async () => {
      const response = await axios.post(
        "http://localhost:3002/getSpecifiedJobData",
        {
          id: id,
        }
      );
      console.log(response.data.jobData);
      setCurrentJobData(response.data.jobData);
      setIsLoading(false);
    };
    getJobData();
  }, []);

  return (
    <div className="w-screen flex flex-col min-h-screen items-center justify-center gap-12">
      {isLoading ? (
        <h1>Loading Applications...</h1>
      ) : (
        <>
          <div className="flex flex-col gap-2 w-full items-center">
            <h1 className="font-bold text-xl text-center">
              Applications for your current posted job
            </h1>
            <h1 className="font-bold text-xl text-blue-600">
              {currentJobData?.title}
            </h1>
            <button
              onClick={() => navigate(-1)}
              className="w-[120px] px-4 py-2 bg-blue-500 font-bold text-white text-lg rounded-lg shadow-lg shadow-blue-300 duration-200 hover:scale-110"
            >
              Go Back
            </button>
          </div>
          <div className="w-screen lg:w-[800px] relative overflow-x-auto shadow-lg rounded-lg">
            <table className="w-full text-left rtl:text-right text-zinc-500">
              <thead>
                <tr className="bg-blue-200 text-md text-zinc-700">
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="py-3">
                    Email
                  </th>
                  <th scope="col" className="py-3">
                    Additional Info
                  </th>
                  <th scope="col" className="-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {applicants?.map((e: ApplicationType, i: number) => (
                  <tr
                    className="odd:bg-zinc-50 even:bg-white border-b-2 border-zinc-400 "
                    key={i}
                  >
                    <td className="px-6 py-4">{e.user_name}</td>
                    <td className="py-4">{e.user_email}</td>
                    <td className="py-4">{e.additional_info}</td>
                    <td className="py-4">
                      <a href="mailto:kacpertokajj@gmail.com" target="#blank">
                        <button className="bg-emerald-500 px-2 py-2 text-white font-bold rounded-lg">
                          Contact
                        </button>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Applications;

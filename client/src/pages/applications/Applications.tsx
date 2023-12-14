import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { ApplicationType } from "@/types";

const Applications = () => {
  const [useParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [applicants, setApplicants] = useState<ApplicationType[]>();
  const id = useParams.get("id");

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
          {applicants?.map((e: ApplicationType, i: number) => (
            <div
              className="flex flex-col items-center w-[700px] border-b-2 border-zinc-500 px-2 justify-between"
              key={i}
            >
              <div className="flex items-center">
                <h1 className="font-bold text-lg">{++i}.</h1>
                <h1 className="ml-4 text-blue-600 font-bold text-xl">
                  {e.user_name}
                </h1>
              </div>
              <div className="flex items-center">
                <h1 className="ml-4 font-bold text-xl">
                  Email: <span className="text-purple-600">{e.user_email}</span>
                </h1>
              </div>
              <div className="flex">
                <p className="font-bold text-md text-zinc-500">
                  {e.additional_info}
                </p>
              </div>
              <a
                href="mailto:kacpertokajj@gmail.com"
                target="#blank"
                className="my-4"
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

import { useSearchParams } from "react-router-dom";
import { FaSquarePlus } from "react-icons/fa6";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { OfferType } from "../../types/index";
import JobOffer from "./JobOffer";
import { IoClose } from "react-icons/io5";
import AddingMenu from "./AddingMenu";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CompanyProfile = () => {
  const [searchParams] = useSearchParams();
  const company = searchParams.get("company");
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const findAll = async () => {
    const response = await axios.post("http://localhost:3002/companyOffers", {
      company: company,
    });
    return response.data.jobs;
  };

  const {
    data: companyJobOffers,
    isLoading,
    isError,
  } = useQuery<OfferType[], Error>({
    queryKey: ["query-tutorials"],
    queryFn: async () => {
      return await findAll();
    },
  });

  if (isError) {
    return <h1>Error occured</h1>;
  }

  return (
    <div className="w-screen flex flex-col min-h-screen">
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
      {isActive ? (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
          <div className="flex items-center gap-8 justify-center text-center">
            <div className="px-1 py-1 bg-pink-500 rounded-xl">
              <IoClose
                size={33}
                onClick={() => setIsActive(!isActive)}
                className="cursor-pointer text-white"
              />
            </div>
            <h1 className="font-bold text-lg md:text-2xl">
              Adding offer for -{" "}
              <span className="text-blue-500">{company}</span>
            </h1>
          </div>
          <AddingMenu company={company} />
        </div>
      ) : (
        <div className="w-screen flex flex-col items-center justify-center my-16">
          <h1 className="mb-4 text-2xl font-bold text-center flex items-center gap-4">
            <FaArrowCircleLeft
              size={33}
              onClick={() => navigate("/")}
              className="text-blue-500 cursor-pointer"
            />
            Add and manage offers for the company:
          </h1>
          <h1 className="font-bold text-white text-xl md:text-2xl mb-4 bg-blue-500 px-4 py-2 rounded-lg">
            {company}
          </h1>
          <h1 className="text-2xl font-bold mb-8">
            All job offers -{" "}
            <span className="text-pink-500">[{companyJobOffers?.length}]</span>
          </h1>
          <div className="gap-4 flex flex-col overflow-y-auto">
            {isLoading ? (
              <div className="text-center">
                <h1 className="font-bold text-3xl text-pink-500">Loading...</h1>
              </div>
            ) : (
              companyJobOffers?.map((jobOffer: OfferType, i: number) => (
                <JobOffer jobData={jobOffer} key={i} />
              ))
            )}
            <div
              className="w-screen md:w-[700px] h-[150px] bg-blue-300/10 rounded-xl border-2 border-dashed border-pink-500 flex items-center justify-center cursor-pointer hover:bg-blue-300/30"
              onClick={() => setIsActive(!isActive)}
            >
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-pink-500">
                    Add Job Offer
                  </h1>
                  <FaSquarePlus size={33} className="text-emerald-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;

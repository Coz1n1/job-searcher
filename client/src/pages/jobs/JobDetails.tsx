import { useSearchParams } from "react-router-dom";
import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { OfferType } from "@/types";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { IoIosSpeedometer } from "react-icons/io";
import { IoInvertMode } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { FaWallet } from "react-icons/fa6";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const JobDetails = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [currentJobData, setCurrentJobData] = useState<OfferType>();
  const [currentCompanyOffers, setCurrentCompanyOffers] =
    useState<OfferType[]>();
  const [applyEmail, setApplyEmail] = useState("");
  const [applyName, setApplyName] = useState("");
  const [applyAdditionalInfo, setApplyAdditionalInfo] = useState("");
  const [fileValue, setFileValue] = useState("");
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const companyName = searchParams.get("company");
  const { toast } = useToast();

  useEffect(() => {
    const getJobData = async () => {
      const response = await axios.post(
        "https://job-searcher-production.up.railway.app/getSpecifiedJobData",
        {
          id: id,
        }
      );
      console.log(response.data.jobData);
      setCurrentJobData(response.data.jobData);
      setIsLoading(false);
    };
    getJobData();
  }, [id]);

  useEffect(() => {
    const getCompanyJobs = async () => {
      const response = await axios.post(
        "https://job-searcher-production.up.railway.app/companyOffers",
        {
          company: companyName,
        }
      );
      console.log(response.data.jobs);
      setCurrentCompanyOffers(response.data.jobs);
    };
    getCompanyJobs();
  }, []);

  const handleApply = () => {
    axios
      .post("https://job-searcher-production.up.railway.app/applyForOffer", {
        id: id,
        userName: applyName,
        userEmail: applyEmail,
        additionalInfo: applyAdditionalInfo,
        file: fileValue,
      })
      .catch((error) => {
        console.log(error);
      });
    toast({
      title: "Application sent",
      description:
        "Search for more info about an offer or continue applying for others",
    });
    setApplyName("");
    setApplyEmail("");
    setApplyAdditionalInfo("");
    setFileValue("");
  };

  const handleDetailsCheck = (e: any) => {
    navigate({
      pathname: `/jobOffer`,
      search: `?id=${e.id}&company=${e.company_name}`,
    });
  };

  return (
    <div className="w-screen flex flex-col items-center relative min-h-screen">
      <div className="w-full flex items-center justify-center bg-blue-200 rounded-br-3xl rounded-bl-3xl py-24">
        <div
          className="absolute left-4 md:left-12 w-8 h-8 md:w-16 md:h-16 bg-zinc-500/50 rounded-full flex items-center justify-center"
          role="button"
          onClick={() => navigate("/jobs")}
        >
          <FaArrowLeft size={25} className="text-white" />
        </div>
        <h1 className="text-center text-3xl md:text-5xl xl:text-8xl font-bold text-white">
          {currentJobData?.company_name}
        </h1>
      </div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-wrap absolute top-40 md:top-48 xl:top-64 gap-8 justify-center w-full">
          <div className="flex flex-col items-center">
            <div className="flex flex-col bg-white rounded-lg w-screen sm:w-[600px] md:w-[700px] py-4 shadow-xl shadow-black/10">
              <div className="flex w-full items-center justify-start px-4 gap-4">
                <div className="w-12 md:w-24 h-12 md:h-24 rounded-full bg-black"></div>
                <div className="flex flex-col gap-2">
                  <h1 className="font-bold text-xl md:text-2xl text-blue-600">
                    {currentJobData?.title}
                  </h1>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <BsFillBuildingsFill
                        size={22}
                        className="text-pink-700"
                      />
                      <h1 className="font-bold text-zinc-500">
                        {currentJobData?.company_name}
                      </h1>
                    </div>
                    <div className="flex items-center gap-2">
                      <IoLocationSharp size={22} className="text-pink-700" />
                      <h1 className="font-bold text-zinc-500">
                        {currentJobData?.location}
                      </h1>
                    </div>
                  </div>
                  <div>
                    <h1 className="bg-emerald-500 w-[70px] md:w-[120px] gap-2 py-2 rounded-lg font-bold text-md md:text-lg text-white flex items-center justify-center">
                      <FaWallet />
                      {currentJobData?.salary}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex justify-center flex-wrap md:justify-between px-4 mt-12 gap-12">
                <div className="flex items-center gap-4">
                  <div className="flex items-center px-2 py-2 bg-purple-300 rounded-lg">
                    <FaStar size={25} className="text-purple-700" />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="font-bold text-zinc-500">Experience</h1>
                    <h1 className="font-bold">{currentJobData!.experience}</h1>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center px-2 py-2 bg-orange-200 rounded-lg">
                    <IoIosSpeedometer size={25} className="text-orange-600" />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="font-bold text-zinc-500">Type of Work</h1>
                    <h1 className="font-bold">
                      {currentJobData!.type_of_work}
                    </h1>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center px-2 py-2 bg-blue-200 rounded-lg">
                    <IoInvertMode size={25} className="text-blue-600" />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="font-bold text-zinc-500">Operating Mode</h1>
                    <h1 className="font-bold">
                      {currentJobData!.operating_mode}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col bg-white rounded-lg w-screen sm:w-[600px] md:w-[700px] py-4 shadow-xl shadow-black/10 mt-6 px-4">
              <h1 className="font-bold text-xl text-blue-600">Tech Stack</h1>
              <div className="flex flex-wrap gap-4 mt-4">
                {currentJobData?.technologies.map((e: any, i) => (
                  <div
                    className="px-4 py-2 font-bold text-white bg-zinc-500/80 rounded-lg"
                    key={i}
                  >
                    {e.value}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col bg-white rounded-lg w-screen sm:w-[600px] md:w-[700px] py-4 shadow-xl shadow-black/10 mt-6 px-4">
              <h1 className="font-bold text-xl text-blue-600">
                Job Description
              </h1>
              <p className="mt-4 text-lg font-bold text-zinc-500">
                {currentJobData?.description}
              </p>
            </div>
            <div className="flex flex-col bg-white rounded-lg w-screen sm:w-[600px] md:w-[700px] py-4 shadow-xl shadow-black/10 mt-6 px-4 mb-12">
              <h1 className="font-bold text-xl text-blue-600">Apply Form</h1>
              <div className="w-full flex flex-wrap gap-8 mt-4">
                <div className="flex flex-col">
                  <h1 className="font-bold">Name</h1>
                  <input
                    type="text"
                    className="w-[200px] md:w-[300px] border-2 border-zinc-600 rounded-lg py-2 px-4"
                    placeholder="Enter name..."
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setApplyName(e.target.value)
                    }
                    value={applyName}
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="font-bold">Email</h1>
                  <input
                    type="text"
                    className="w-[200px] md:w-[300px] border-2 border-zinc-600 rounded-lg py-2 px-4"
                    placeholder="Enter email..."
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setApplyEmail(e.target.value)
                    }
                    value={applyEmail}
                  />
                </div>
              </div>
              <div className="flex flex-wrap mt-4">
                <div className="flex flex-col">
                  <h1 className="font-bold">
                    Additional Info (github profile etc.)
                  </h1>
                  <Textarea
                    placeholder="Describe..."
                    className="w-[350px] md:w-[300px] min-h-[120px] border-2 border-zinc-600 rounded-lg px-2 mb-2"
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setApplyAdditionalInfo(e.target.value)
                    }
                    value={applyAdditionalInfo}
                  />
                </div>
                <div className="flex items-center md:ml-8">
                  <input
                    type="file"
                    accept=".doc,.docx,.pdf,.jpg,.jpeg,.png,.xml"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFileValue(e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="w-full flex items-center mt-4">
                <button
                  className="bg-emerald-500 px-8 py-2 rounded-xl font-bold text-white text-lg transition-all duration-200 hover:scale-110"
                  onClick={handleApply}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col bg-white rounded-lg w-screen sm:w-[600px] md:w-[700px] lg:w-[450px] py-4 shadow-xl shadow-black/10 items-center justify-center">
              <h1 className="font-bold text-lg">
                More Offers From The{" "}
                <span className="text-blue-600">
                  {currentJobData!.company_name}
                </span>
              </h1>
              <div className="flex flex-col w-full px-2 mt-8 gap-4">
                {currentCompanyOffers?.map((e: any, i) => (
                  <div className="flex flex-col px-4 rounded-lg py-2" key={i}>
                    <div className="flex items-center">
                      <h1 className="font-bold">
                        {e.title}{" "}
                        {id == e.id ? (
                          <span className="text-emerald-500">- current</span>
                        ) : (
                          ""
                        )}
                      </h1>
                    </div>
                    <div className="flex border-t-2 border-zinc-500 py-2">
                      <button
                        className="font-bold text-sm text-white px-2 bg-blue-500 rounded-2xl flex items-center py-2 gap-1"
                        onClick={() => handleDetailsCheck(e)}
                      >
                        More
                        <FaArrowDown />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default JobDetails;

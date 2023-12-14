import { IoLocationSharp } from "react-icons/io5";
import { BsFillBuildingsFill } from "react-icons/bs";
import { OfferType, ApplicationType } from "../../types";
import { IoIosSpeedometer } from "react-icons/io";
import { IoInvertMode } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { MdEdit, MdDelete, MdMore } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface JobOfferProps {
  jobData: OfferType;
}

const JobOffer: React.FC<JobOfferProps> = ({ jobData }) => {
  const [applicants, setApplicants] = useState<ApplicationType[]>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const experience = JSON.parse(jobData.experience);
  const typeOfWork = JSON.parse(jobData.type_of_work);
  const operatingMode = JSON.parse(jobData.operating_mode);
  const technologies = jobData.technologies;
  const id = jobData.id;

  const handleDelete = () => {
    axios.post("http://localhost:3002/deleteOffer", {
      id: id,
    });
  };

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

  const handleApplicationsNavi = () => {
    navigate({
      pathname: "/applications",
      search: `?id=${id}`,
    });
  };

  return (
    <div className="w-full md:w-[700px] h-auto px-4 py-4 flex flex-col rounded-xl border-2 border-pink-500">
      <div className="flex w-full items-center justify-between px-8">
        <div className="flex gap-4 items-center">
          <div className="w-[80px] h-[80px] bg-black/30 rounded-full"></div>
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-2xl text-blue-500">
              {jobData.title}
            </h1>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <BsFillBuildingsFill size={25} className="text-pink-500" />
                <h1 className="font-bold">{jobData.company_name}</h1>
              </div>
              <div className="flex items-center gap-1">
                <IoLocationSharp size={25} className="text-pink-500" />
                <h1 className="font-bold">{jobData.location}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <h1 className="font-bold text-emerald-500 text-xl">
            {jobData.salary}
          </h1>
        </div>
      </div>
      <div className="flex gap-4 mt-4 px-8 text-white font-bold">
        <button className="flex items-center px-2 py-2 rounded-lg bg-[#e44848] gap-1 cursor-pointer">
          <MdEdit size={25} />
          Edit
        </button>
        <button
          className="flex items-center px-2 py-2 rounded-lg bg-[#e44848] gap-1 cursor-pointer"
          onClick={handleDelete}
        >
          <MdDelete size={25} />
          Delete
        </button>
        <button className="flex items-center px-2 py-2 rounded-lg bg-zinc-500 gap-1 cursor-pointer">
          <MdMore size={25} />
          See More
        </button>
      </div>
      <div className="mt-4 flex items-center px-8 ">
        {isLoading ? (
          <h1>Loading Applications...</h1>
        ) : (
          <div
            className="flex bg-blue-200 px-4 py-2 rounded-lg items-center"
            role="button"
            onClick={handleApplicationsNavi}
          >
            <FaUserFriends size={32} className="text-blue-500" />
            <h1 className="font-bold text-lg ml-2">
              Applications -{" "}
              <span className="text-white bg-emerald-500 px-2 rounded-lg">
                {applicants?.length}
              </span>
              - check
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobOffer;

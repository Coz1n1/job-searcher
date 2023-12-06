import { IoLocationSharp } from "react-icons/io5";
import { BsFillBuildingsFill } from "react-icons/bs";
import { OfferType } from "../../types";
import { IoIosSpeedometer } from "react-icons/io";
import { IoInvertMode } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { MdEdit, MdDelete, MdMore } from "react-icons/md";

interface JobOfferProps {
  jobData: OfferType;
}

const JobOffer: React.FC<JobOfferProps> = ({ jobData }) => {
  return (
    <div className="w-[700px] h-[300px] px-4 py-4 flex flex-col rounded-xl border-2 border-pink-500">
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
      <div className="flex items-center w-full px-8 mt-8 gap-4">
        <div className="flex items-center bg-blue-500 px-2 py-1 rounded-lg text-white gap-2">
          <IoIosSpeedometer size={32} />
          <div className="flex flex-col">
            <h1 className="text-zinc-300">Type of work</h1>
            <h1 className="font-bold">{jobData.type_of_work}</h1>
          </div>
        </div>
        <div className="flex items-center bg-emerald-500 px-2 py-1 rounded-lg text-white gap-2">
          <IoInvertMode size={32} />
          <div className="flex flex-col">
            <h1 className="text-zinc-500">Operating mode</h1>
            <h1 className="font-bold">{jobData.operating_mode}</h1>
          </div>
        </div>
        <div className="flex items-center bg-purple-500 px-2 py-1 rounded-lg text-white gap-2">
          <FaStar size={32} />
          <div className="flex flex-col">
            <h1 className="text-zinc-200">Experience</h1>
            <h1 className="font-bold">{jobData.experience}</h1>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-8 px-8 text-white font-bold">
        <div className="flex items-center px-2 py-2 rounded-lg bg-[#e44848] gap-1 cursor-pointer">
          <MdEdit size={25} />
          <h1>Edit</h1>
        </div>
        <div className="flex items-center px-2 py-2 rounded-lg bg-[#e44848] gap-1 cursor-pointer">
          <MdDelete size={25} />
          <h1>Delete</h1>
        </div>
        <div className="flex items-center px-2 py-2 rounded-lg bg-zinc-500 gap-1 cursor-pointer">
          <MdMore size={25} />
          <h1>See More</h1>
        </div>
      </div>
    </div>
  );
};

export default JobOffer;

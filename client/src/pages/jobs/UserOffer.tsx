import { OfferType } from "@/types";
import { FaStar } from "react-icons/fa";
import { IoIosSpeedometer } from "react-icons/io";
import { IoInvertMode } from "react-icons/io5";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface UserOfferProps {
  offerData: OfferType;
}

const UserOffer: React.FC<UserOfferProps> = ({ offerData }) => {
  const navigate = useNavigate();
  const experience = offerData.experience;
  const operatingMode = offerData.operating_mode;
  const typeOfWork = offerData.type_of_work;
  const technologies = offerData.technologies;

  const handleDetailsCheck = () => {
    navigate({
      pathname: `/jobOffer`,
      search: `?id=${offerData.id}&company=${offerData.company_name}`,
    });
  };

  return (
    <div className="w-full lg:w-[650px] xl:w-[900px] flex flex-col justify-between h-[180px] bg-white shadow-lg shadow-black/10 rounded-xl px-4 pt-4">
      <div className="flex w-full justify-between">
        <div className="flex">
          <div className="w-[40px] h-[40px] md:w-[80px] md:h-[80px] rounded-full">
            <img
              src="./images/company.png"
              alt="company"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col h-full gap-2">
            <h1 className="text-lg md:text-xl font-bold">{offerData.title}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <BsFillBuildingsFill size={25} className="text-pink-500" />
                <h1 className="font-bold text-zinc-500">
                  {offerData.company_name}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <FaStar size={25} className="text-pink-500" />
                <h1 className="font-bold text-zinc-500">{experience}</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <IoInvertMode size={25} className="text-blue-500" />
                <h1 className="font-bold text-zinc-500">{operatingMode}</h1>
              </div>
              <div className="flex items-center gap-2">
                <IoIosSpeedometer size={25} className="text-blue-500" />
                <h1 className="font-bold text-zinc-500">{typeOfWork}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <h1 className="font-bold text-lg text-emerald-500">
              {offerData.salary}
            </h1>
          </div>
          <div className="hidden md:flex gap-2">
            {technologies.map((e: any, i) => (
              <div
                className="px-2 py-1 font-bold text-white bg-zinc-500 rounded-2xl"
                key={i}
              >
                {e.value}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex border-t-2 border-zinc-500 py-2">
        <button
          className="font-bold text-sm text-white px-2 bg-blue-500 rounded-2xl flex items-center py-2 gap-1"
          onClick={handleDetailsCheck}
        >
          More
          <FaArrowDown />
        </button>
      </div>
    </div>
  );
};

export default UserOffer;

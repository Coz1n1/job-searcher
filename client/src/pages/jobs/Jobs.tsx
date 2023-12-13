import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { SiTailwindcss } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { FaCss3 } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { OfferType } from "@/types";
import UserOffer from "./UserOffer";

const techData = [
  {
    id: 1,
    icon: <SiTailwindcss size={25} />,
    name: "tailwind",
    color: "bg-blue-500",
  },
  {
    id: 2,
    icon: <FaReact size={25} />,
    name: "react",
    color: "bg-zinc-500",
  },
  {
    id: 3,
    icon: <FaCss3 size={25} />,
    name: "css",
    color: "bg-pink-500",
  },
  {
    id: 4,
    icon: <SiTypescript size={25} />,
    name: "typescript",
    color: "bg-emerald-500",
  },
  {
    id: 5,
    icon: <TbBrandNextjs size={25} />,
    name: "next",
    color: "bg-purple-500",
  },
];

const Jobs = () => {
  const [currentTech, setCurrentTech] = useState<number | null>(null);
  const [salary, setSalary] = useState(0);
  const [techName, setTechName] = useState("");
  const [type, setType] = useState(false);
  const [titleFilter, setTitleFilter] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const [operatingFilters, setOperatingFilters] = useState<string[]>([]);
  const [workType, setWorkType] = useState(["Part-Time", "Full-Time"]);
  let workTypeFilters = ["Part-Time", "Full-Time"];
  let operatingModeFilters = ["Home", "Hybrid", "Office"];
  const [jobsForUser, setJobsForUser] = useState<OfferType[]>([]);
  const [items, setItems] = useState<OfferType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAll = async () => {
      const response = await axios.get("http://localhost:3002/getAll");
      console.log(response.data.offers);
      setJobsForUser(response.data.offers);
      setItems(response.data.offers);
      setIsLoading(false);
    };
    getAll();
  }, []);

  const handleTechChange = (i: number, e: string) => {
    if (i === currentTech) {
      return null;
    }
    setCurrentTech(i);
    setTechName(e);
  };

  // const filteredUserOffers = jobsForUser?.filter((job: OfferType) => {
  //   return job.title.toLowerCase().includes(titleFilter);
  //   && workType.includes(JSON.parse(job.type_of_work).value)
  // });

  const handleFindJobTitle = () => {
    if (titleFilter != "") {
      let filteredByTitle = jobsForUser.filter((job: OfferType) => {
        return job.title.toLowerCase().includes(titleFilter);
      });
      setJobsForUser(filteredByTitle);
    } else {
      setJobsForUser(items);
    }
  };

  const handleFilterButton = (selectedTypeOfWork: string) => {
    if (filters.includes(selectedTypeOfWork)) {
      let newFilters = filters.filter((el) => el !== selectedTypeOfWork);
      setFilters(newFilters);
    } else {
      setFilters([...filters, selectedTypeOfWork]);
    }
  };

  const handleOperatingFilterButton = (operatingMode: string) => {
    if (operatingFilters.includes(operatingMode)) {
      let newOperatingFilters = operatingFilters.filter(
        (el) => el !== operatingMode
      );
      setOperatingFilters(newOperatingFilters);
    } else {
      setOperatingFilters([...operatingFilters, operatingMode]);
    }
  };

  useEffect(() => {
    filterItems();
  }, [filters]);

  useEffect(() => {
    filterOperating();
  }, [operatingFilters]);

  const filterItems = () => {
    if (filters.length > 0) {
      let tempItems: any = filters.map((category) => {
        let temp = items.filter(
          (job) => JSON.parse(job.type_of_work).value === category
        );
        return temp;
      });
      console.log(tempItems.flat());
      setJobsForUser(tempItems.flat());
    } else {
      setJobsForUser([...items]);
    }
  };

  const filterOperating = () => {
    if (operatingFilters.length > 0) {
      let tempItems = operatingFilters.map((mode) => {
        let temp = items.filter(
          (job) => JSON.parse(job.operating_mode).value === mode
        );
        return temp;
      });
      setJobsForUser(tempItems.flat());
    } else {
      setJobsForUser([...items]);
    }
  };

  return (
    <div className="flex flex-col">
      <Navbar />
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
      <div className="w-screen flex items-center justify-center pt-32 gap-2 md:gap-8 flex-wrap">
        {techData.map((e, i) => (
          <div
            className={
              currentTech === i
                ? "w-16 md:w-24 flex flex-col cursor-pointer items-center bg-blue-500/50 hover:bg-blue-600/30 px-2 py-2 rounded-lg"
                : "w-16 md:w-24 flex flex-col cursor-pointer items-center hover:bg-blue-600/30 px-2 py-2 rounded-lg"
            }
            key={i}
            onClick={() => handleTechChange(i, e.name)}
          >
            <div
              className={`w-6 md:w-12 h-6 md:h-12 rounded-full text-white ${e.color} flex items-center justify-center`}
            >
              {e.icon}
            </div>
            <h1 className="text-sm md:text-lg font-bold">{e.name}</h1>
          </div>
        ))}
      </div>
      <div className="w-full flex items-center justify-center py-8">
        <input
          type="text"
          placeholder="Enter job name..."
          className="px-8 py-4 w-[600px] border-2 border-blue-500 rounded-tl-lg rounded-bl-lg focus:outline-none"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitleFilter(e.target.value)
          }
        />
        <button
          onClick={handleFindJobTitle}
          className="py-4 px-4 bg-blue-500 border-2 border-blue-500 font-bold text-white rounded-tr-lg rounded-br-lg"
        >
          Search
        </button>
      </div>
      <div className="w-screen flex flex-col lg:flex-row justify-center gap-8">
        <div className="flex justify-between px-8 lg:px-0 flex-wrap lg:flex-col lg:w-[350px] bg-white shadow-2xl shadow-black/20 py-2 rounded-lg border-[1px] border-zinc-500/20">
          <h1 className="font-bold text-xl px-4 py-4 hidden lg:flex">
            Filters
          </h1>
          <div className="flex flex-col gap-1 md:gap-4 py-4 lg:border-t-[1px] lg:border-zinc-500 px-0 md:px-4">
            <h1 className="text-blue-500 font-bold text-md md:text-lg">
              Type of Work
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              {workTypeFilters.map((e, i) => (
                <button
                  className={`px-1 md:px-4 md:py-2 rounded-xl border-2 border-zinc-500 font-bold hover:bg-blue-500/30 ${
                    filters?.includes(e) ? "bg-blue-500" : ""
                  }`}
                  onClick={() => handleFilterButton(e)}
                  key={i}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1 md:gap-4 py-4 lg:border-t-[1px] lg:border-zinc-500 px-0 md:px-4">
            <h1 className="text-blue-500 font-bold text-md md:text-lg">
              Operating Mode
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              {operatingModeFilters.map((e, i) => (
                <button
                  className={`px-1 md:px-4 md:py-2 rounded-xl border-2 border-zinc-500 font-bold hover:bg-blue-500/30 ${
                    operatingFilters?.includes(e) ? "bg-blue-500" : ""
                  }`}
                  onClick={() => handleOperatingFilterButton(e)}
                  key={i}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1 md:gap-4 py-4 lg:border-t-[1px] lg:border-zinc-500 px-0 md:px-4">
            <h1 className="text-blue-500 font-bold text-lg">Salary</h1>
            <Slider
              id="slider"
              defaultValue={[3000]}
              max={10000}
              step={100}
              onValueChange={(e: any) => console.log(e.target.max)}
            />
          </div>
        </div>
        {isLoading ? (
          <h1 className="text-xl font-bold text-pink-500">Loading...</h1>
        ) : (
          <div className="flex flex-col items-center w-full lg:w-[650px] xl:w-[900px] overflow-y-auto gap-4">
            {jobsForUser?.map((e: OfferType, i) => (
              <UserOffer offerData={e} key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;

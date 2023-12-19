import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { SiTailwindcss } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { FaCss3 } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { useState } from "react";
import axios from "axios";
import { OfferType } from "@/types";
import UserOffer from "./UserOffer";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { IoMdCloseCircle } from "react-icons/io";
import { useInView } from "framer-motion";
import { useRef } from "react";

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
  const [currentType, setCurrentType] = useState<number | null>(null);
  const [currentMode, setCurrentMode] = useState<number | null>(null);
  const [currentExperience, setCurrentExperience] = useState<number | null>(
    null
  );
  const [techName, setTechName] = useState("");
  const [typeName, setTypeName] = useState("");
  const [modeName, setModeName] = useState("");
  const [experienceName, setExperienceName] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  let workTypeFilters = ["Part-Time", "Full-Time"];
  let operatingModeFilters = ["Home", "Hybrid", "Office"];
  let experienceFilters = ["Junior", "Mid/Regular", "Senior"];
  const [jobsForUser, setJobsForUser] = useState<OfferType[]>([]);
  const [items, setItems] = useState<OfferType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modeFlag, setModeFlag] = useState(0);
  const [typeFlag, setTypeFlag] = useState(0);
  const [experienceFlag, setExperienceFlag] = useState(0);
  const [technologyFlag, setTechnologyFlag] = useState(0);
  const [count, setCount] = useState(modeFlag + typeFlag + technologyFlag);
  const { toast } = useToast();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const getAll = async () => {
      const response = await axios.get(
        "https://job-searcher-production.up.railway.app/getAll"
      );
      console.log(response.data.offers);
      setJobsForUser(response.data.offers);
      setItems(response.data.offers);
      setIsLoading(false);
    };
    getAll();
  }, []);

  useEffect(() => {
    setCount(modeFlag + typeFlag + technologyFlag + experienceFlag);
  }, [modeFlag, typeFlag, technologyFlag, experienceFlag]);

  const handleTechChange = (i: number, e: string) => {
    if (i === currentTech) {
      setCurrentTech(null);
      setTechnologyFlag(0);
    } else {
      setCurrentTech(i);
      setTechName(e);
      setTechnologyFlag(1);
    }
  };

  const handleTypeChange = (e: string, i: number) => {
    if (i === currentType) {
      setCurrentType(null);
      setTypeFlag(0);
    } else {
      setCurrentType(i);
      setTypeName(e);
      setTypeFlag(1);
    }
  };

  const handleOperatingModeChange = (e: string, i: number) => {
    if (i === currentMode) {
      setCurrentMode(null);
      setModeFlag(0);
    } else {
      setCurrentMode(i);
      setModeName(e);
      setModeFlag(1);
    }
  };

  const handleExperienceChange = (e: string, i: number) => {
    if (i === currentExperience) {
      setCurrentExperience(null);
      setExperienceFlag(0);
    } else {
      setCurrentExperience(i);
      setExperienceName(e);
      setExperienceFlag(1);
    }
  };

  const handleFilter = () => {
    if (count === 4) {
      axios
        .post("https://job-searcher-production.up.railway.app/filterData", {
          typeOfWork: typeName,
          operatingMode: modeName,
          technology: techName,
          experience: experienceName,
        })
        .then((res) => {
          console.log(res.data.jobs);
          setJobsForUser(res.data.jobs);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast({
        title: "Filters error",
        description:
          "Select all filters: technology, type of work, operating mode, experience and click filter :)",
      });
    }
  };

  const clearFilters = () => {
    setCurrentMode(null);
    setModeFlag(0);
    setCurrentType(null);
    setTypeFlag(0);
    setCurrentTech(null);
    setTechnologyFlag(0);
    setCurrentExperience(null);
    setExperienceFlag(0);
  };

  const handleReset = () => {
    setJobsForUser(items);
    clearFilters();
  };

  const handleFindJobTitle = () => {
    setJobsForUser(
      jobsForUser.filter((job) => {
        return job.title.toLowerCase().includes(titleFilter);
      })
    );
  };

  return (
    <div className="flex flex-col mb-16 w-screen min-h-screen" ref={ref}>
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
      <div
        className={`w-screen flex items-center justify-center pt-32 gap-2 md:gap-8 flex-wrap ${
          isInView
            ? "transition-all duration-500 translate-x-0 opacity-100"
            : "-translate-x-[500px] opacity-0"
        }`}
      >
        {techData.map((e, i) => (
          <div
            className={
              currentTech === i
                ? "w-16 md:w-24 flex flex-col cursor-pointer items-center bg-blue-500 hover:bg-blue-600/30 px-2 py-2 rounded-lg text-white"
                : "w-16 md:w-24 flex flex-col cursor-pointer items-center hover:bg-blue-600/30 px-2 py-2 rounded-lg"
            }
            key={i}
            onClick={() => handleTechChange(i, e.name)}
          >
            <div
              className={`w-10 md:w-12 h-10 md:h-12 rounded-full text-white ${e.color} flex items-center justify-center`}
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
        <div className="flex px-8 lg:px-0 flex-row flex-wrap justify-between lg:justify-start lg:flex-col lg:w-[350px] max-h-[600px] bg-white shadow-2xl shadow-black/20 py-2 rounded-lg border-[1px] border-zinc-500/20">
          <div className="flex w-full justify-between px-4 items-center">
            <h1 className="font-bold text-xl py-4 hidden lg:flex">Filters</h1>
            {count > 0 ? (
              <button
                onClick={clearFilters}
                className="bg-zinc-500 rounded-3xl px-2 py-2 font-bold text-white flex items-center gap-2"
              >
                <IoMdCloseCircle size={32} />
                Clear Filters
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col gap-1 md:gap-4 py-4 lg:border-t-[1px] lg:border-zinc-500 px-0 md:px-4">
            <h1 className="text-blue-500 font-bold text-md md:text-lg">
              Type of Work
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              {workTypeFilters.map((e, i) => (
                <button
                  className={`px-1 md:px-4 md:py-2 rounded-xl border-2 border-zinc-500 font-bold hover:bg-blue-500/30 ${
                    currentType === i ? "bg-blue-500 text-white" : ""
                  }`}
                  onClick={() => handleTypeChange(e, i)}
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
                    currentMode === i ? "bg-blue-500 text-white" : ""
                  }`}
                  onClick={() => handleOperatingModeChange(e, i)}
                  key={i}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1 md:gap-4 py-4 lg:border-t-[1px] lg:border-zinc-500 px-0 md:px-4 min-w-[150px]">
            <h1 className="text-blue-500 font-bold text-lg">Experience</h1>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              {experienceFilters.map((e, i) => (
                <button
                  className={`px-1 md:px-4 md:py-2 rounded-xl border-2 border-zinc-500 font-bold hover:bg-blue-500/30 ${
                    currentExperience === i ? "bg-blue-500 text-white" : ""
                  }`}
                  onClick={() => handleExperienceChange(e, i)}
                  key={i}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-1 md:gap-4 py-4 lg:border-t-[1px] lg:border-zinc-500 px-0 md:px-4">
            <button
              className={`px-4 md:px-16 py-1 md:py-3 rounded-3xl ${
                count === 4 ? "bg-blue-500" : "bg-blue-500/40"
              } font-bold text-white duration-200 hover:scale-110`}
              onClick={handleFilter}
            >
              Filter {count}/4
            </button>
          </div>
        </div>
        {isLoading ? (
          <h1 className="text-xl font-bold text-pink-500">Loading...</h1>
        ) : (
          <div className="flex flex-col items-center w-full lg:w-[650px] xl:w-[900px] overflow-y-auto gap-4">
            <div
              role="button"
              className="bg-emerald-500 px-4 py-2 rounded-xl font-bold text-white animate-pulse"
              onClick={handleReset}
            >
              See All Offers - [{items.length}]
            </div>
            {jobsForUser?.map((e: OfferType, i) => (
              <UserOffer offerData={e} key={i} />
            ))}
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Jobs;

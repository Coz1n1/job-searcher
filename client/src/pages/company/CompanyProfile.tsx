import { useSearchParams } from "react-router-dom";
import { FaSquarePlus } from "react-icons/fa6";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { OfferType } from "../../types/index";
import JobOffer from "./JobOffer";
import { IoClose } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";

const CompanyProfile = () => {
  const [searchParams] = useSearchParams();
  const company = searchParams.get("company");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState<[""]>();
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [operatingMode, setOperatingMode] = useState("");
  const [typeOfWork, setTypeOfWork] = useState("");
  const [jobsData, setJobsData] = useState<any[]>([]);
  const [isActive, setIsActive] = useState(false);

  const fortmatResponse = (res: any) => {
    return JSON.stringify(res, null, 2);
  };

  const findAll = async () => {
    const response = await axios.post("http://localhost:3002/companyOffers", {
      company: company,
    });
    return response.data.jobs;
  };

  const { data: companyJobOffers, isLoading } = useQuery<OfferType[], Error>({
    queryKey: ["query-tutorials"],
    queryFn: async () => {
      return await findAll();
    },
  });

  // const handleAdd = () => {
  //   axios
  //     .post("http://localhost:3002/companyOffer", {
  //       title: title,
  //       description: description,
  //       technologies: technologies,
  //       salary: salary,
  //       experience: experience,
  //       location: location,
  //       companyName: companyName,
  //       operatingMode: operatingMode,
  //       typeOfWork: typeOfWork,
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // if (isError) {
  //   return <h1>Error occured</h1>;
  // }

  return (
    <div className="w-screen h-screen">
      {isActive ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="flex items-center gap-8">
            <div className="px-1 py-1 bg-pink-500 rounded-xl">
              <IoClose
                size={33}
                onClick={() => setIsActive(!isActive)}
                className="cursor-pointer text-white"
              />
            </div>
            <h1 className="font-bold text-2xl">
              Adding offer for -{" "}
              <span className="text-blue-500">{company}</span>
            </h1>
          </div>
          <div className="flex items-center mt-8 gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-bold">Job Title</h1>
              <input
                type="text"
                placeholder="Enter job title..."
                className="w-[350px] px-4 py-2 border-2 border-pink-500 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-bold">Experience</h1>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="font-bold text-blue-500 text-2xl mb-4">{company}</h1>
          <h1 className="text-3xl font-bold mb-8">
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
              className="w-[700px] h-[300px] bg-zinc-500/20 rounded-xl border-2 border-dashed border-pink-500 flex items-center justify-center cursor-pointer hover:bg-zinc-500/30"
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

import { ChangeEvent, useState } from "react";
import {
  technologiesList,
  experienceList,
  operatingList,
  typeOfWorkList,
} from "../../data/selects";
import Select from "react-select";
import { Textarea } from "@/components/ui/textarea";
import makeAnimated from "react-select/animated";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { MdDescription, MdMergeType } from "react-icons/md";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FaMoneyBill } from "react-icons/fa";
import { IoLocationSharp, IoInvertMode, IoText } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa";
import { GrTechnology } from "react-icons/gr";

interface addingMenuProps {
  company?: string | null;
}

const AddingMenu: React.FC<addingMenuProps> = ({ company }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState();
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [operatingMode, setOperatingMode] = useState("");
  const [typeOfWork, setTypeOfWork] = useState("");
  const [step, setStep] = useState(0);
  const animatedComponents = makeAnimated();
  const { toast } = useToast();

  const handleAdd = () => {
    if (
      title != "" &&
      description != "" &&
      technologies != "" &&
      salary != "" &&
      experience != "" &&
      location != "" &&
      operatingMode != "" &&
      typeOfWork != ""
    ) {
      axios
        .post("http://localhost:3002/addCompanyOffer", {
          title: title,
          description: description,
          technologies: JSON.stringify(technologies),
          salary: salary,
          experience: experience,
          companyName: company,
          location: location,
          operatingMode: operatingMode,
          typeOfWork: typeOfWork,
        })
        .then((response) => {
          console.log(response.data);
          toast({
            title: "Job Added",
            description: "You can close this window now.",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast({
        title: "Error occured",
        description: "Please fill in all inputs",
      });
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <Card className="w-screen sm:w-[550px] py-12 flex items-center justify-center">
        <CardContent>
          <div className="flex flex-col items-center">
            <div
              className={cn("", {
                hidden: step == 1,
              })}
            >
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <IoText size={25} className="text-blue-500" />
                  Job Title
                </h1>
                <input
                  type="text"
                  placeholder="Enter job title..."
                  className="w-[300px] sm:w-[450px] px-4 py-2 border-2 border-pink-500 rounded-lg"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col mt-4 gap-2">
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <MdDescription size={25} className="text-blue-500" />
                  Job description
                </h1>
                <Textarea
                  placeholder="Describe..."
                  className="w-[300px] sm:w-[450px] min-h-[120px] border-2 border-pink-500 rounded-lg px-2"
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setDescription(e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col mt-4 gap-2">
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <IoLocationSharp size={25} className="text-blue-500" />
                  Location
                </h1>
                <input
                  type="text"
                  placeholder="Enter location..."
                  className="w-[300px] sm:w-[450px] px-4 py-2 border-2 border-pink-500 rounded-lg"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setLocation(e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <FaUserGraduate size={25} className="text-blue-500" />
                  Experience
                </h1>
                <Select
                  className="w-[300px] sm:w-[450px] border-2 border-pink-500 rounded-lg"
                  options={experienceList}
                  placeholder={experience}
                  value={experience}
                  onChange={(data: any) => setExperience(data.value)}
                  isSearchable={true}
                />
              </div>
              <div>
                <button
                  className="px-4 py-2 rounded-lg bg-zinc-500 mt-4 font-bold text-white flex items-center gap-2"
                  onClick={() => setStep(step + 1)}
                >
                  Next Step
                  <FaArrowRight size={18} />
                </button>
              </div>
            </div>
            <div
              className={cn("", {
                hidden: step == 0,
              })}
            >
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <GrTechnology size={25} className="text-blue-500" />
                  Technologies
                </h1>
                <Select
                  className="w-[300px] sm:w-[450px] border-2 border-pink-500 rounded-lg"
                  options={technologiesList}
                  placeholder="Select technologies..."
                  value={technologies}
                  onChange={(data: any) => setTechnologies(data)}
                  isSearchable={true}
                  isMulti
                  components={animatedComponents}
                />
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <IoInvertMode size={25} className="text-blue-500" />
                  Operating mode
                </h1>
                <Select
                  className="w-[300px] sm:w-[450px] border-2 border-pink-500 rounded-lg"
                  options={operatingList}
                  placeholder={operatingMode}
                  value={operatingMode}
                  onChange={(data: any) => setOperatingMode(data.value)}
                  isSearchable={true}
                />
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <MdMergeType size={25} className="text-blue-500" />
                  Type of Work
                </h1>
                <Select
                  className="w-[300px] sm:w-[450px] border-2 border-pink-500 rounded-lg"
                  options={typeOfWorkList}
                  placeholder={typeOfWork}
                  value={typeOfWork}
                  onChange={(data: any) => setTypeOfWork(data.value)}
                  isSearchable={true}
                />
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <FaMoneyBill size={25} className="text-blue-500" />
                  Salary
                </h1>
                <input
                  type="text"
                  placeholder="Enter salary..."
                  className="w-[300px] sm:w-[450px] px-4 py-2 border-2 border-pink-500 rounded-lg"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSalary(e.target.value)
                  }
                />
              </div>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 rounded-lg bg-zinc-500 mt-4 font-bold text-white flex items-center gap-2"
                  onClick={() => setStep(step - 1)}
                >
                  <FaArrowLeft size={18} />
                  Step Back
                </button>
                <button
                  className="px-8 py-2 rounded-lg bg-emerald-500 text-white font-bold mt-4"
                  onClick={handleAdd}
                >
                  Add Offer
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default AddingMenu;

import { FaBuilding } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className="h-[680px] w-screen relative">
      <img
        src="/images/hero-background.jpeg"
        alt="hero"
        className="object-cover h-full w-full brightness-50"
      />
      <div className="absolute top-36 w-full flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-blue-500 mb-4">
          Enjoy your passion with us
        </h1>
        <h1 className="text-6xl font-bold text-white tracking-widest">
          JobSearcher
        </h1>
        <p className="text-zinc-400 mt-4 text-xl max-w-[600px] text-center px-4 sm:px-0">
          We help you find your dream job by sharing our wide offer and give you
          an opportunity to choose from it
        </p>
        <button className="px-4 py-2 bg-blue-500 rounded-lg text-white font-bold mt-4 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-110">
          See all jobs
        </button>
        <h1 className="mt-4 font-bold text-white text-xl">
          Don't want to skip any offer?
        </h1>
        <div className="flex mt-4">
          <input
            type="text"
            className="px-4 py-2 rounded-tl-lg rounded-bl-lg focus:outline-none w-[250px] sm:w-[300px]"
            placeholder="Enter your email..."
          />
          <div className="bg-blue-500/50 py-2 px-4 text-white font-bold rounded-tr-lg rounded-br-lg cursor-pointer hover:bg-blue-500/100">
            Get notifications
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 w-full flex items-center justify-center gap-4">
        <div className="flex-col flex sm:flex-row px-4 py-2 bg-blue-500 rounded-3xl gap-2 items-center justify-center w-[100px] sm:w-[200px]">
          <FaBuilding size={32} className="text-white" />
          <h1 className="font-bold text-white text-center">30+ companies</h1>
        </div>
        <div className="flex-col flex sm:flex-row px-4 py-2 bg-blue-500 rounded-3xl gap-2 items-center justify-center w-[150px] sm:w-auto">
          <MdOutlineWork size={32} className="text-white" />
          <h1 className="font-bold text-white text-center">
            Over 40 offers per day
          </h1>
        </div>
        <div className="flex-col flex sm:flex-row px-4 py-2 bg-blue-500 rounded-3xl gap-2 items-center justify-center w-[100px] sm:w-[200px]">
          <FaPerson size={32} className="text-white" />
          <h1 className="font-bold text-white text-center">Large community</h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;

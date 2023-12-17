import Hero from "./Hero";
import { FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaAngleDown } from "react-icons/fa";
import Footer from "../../components/Footer";
import { GiWorld } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import Testimonials from "./Testimonials";
import Navbar from "../../components/Navbar";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import ChartSection from "./ChartSection";

const Home = () => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, 500, { duration: 5 });

    return controls.stop;
  }, []);

  return (
    <div className="overflow-hidden relative">
      <Navbar />
      <Hero />
      <div className="w-full relative h-[300px]">
        <div className="absolute w-6 h-6 bg-blue-500/60 top-16 left-4 lg:top-32 lg:left-16 rounded-full"></div>
        <div className="absolute w-6 h-6 bg-blue-500 top-64 lg:top-56 right-8 rounded-full"></div>
        <div className="absolute w-3 h-3 bg-emerald-500 top-4 lg:top-16 right-32 rounded-full"></div>
        <div className="absolute w-4 h-4 bg-red-500 top-56 left-8 lg:top-24 lg:left-48 rounded-full"></div>
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          <span className="flex text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 from-10% via-sky-500 via-30% to-purple-500 to-90%">
            +<motion.div>{rounded}</motion.div>
            Developers
          </span>
          <h1 className="font-bold text-2xl text-center">
            Reach our community of developers and start to work with them.
          </h1>
          <div className="flex gap-8 mt-4">
            <button className="flex items-center justify-center px-4 py-2 bg-pink-500 rounded-3xl font-bold text-lg gap-2 w-[130px] text-white">
              <FaGithub size={32} />
              Github
            </button>
            <button className="flex items-center justify-center px-4 py-2 bg-pink-500 rounded-3xl font-bold text-lg gap-2 w-[130px] text-white">
              <SiGmail size={32} />
              Mail
            </button>
          </div>
        </div>
      </div>
      <ChartSection />
      <div className="w-full h-[350px] sm:h-[550px] flex items-center justify-center bg-gradient-to-r from-white to-blue-100">
        <div className="flex">
          <div className="sm:w-1/2 flex flex-col items-center justify-center px-4">
            <h1 className="text-2xl font-bold text-center">
              Are you recruiting team for your company?
            </h1>
            <p className="text-zinc-500 mt-2 text-center max-w-[550px]">
              Besides of job offers for developers we created a tool that allows
              you to create your own offers and hire dream team to your company.
            </p>
            <div className="w-full flex items-center justify-center gap-2 mt-4">
              <h1 className="font-bold text-2xl text-blue-500">Do it here</h1>
              <FaAngleDown size={36} className="text-blue-500 animate-bounce" />
            </div>
            <button className="flex items-center justify-center px-4 py-2 bg-pink-500 rounded-3xl font-bold text-lg gap-2 w-[130px] text-white mt-2">
              Post a job
            </button>
          </div>
          <div className="hidden sm:w-1/2 sm:flex items-center justify-start">
            <img
              src="/images/employee.png"
              alt="employee"
              className="w-[600px] hidden sm:flex"
            />
          </div>
        </div>
      </div>
      <Testimonials />
      <div className="w-full flex flex-col items-center justify-center mt-24 mb-24">
        <h1 className="text-2xl font-bold">Dive deeper in our application</h1>
        <div className="flex items-center justify-center flex-wrap mt-8 gap-8">
          <div className="w-[300px] shadow-md shadow-black/20 rounded-lg flex flex-col items-center justify-center py-4 px-2">
            <div className="flex items-center justify-center gap-2">
              <div className="bg-zinc-500/20 px-1 py-1 rounded-xl">
                <GiWorld size={26} />
              </div>
              <h1 className="text-center font-bold text-pink-500">
                One of the most visited job-site in the world
              </h1>
            </div>
            <p className="text-zinc-500 mt-2">We</p>
          </div>
          <div className="w-[300px] shadow-md shadow-black/20 rounded-lg flex flex-col items-center justify-center py-4 px-2">
            <div className="flex items-center justify-center gap-2">
              <div className="bg-zinc-500/20 px-1 py-1 rounded-xl">
                <IoMdSettings size={26} />
              </div>
              <h1 className="text-center font-bold text-pink-500">
                Tools for everyone
              </h1>
            </div>
            <p className="text-zinc-500 text-center mt-2">
              Job Seeker or HR Manager? You can find here every necessary tool.
            </p>
          </div>
          <div className="w-[300px] shadow-md shadow-black/20 rounded-lg flex flex-col items-center justify-center py-4 px-2">
            <div className="flex items-center justify-center gap-2">
              <div className="bg-zinc-500/20 px-1 py-1 rounded-xl">
                <FaUser size={26} />
              </div>
              <h1 className="text-center font-bold text-pink-500">
                User-friendly interface
              </h1>
            </div>
            <p className="text-zinc-500 text-center mt-2">
              We deliver our application in the most attractive way possible.
            </p>
          </div>
        </div>
        <div className="w-[700px] h-[380px] bg-zinc-500/20 shadow-2xl shadow-black/20 rounded-xl mt-24">
          <img
            src="/images/app.png"
            alt="app"
            className="object-cover h-full w-full rounded-xl"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

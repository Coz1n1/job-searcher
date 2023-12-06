import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full h-[200px] shadow-xl shadow-black flex items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-2xl font-bold tracking-widest">JobSearcher</h1>
        <div className="flex gap-2">
          <a href="https://www.linkedin.com/in/kacper-tokaj/" target="#blank">
            <FaLinkedin size={32} className="text-blue-500 cursor-pointer" />
          </a>
          <a href="https://github.com/Coz1n1" target="#blank">
            <FaGithub size={32} className="text-zinc-600 cursor-pointer" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;

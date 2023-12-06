import { useState } from "react";
import TESTIMONIALS from "../../data/testimonials.json";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Testimonials = () => {
  const [slideWidth, setSlideWidth] = useState(0);
  const [xPos, setXpos] = useState(0);
  const [style, setStyle] = useState({
    transform: `translateX(${xPos}px)`,
  });
  const handleClick = (e: string) => {
    e === "left" ? setXpos((x) => x + 625) : setXpos((x) => x - 625);
    setStyle({ transform: `translateX(${xPos}px)` });
    // if (e === "left") {
    //   setSlideWidth(slideWidth + 625);
    //   console.log(slideWidth);
    //   if (slideWidth != 650) {
    //     document.getElementById(
    //       "slider"
    //     )!.style.transform = `translateX(${slideWidth}px)`;
    //   } else {
    //     setSlideWidth(slideWidth - 2500);
    //   }
    // } else {
    //   setSlideWidth(slideWidth - 625);
    //   console.log(slideWidth);
    //   if (slideWidth != -1875) {
    //     document.getElementById(
    //       "slider"
    //     )!.style.transform = `translateX(${slideWidth}px)`;
    //   } else {
    //     setSlideWidth(slideWidth + 1875);
    //   }
    // }
  };

  return (
    <div className="w-screen text-center">
      <h1 className="text-4xl font-bold">
        Our actions are supported by customer opinions
      </h1>
      <div className="w-screen flex overflow-hidden min-h-[500px] mt-12">
        <div
          className={`flex transition-all duration-300 h-full gap-4`}
          id="slider"
          style={style}
        >
          {TESTIMONIALS.map((e, i) => (
            <div
              className="h-full w-[625px] flex bg-zinc-100/50 shadow-md shadow-black/10 px-4 py-8 rounded-lg flex-col text-left"
              key={i}
            >
              <h1 className="font-bold ">{e.name}</h1>
              <h1 className="mt-2 text-blue-500 text-lg font-bold">
                {e.company}
              </h1>
              <p>{e.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex items-center justify-center gap-4">
        <button
          className="bg-pink-500 px-4 py-2 rounded-lg font-bold text-white flex items-center justify-center gap-1"
          onClick={() => handleClick("left")}
        >
          <FaAngleLeft />
          Previous
        </button>
        <button
          className="bg-pink-500 px-4 py-2 rounded-lg font-bold text-white flex items-center justify-center gap-1"
          onClick={() => handleClick("right")}
        >
          Next
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default Testimonials;

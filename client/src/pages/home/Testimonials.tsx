import TESTIMONIALS from "../../data/testimonials.json";

const Testimonials = () => {
  return (
    <div className="w-screen text-center min-h-[500px] flex flex-col items-center justify-center mt-12">
      <h1 className="text-4xl font-bold">
        Our actions are supported by customer opinions
      </h1>
      <div className="w-screen flex flex-wrap mt-12 items-center justify-center gap-8">
        {TESTIMONIALS.map((e, i) => (
          <div
            className="w-screen sm:w-[300px] lg:w-[425px] xl:w-[525px] h-[250px] sm:h-[330px] lg:h-[300px] xl:h-[250px] flex bg-zinc-100/50 shadow-md shadow-black/10 px-4 py-4 rounded-lg flex-col text-left"
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
  );
};

export default Testimonials;

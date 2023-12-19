import { Bar } from "react-chartjs-2";
import { chartData } from "../../data/chartData";
import { useState } from "react";
import { Chart } from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const ChartSection = () => {
  const [dataToChart] = useState({
    labels: chartData.map((e) => e.year),
    datasets: [
      {
        label: "Users Gained In The Years",
        data: chartData.map((e) => e.userGain),
        backgroundColor: [
          "gray",
          "yellow",
          "blue",
          "orange",
          "purple",
          "green",
        ],
      },
    ],
  });

  return (
    <div className="w-full flex items-center flex-col mt-12 mb-24 gap-12">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-center text-blue-500">
          Grow fast with us
        </h1>
        <p className="text-zinc-500 font-bold text-xl text-center">
          Join our group of enthusiasts, which is growing every year, and get
          your dream job.
        </p>
      </div>
      <div className="w-full md:w-[700px] lg:w-[1000px]">
        <Bar data={dataToChart} />
      </div>
    </div>
  );
};

export default ChartSection;

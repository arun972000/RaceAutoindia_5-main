/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
  plugins: {
    title: {
      display: true,
      text: "Number of Articles Posted every month",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function BarChart({ value }) {
  const data = {
    labels,
    datasets: [
      {
        label: "Values",
        data: value,
        backgroundColor: "#ba0000",
        borderSkipped: false,
      },
    ],
  };

  return (

      <Bar data={data} options={options} />

  );
}

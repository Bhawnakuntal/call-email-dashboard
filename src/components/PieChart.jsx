import { useRef } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function PieChart({ counts, onSliceClick }) {

  const labels = [
    "Face to Face",
    "InPerson",
    "Phone",
    "Email",
    "Other"
  ];

  const dataValues = [
    counts.faceToFace,
    counts.inPerson,
    counts.phone,
    counts.email,
    counts.other
  ];

  const total = dataValues.reduce((a, b) => a + b, 0);

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          "#1E90FF",
          "#00BFFF",
          "#87CEFA",
          "#6495ED",
          "#4682B4"
        ],
        borderColor: "#c7dcfbff",
        borderWidth: 2,
      },
    ],
  };

  // THIS IS THE MAGIC FIX — always fires on click 
  const handlePieClick = (event) => {
    const chart = chartRef.current;

    if (!chart) return;

    const elements = chart.getElementsAtEventForMode(
      event,
      "nearest",
      { intersect: true },
      true
    );

    if (!elements.length) return;

    const sliceIndex = elements[0].index;
    const segmentName = labels[sliceIndex];

    if (onSliceClick) {
      onSliceClick(segmentName);
    }
  };

  // We MUST store the chart instance to detect clicks
  const chartRef = useRef(null);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 47,},

    onClick: handlePieClick,

    plugins: {
      legend: {
        position: "top",
        align: "center",
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          padding: 10,
          font: { size: 13, weight: "bold" },
          color: "#004085",
        },
        
      },

      datalabels: {
        color: "#004085",
        font: {
          size: 10,
          weight: "bold",
        },
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          const percentage = ((value / total) * 100).toFixed(0);
          return `${label} (${percentage}%)`;
        },
        anchor: "end",
        align: "end",
        offset: -3,
        clamp: false,
      },
    },
  };

  return (
    <div 
      style={{
        width: "500px",
        height: "500px",
        marginTop: "10px",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <Pie 
        ref={chartRef}          // ⭐ important
        data={data}
        options={options}
      />
    </div>
  );
}

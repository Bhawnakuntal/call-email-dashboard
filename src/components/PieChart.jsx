import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function PieChart({ counts }) {
  const dataValues = [
    counts.faceToFace,
    counts.inPerson,
    counts.phone,
    counts.email,
    counts.other
  ];

  const labels = [
    "Face to Face",
    "InPerson",
    "Phone",
    "Email",
    "Other"
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
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 20
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 12,     // ⭐ smaller legend box
          boxHeight: 12,
          padding: 12,      // ⭐ even spacing
          font: {
            size: 13,
            weight: "bold",
          },
          color: "#004085",
        },
      },
      datalabels: {
        color: "#004085",
        top : 800,
        font: {
          size: 13,
          weight: "bold",
        },
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          const percentage = ((value / total) * 100).toFixed(0);
          return `${label} (${percentage}%)`;
        },
        anchor: "end",
        align: "center",
        offset: 15,
        clamp: true,
      },
    },
  };

  return (
    <div 
      style={{
        width: "950px",
        height: "400px",
        marginTop: "20px",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <Pie data={data} options={options} />
    </div>
  );
}

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ counts }) {
  const data = {
    labels: [
      "Face to Face",
      "InPerson",
      "Phone",
      "Email",
      "Other"
    ],
    datasets: [
      {
        data: [
          counts.faceToFace,
          counts.inPerson,
          counts.phone,
          counts.email,
          counts.other
        ],
        backgroundColor: [
          "#1E90FF",
          "#00BFFF",
          "#87CEFA",
          "#6495ED",
          "#4682B4"
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <div style={{ width: "450px", height: "450px", marginTop: "20px" }}>
      <Pie data={data} options={options} />
    </div>
  );
}

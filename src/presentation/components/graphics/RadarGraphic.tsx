import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import "chart.js/auto";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
type GraphicsChartJsI = {
  dataE: number[];
  title: string;
  year: string;
  labels: string[];
};
const RadarGraphicChartJS = ({
  dataE,
  labels,
  title,
  year,
}: GraphicsChartJsI) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: `Control de ${title} del año ${year}`,
        data: dataE,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderWidth: 2,
      },
    ],
  };
  const options = {
    type: 'line',
    responsive: true,
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
        type: "logarithmic" as const,
      },
    },
    plugins: {
        legend: {
          display: true, //para el label pricipal del grafico
          position: "top" as const,
          labels: {
            font: {
              size: 14,
            },
            color: "#4a5568",
          },
        },
        tooltip: {
          enabled: true, //para valores dentro de la grafica
          mode: "index" as const,
          intersect: false,
          callbacks: {
            label: function (tooltipItem: any) {
              return `$${tooltipItem.raw} gastos`;
            },
          },
        },
      },
      elements: {
        line: {
          tension: 0.4,
          borderColor: "#3182ce",
          borderWidth: 2,
        },
        point: {
          radius: 6,
          backgroundColor: "#3182ce",
          hoverRadius: 7,
        },
      },
  };

  return (
    <div className="h-96">
      <Line data={data} options={options} />
    </div>
  );
};
export default RadarGraphicChartJS;

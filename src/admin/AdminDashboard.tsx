import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const AdminDashboard: React.FC = () => {

  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Flights Booked",
        data: [150, 200, 180, 220, 300, 250],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

 
  const pieChartData = {
    labels: ["On-Time", "Delayed", "Cancelled"],
    datasets: [
      {
        label: "Flight Status",
        data: [70, 20, 10],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [5000, 7000, 6000, 8000, 10000, 9500],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="dashCharts">
      
      <div className="charts">
         <div className="chartsCouple">
      <div className="chartDiv">
         <div className="h3Div">
        <h3>Flights Booked Per Month</h3>
        </div>
        <Bar data={barChartData} options={{ responsive: true }} />
      </div>
      <div  className="chartDiv">
         <div className="h3Div">
        <h3>Monthly Revenue</h3>
        </div>
        <Line data={lineChartData} options={{ responsive: true }} />
      </div>
      </div>
      <div className="sngleChart">
      <div  className="chartDiv">
         <div className="h3Div">
        <h3>Flight Status Distribution</h3>
        </div>
        <Pie data={pieChartData} options={{ responsive: true }} />
      </div>
      </div>
      
      </div>
    </div>
  );
};

export default AdminDashboard;

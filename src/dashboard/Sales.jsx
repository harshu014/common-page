import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Sales = () => {
  const salesData = {
    labels: ["10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm"],
    datasets: [
      {
        label: "Sales Performance",
        data: [300, 400, 250, 600, 700, 200, 150, 800, 900, 950, 1000, 1020],
        backgroundColor: [
          "#FFDD44",
          "#FFDD44",
          "#FFDD44",
          "#FFDD44",
          "#FFDD44",
          "#FFDD44",
          "#FFDD44",
          "#FFD700", // Highlighted Bar
          "#EAEAEA",
          "#EAEAEA",
          "#EAEAEA",
          "#EAEAEA",
        ],
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const topDishes = [
    { name: "Paneer Tikka Masala", price: 720, total: 28800, plates: 40 },
    { name: "Veg Biryani", price: 650, total: 29250, plates: 45 },
    { name: "Malai Kofta", price: 850, total: 25500, plates: 30 },
    { name: "Spinach and Corn L...", price: 950, total: 19000, plates: 20 },
    { name: "Aloo Paratha & Curd", price: 250, total: 18750, plates: 75 },
  ];

  return (
    <div className="container mt-4">
  <div className="row align-items-stretch">
    {/* Sales Performance Card */}
    <div className="col-md-7">
      <div className="card p-3 h-100">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="h4 fw-bold">Sales Performance</h2>
          <button className="btn text-primary fw-bold" style={{ backgroundColor: "skyblue" }}>Today ^</button>
        </div>
        <Bar data={salesData} options={options} />
      </div>
    </div>

    {/* Top Selling Dishes Card */}
    <div className="col-md-5">
      <div className="card p-3 h-100">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="h4 fw-bold">Top Selling Dishes</h2>
           <button className="btn text-primary fw-bold" style={{ backgroundColor: "skyblue" }}>Today ^</button>
        </div>

        <ul className="list-group mt-3">
          {topDishes.map((dish, index) => {
            const maxPlates = Math.max(...topDishes.map(d => d.plates)); // Get the highest plate count for scaling
            const progressWidth = (dish.plates / maxPlates) * 100; // Scale based on max plates

            return (
              <li key={index} className="list-group-item">
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">{dish.name} <br />
                    <span style={{ color: "grey" }}>₹{dish.price}</span>
                  </span>
                  <span className="text-warning fw-bold">₹{dish.total.toLocaleString()}
                    <br />
                    <span style={{ color: "grey" }}>{dish.plates} plates</span>
                  </span>
                </div>

                {/* Progress Bar for Sales Representation */}
                <div className="progress mt-2" style={{ height: "10px" }}>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: `${progressWidth}%` }}
                    aria-valuenow={dish.plates}
                    aria-valuemin="0"
                    aria-valuemax={maxPlates}
                  ></div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </div>
</div>

  );
};

export default Sales;
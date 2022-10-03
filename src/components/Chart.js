import React from "react";
import "chart.js/auto";
import { useLocation } from "react-router-dom";

import { Bar } from "react-chartjs-2";
import { styledDate } from "../assets/styledDate";

const Chart = () => {
  const location = useLocation();
  const user = location.state;

  const dates = [];
  const amounts = [];
  const bgcolor = [];
  const bdcolor = [];

  user.history.forEach((bill) => {
    dates.push(styledDate(bill.dateGenerated));
    amounts.push(bill.Amount);
    if (bill.Status === "Due") {
      bgcolor.push("rgba(255, 99, 132, 0.2)");
      bdcolor.push("rgba(255, 99, 132, 1)");
    } else if (bill.Status === "Processing") {
      bgcolor.push("rgba(255, 159, 64, 0.2)");
      bdcolor.push("rgba(255, 159, 64, 1)");
    } else {
      bgcolor.push("rgba(75, 192, 192, 0.2)");
      bdcolor.push("rgba(75, 192, 192, 1)");
    }
  });
  return (
    <div className="chart-box">
      <Bar
        data={{
          labels: dates,
          datasets: [
            {
              label: "Bill Amount",
              data: amounts,
              backgroundColor: bgcolor,
              borderColor: bdcolor,
              borderWidth: 1,
            },
            // {
            //   label: 'Quantity',
            //   data: [47, 52, 67, 58, 9, 50],
            //   backgroundColor: 'orange',
            //   borderColor: 'red',
            // },
          ],
        }}
        height={600}
        width={400}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            y: { beginAtZero: true },
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
  );
};

export default Chart;

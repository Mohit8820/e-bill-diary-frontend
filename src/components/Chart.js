import React, { useContext } from "react";
import "chart.js/auto";
import { useLocation } from "react-router-dom";

import { AuthContext } from "../contexts/auth-context";

import { Bar } from "react-chartjs-2";
import { styledDate } from "../assets/styledDate";

const Chart = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  if (auth.isLoggedIn) {
    const user = location.state;

    const dates = [];
    const amounts = [];
    const bgcolor = [];
    const bdcolor = [];

    user.history.forEach((bill) => {
      dates.push(styledDate(bill.dateGenerated));
      amounts.push(bill.Amount);
      if (bill.Status === "Due") {
        bgcolor.push("rgba(240, 80, 83, 0.2)");
        bdcolor.push("rgba(240, 80, 83, 1)");
      } else if (bill.Status === "Processing") {
        bgcolor.push("rgba(248, 181, 0, 0.2)");
        bdcolor.push("rgba(248, 181, 0, 1)");
      } else {
        bgcolor.push("rgba(132, 204, 22, 0.2)");
        bdcolor.push("rgba(132, 204, 22, 1)");
      }
    });

    return (
      <React.Fragment>
        <h2>Chart</h2>
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
      </React.Fragment>
    );
  } else
    return (
      <div>
        <span className="info">Session time out...Please Login</span>
      </div>
    );
};

export default Chart;

import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart(props) {
  const day = Object.keys(props.days)[props.date.getDate()]
  const daysdata = props.days[day]
  const state = {
    labels: [
      "horoscope/vedic",
      "horoscope/chartimage",
      "prediction/dailysun",
      "matching/ashtakoot",
      "matching/papasamya",
    ],
    datasets: [
      {
        label: "Usage",
        backgroundColor: [
          "#B21F00",
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
        ],
        hoverBackgroundColor: [
          "#501800",
          "#4B5000",
          "#175000",
          "#003350",
          "#35014F",
        ],
        data: [
          daysdata["horoscope/chartimage"],
          daysdata["horoscope/vedic"],
          daysdata["prediction/dailysun"],
          daysdata["matching/ashtakoot"],
          daysdata["matching/papasamya"],
        ],
      },
    ],
  };

  return (
    <div >
      <Pie
        className="container"
        
        data={state}
        options={{
          responsive: true,
          maintainAspectRatio: false,

          title: {
            display: true,
            text: "Api calls per day",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
}

export default PieChart;

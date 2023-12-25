import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Box } from "@chakra-ui/react";

const BarChart = ({ data, label, title }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const barChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: label,
            data: Object.values(data),
            backgroundColor: [
              "#95dbd6",
              "#95b3db",
              "#9597db",
              "#a495db",
              "#db9595",
              "#dbac95",
              "#dbca95",
              "#dadb95",
              "#bddb95",
              "#96db95",
              "#95dbb6",
              "#c495db",
              "#db95d9",
              "#db95c0",
            ],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: title,
            padding: {
              top: 10,
              bottom: 10,
            },
            font: {
              size: 20,
            },
          },
        },
      },
    });

    return () => {
      barChart.destroy();
    };
  }, [data, label, title]);

  return <Box><canvas ref={chartRef} width="200" height="200"></canvas></Box>;
};

export default BarChart;

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Box } from "@chakra-ui/react";

const PieChart = ({ data, title }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const pieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            data: Object.values(data),
            backgroundColor: [
              "#95b3db",
              "#95dbd6",
              "#c495db",
              "#db95d9",
              "#db95c0",
              "#9597db",
              "#a495db",
              "#db9595",
              "#dbac95",
              "#dbca95",
              "#dadb95",
              "#bddb95",
              "#96db95",
              "#95dbb6",
            ],
          },
        ],
      },
      options: {
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
      pieChart.destroy();
    };
  }, [data, title]);

  return <Box><canvas ref={chartRef} width="200" height="200"></canvas></Box>;
};

export default PieChart;

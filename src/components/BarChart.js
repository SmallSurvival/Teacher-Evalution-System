import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,

  BarElement,

} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
);


const BarChart = () => {
  const [chart, setChart] = useState({})
  const baseUrl = "http://localhost/TestDemo/api/Tets/getAverage";


  useEffect(() => {
    const fetchCoins = async () => {
      await fetch(`${baseUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*"
        }
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              window.localStorage.setItem('chart', JSON.stringify(json));
              console.log("data", json);
              setChart(json)

            });
          }
        }).catch((error) => {
          console.log(error);
        });
    };
    fetchCoins()
  }, [baseUrl])
  let chartData = JSON.parse(localStorage.getItem("chart"));
  console.log(chartData);
  // console.log("chart", chart);
  const data = {
    labels: chartData?.map(x => x.Question_Desc),
    datasets: [{
      label: `${chartData?.length}`,
      data: chartData?.map(x => x.AverageMarks),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
      ]
    }]
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }

  return (
    <div>
      <Bar
        data={data}
        height={200}
        options={options}

      />
    </div>
  )
}

export default BarChart

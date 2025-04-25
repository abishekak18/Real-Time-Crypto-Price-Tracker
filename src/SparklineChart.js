// components/SparklineChart.js
import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';

const SparklineChart = ({ data }) => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    
    // Generate some sample price history data (7 points for 7 days)
    const priceHistory = Array.from({ length: 7 }, (_, i) => 
      data.price * (1 + (Math.random() - 0.5) * 0.1 * (i + 1))
    );

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['6d', '5d', '4d', '3d', '2d', '1d', 'Today'],
        datasets: [{
          data: priceHistory,
          borderColor: priceHistory[6] >= priceHistory[0] ? '#10B981' : '#EF4444',
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          tension: 0.4,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { display: false },
          y: { display: false }
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={canvasRef} width="80" height="30" />;
};

export default SparklineChart;
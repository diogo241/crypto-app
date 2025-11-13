import { Line } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { useState, useEffect } from 'react';
import Spinner from './Spinner';

Chart.register([
  CategoryScale,
  Tooltip,
  Legend,
  TimeScale,
  LineElement,
  LinearScale,
  PointElement,
]);

const COINS_API_URL = import.meta.env.VITE_COINS_API_URL;

const CoinChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrices = async () => {
    try {
      const res = await fetch(
        `${COINS_API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`
      );
      if (!res.ok) throw new Error('Error getting data');
      const data = await res.json();
      const prices = data.prices.map((price) => ({
        x: price[0],
        y: price[1],
      }));

      setChartData({
        datasets: [
          {
            label: 'Price (USD)',
            data: prices,
            fill: true,
            borderColor: '#007bff',
            backgroundColor: 'rgba(0,123,255,0.1)',
            pointRadius: 0,
            tension: 0.3,
          },
        ],
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, [coinId]);

  return (
    <div style={{ marginTop: '3rem' }}>
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: { mode: 'index', intersect: false },
            },
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day',
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 7,
                },
              },
              y: {
                ticks: {
                  callback: (value) => `$${value.toLocaleString()}`,
                },
              },
            },
          }}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default CoinChart;

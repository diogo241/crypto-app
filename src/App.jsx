import { useState, useEffect } from 'react';
import CoinCard from './components/CoinCard';
import LimitSelector from './components/LimitSelector';
import FilterInput from './components/FilterInput';
import SortSelector from './components/SortSelector';

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('market_cap_desc');

  const fetchCoins = async () => {
    try {
      const res = await fetch(
        `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
      );
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      setCoins(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredCoins = coins
    .filter((coin) => {
      return (
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
      );
    })
    .slice()
    .sort((a, b) => {
      switch (sort) {
        case 'market_cap_desc':
          return b.market_cap - a.market_cap;
        case 'market_cap_asc':
          return a.market_cap - b.market_cap;
        case 'price_desc':
          return b.current_price - a.current_price;
        case 'price_asc':
          return a.current_price - b.current_price;
        case 'change_desc':
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case 'change_asc':
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
      }
    });

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    fetchCoins();
  }, [limit]);

  return (
    <div>
      <div
        style={{
          marginBottom: '2rem',
        }}
      >
        <h1>🚀 Crypto App</h1>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="top-controls">
        <FilterInput
          filter={filter}
          onFilterChange={(e) => setFilter(e.target.value)}
        />
        <SortSelector
          name={'sort'}
          onSortChange={(e) => setSort(e.target.value)}
          options={[
            {
              value: 'market_cap_desc',
              name: 'Market Cap (High to Low)',
            },
            {
              value: 'market_cap_asc',
              name: 'Market Cap (Low to High)',
            },
            {
              value: 'price_desc',
              name: 'Price (High to Low)',
            },
            {
              value: 'price_asc',
              name: 'Price (Low to High)',
            },
            {
              value: 'change_desc',
              name: '24h Change (High to Low)',
            },
            {
              value: 'change_asc',
              name: '24h Change (Low to High)',
            },
          ]}
        />
        <LimitSelector
          name={'limit'}
          onLimitChange={(e) => setLimit(Number(e.target.value))}
          options={[5, 10, 15, 20, 50, 100]}
        />
      </div>

      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length === 0 ? (
            <p>No coins matched</p>
          ) : (
            filteredCoins.map((coin) => (
              <CoinCard
                key={coin.id}
                id={coin.id}
                name={coin.name}
                image={coin.image}
                symbol={coin.symbol}
                currentPrice={coin.current_price}
                priceChange={coin.price_change_percentage_24h}
                marketCap={coin.market_cap}
              />
            ))
          )}
        </main>
      )}
    </div>
  );
};

export default App;

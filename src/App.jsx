import { useState, useEffect } from 'react';
import HomePage from './pages/home';
import { Routes, Route } from 'react-router';
import About from './pages/about';
import Header from './components/Header';
import NotFoundPage from './pages/not-found';
import CoinDetails from './pages/coin-details';

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
      if (!res.ok) throw new Error('Coins not fetched - too many requests to API');
      const data = await res.json();
      setCoins(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    fetchCoins();
  }, [limit]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              coins={coins}
              loading={loading}
              error={error}
              limit={limit}
              filter={filter}
              sort={sort}
              setCoins={setCoins}
              setFilter={setFilter}
              setLimit={setLimit}
              setSort={setSort}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path='/coin/:id' element={<CoinDetails />}/>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;

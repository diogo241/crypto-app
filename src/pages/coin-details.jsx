import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import Spinner from '../components/Spinner';
import CoinChart from '../components/CoinChart';
const COINS_API_URL = import.meta.env.VITE_COINS_API_URL;

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCoin = async () => {
    try {
      const res = await fetch(`${COINS_API_URL}/${id}`);
      if (!res.ok) throw new Error('Coin not fetched - too many requests to API');
      const data = await res.json();
      setCoin(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoin();
  }, []);
  return (
    <div className="coin-details-container">
      <Link to="/">Back To Home</Link>
      {loading && <Spinner />}
      {error && <div className="error">{error}</div>}
      {!loading && !error && (
        <>
          <h1 className="coin-details-title">
            {coin
              ? `${coin.name} (${coin.symbol?.toUpperCase()})`
              : 'Coin Details'}
          </h1>
          <img
            src={coin.image.large}
            alt={coin.name}
            className="coin-details-image"
          />
          <p>{coin.description.en.split('. ')[0] + '.'}</p>
          <div className="coin-details info">
            <h3>Rank: #{coin.market_cap_rank}</h3>
            <h3>
              Current Price: $
              {coin.market_data.current_price.usd.toLocaleString()}
            </h3>
            <h4>
              Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}
            </h4>
            <h4>24h High: ${coin.market_data.high_24h.usd.toLocaleString()}</h4>
            <h4>24h Low: ${coin.market_data.low_24h.usd.toLocaleString()}</h4>
            <h4>
              24h Price Change: ${coin.market_data.price_change_24h.toFixed(2)}(
              {coin.market_data.price_change_percentage_24h.toFixed(2)})
            </h4>
            <h4>
              Circulating Supply: $
              {coin.market_data.circulating_supply.toLocaleString()}
            </h4>
            <h4>
              Total Supply:{' '}
              {coin.market_data.total_supply.toLocaleString() || 'N/A'}
            </h4>
            <h4>
              All-time High: {coin.market_data.ath.usd.toLocaleString()} on{' '}
              {new Date(coin.market_data.ath_date.usd).toLocaleDateString()}
            </h4>
            <h4>
              All-time Low: {coin.market_data.atl.usd.toLocaleString()} on{' '}
              {new Date(coin.market_data.atl_date.usd).toLocaleDateString()}
            </h4>
            <h4>
              Last Updated: {new Date(coin.last_updated).toLocaleDateString()}
            </h4>
          </div>
          <div className="coin-details-link">
            {coin.links.homepage[0] && (
              <p>
                🌐
                <a
                  href={coin.links.homepage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              </p>
            )}
            {coin.links.blockchain_site[0] && (
              <p>
                🧩
                <a
                  href={coin.links.blockchain_site[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blockchain Explorer
                </a>
              </p>
            )}
            {coin.categories.length > 0 && (
              <p>Categories: {coin.categories.join(', ')}</p>
            )}
          </div>
          <CoinChart coinId={coin.id} />

          {!loading && !error && !coin && <p>No data found.</p>}
        </>
      )}
    </div>
  );
};

export default CoinDetails;

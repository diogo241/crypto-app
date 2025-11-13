import { Link } from 'react-router';

const CoinCard = ({
  id,
  name,
  image,
  symbol,
  currentPrice,
  priceChange,
  marketCap,
}) => {
  return (
    <Link to={`coin/${id}`}>
      <div className="coin-card" key={id}>
        <div className="coin-header">
          <img src={image} alt={name} className="coin-image" />
        </div>
        <div>
          <h2>{name}</h2>
          <p className="symbol">{symbol.toUpperCase()}</p>
        </div>
        <p>Price: ${currentPrice.toLocaleString()}</p>
        <p className={priceChange >= 0 ? 'positive' : 'negative'}>
          {priceChange.toFixed(2)}%
        </p>
        <p>Market Cap: {marketCap.toLocaleString()}</p>
      </div>
    </Link>
  );
};

export default CoinCard;

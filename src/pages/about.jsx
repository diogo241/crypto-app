import React from 'react';

const About = () => {
  return (
    <div className="about">
      <h1>About Crypto App</h1>
      <p>
        Simple project, where you can explore top cryptocurrencies by market
        cap, filter by name or symbol, and sort them by price, market cap or
        24hr change
      </p>
      <p>This project uses CoinGecko external API to receive the data.</p>
    </div>
  );
};

export default About;

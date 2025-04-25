import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllAssets } from './cryptoSlice';
import SparklineChart from './SparklineChart'; 

const CryptoTable = () => {
  const assets = useSelector(selectAllAssets);

  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    }
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    }
    return `$${num.toFixed(2)}`;
  };

  const getChangeColor = (change) => {
    return change >= 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">1h %</th>
            <th className="py-2 px-4 border-b">24h %</th>
            <th className="py-2 px-4 border-b">7d %</th>
            <th className="py-2 px-4 border-b">Market Cap</th>
            <th className="py-2 px-4 border-b">Volume (24h)</th>
            <th className="py-2 px-4 border-b">Circulating Supply</th>
            <th className="py-2 px-4 border-b">7D Chart</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <tr key={asset.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">
                <span>{asset.name}</span>
                <span className="text-gray-500 ml-1">{asset.symbol}</span>
              </td>
              <td className="py-2 px-4 border-b">${asset.price.toLocaleString()}</td>
              <td className={`py-2 px-4 border-b ${getChangeColor(asset.priceChange1h)}`}>
                {asset.priceChange1h > 0 ? '+' : ''}{asset.priceChange1h}%
              </td>
              <td className={`py-2 px-4 border-b ${getChangeColor(asset.priceChange24h)}`}>
                {asset.priceChange24h > 0 ? '+' : ''}{asset.priceChange24h}%
              </td>
              <td className={`py-2 px-4 border-b ${getChangeColor(asset.priceChange7d)}`}>
                {asset.priceChange7d > 0 ? '+' : ''}{asset.priceChange7d}%
              </td>
              <td className="py-2 px-4 border-b">{formatNumber(asset.marketCap)}</td>
              <td className="py-2 px-4 border-b">{formatNumber(asset.volume24h)}</td>
              <td className="py-2 px-4 border-b">
                {asset.circulatingSupply}M {asset.symbol}
              </td>
              <td className="py-2 px-4 border-b">
                <div className="w-20 h-10">
                  <SparklineChart data={asset} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
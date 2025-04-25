export const simulateWebSocket = (dispatch, getState, updateAsset) => {
    setInterval(() => {
      const assets = getState().crypto;
      const updated = assets.map(asset => {
        const priceChange = (Math.random() * 2 - 1) * 0.05 * asset.price; // ±5%
        return {
          ...asset,
          price: +(asset.price + priceChange).toFixed(2),
          change1h: +(Math.random() * 4 - 2).toFixed(2),
          change24h: +(Math.random() * 6 - 3).toFixed(2),
          change7d: +(Math.random() * 15 - 7.5).toFixed(2),
          volume24h: +(asset.volume24h * (1 + Math.random() * 0.05)).toFixed(0),
        };
      });
  
      updated.forEach(asset => dispatch(updateAsset(asset)));
    }, 1500);
  };
  
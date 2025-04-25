import { store } from './store';
import { updateAsset } from './cryptoSlice';

class CryptoWebSocket {
  constructor() {
    this.interval = null;
  }

  connect() {
    this.interval = setInterval(() => {
      this.generateRandomUpdates();
    }, 1500); 
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  generateRandomUpdates() {
    const { assets } = store.getState().crypto;
    
    assets.forEach(asset => {
      const priceChange = (Math.random() - 0.5) * 2; 
      const newPrice = asset.price * (1 + priceChange / 100);
      
      const updates = {
        price: parseFloat(newPrice.toFixed(2)),
        priceChange1h: parseFloat((asset.priceChange1h + (Math.random() - 0.5) * 0.2).toFixed(2)),
        priceChange24h: parseFloat((asset.priceChange24h + (Math.random() - 0.5) * 0.5).toFixed(2)),
        priceChange7d: parseFloat((asset.priceChange7d + (Math.random() - 0.5) * 0.3).toFixed(2)),
        volume24h: parseFloat((asset.volume24h * (1 + (Math.random() - 0.5) * 0.1)).toFixed(2)),
      };
      
      store.dispatch(updateAsset({ id: asset.id, updates }));
    });
  }
}

export const cryptoWebSocket = new CryptoWebSocket();
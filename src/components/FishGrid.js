import { useState, useEffect } from 'react';
import Api from '../api.js';
import './FishGrid.css';
import FishCard from './FishCard.js';

function FishGrid() {
  const [fish, setFish] = useState([]);

  const api = new Api();

  useEffect(() => {
    (async () => {
      const fishData = await api.getFish();
      setFish(fishData);
    })();
  }, []);

  return (
    <div className="FishGrid">
      <div className="FishGrid__Toolbar">
        <button>Filter</button>
        <button>Sortieren</button>
      </div>
      <div className="FishGrid__Grid">
        {fish.map(item => (<FishCard fish={item} key={item._id}/>))}
      </div>
    </div>
  );
}

export default FishGrid;

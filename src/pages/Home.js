import { useState, useEffect } from 'react';
import Api from '../api.js';
import './Home.css';
import FishGrid from '../components/FishGrid.js';

function Home() {
  // const [fish, setFish] = useState([]);

  // const api = new Api();

  // useEffect(() => {
  //   (async () => {
  //     const fishData = await api.getFish();
  //     setFish(fishData);
  //   })();
  // }, []);

  return (
    <div className="Home">
      <FishGrid />
    </div>
  );
}

export default Home;

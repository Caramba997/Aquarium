import { useState, useEffect } from 'react';
import Api from '../api';
import './Home.css';
import FishGrid from '../components/FishGrid';

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

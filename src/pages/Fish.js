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
    <div className="Fish">
      <div className="FishCard__ImageWrapper">
        {/* <img className={`FishCard__Image FishCard__Image--${fish.image ? 'custom' : 'default'}`} src={fish.image || PlaceholderImage} alt={`Foto von ${fish.name}`}/> */}
      </div>
      <div className="FishCard__Descriptors">
        <div className="FishCard__Name">
          Test
        </div>
        {/* <hr />
        <div className="FishCard__Chips">
          <div className="FishCard__Chip">
            <FishIcon className="FishCard__Icon" />
            <div>{fish.species}</div>
          </div>
          <div className="FishCard__Chip">
            <ColorsIcon className="FishCard__Icon" />
            <div>{fish.colors.join(', ')}</div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Home;

import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import Api from '../api.js';
import { useNavigate  } from "react-router-dom";
import './Fish.css';
import PlaceholderImage from '../images/fish_placeholder.png';
import { ReactComponent as FishIcon } from '../icons/fish.svg';
import { ReactComponent as HouseIcon } from '../icons/house.svg';
import { ReactComponent as CrossIcon } from '../icons/cross.svg';
import { ReactComponent as PencilIcon } from '../icons/pencil.svg';
import { ReactComponent as StarsIcon } from '../icons/stars.svg';
import { ReactComponent as ColorsIcon } from '../icons/color_palette.svg';
import { ReactComponent as MaleIcon } from '../icons/male.svg';
import { ReactComponent as FemaleIcon } from '../icons/female.svg';

function Home() {
  const { id } = useParams();
  const [fish, setFish] = useState({});

  const api = new Api();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const fishData = await api.getFish(id);
      setFish(fishData);
    })();
  }, []);

  const edit = () => {
    navigate(`/fish/${id}/edit`);
  }

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  }

  const deathHtml = fish.date_death ? (
    <div className="Fish__PropertyRow">
      <div className="Fish__PropertyLabel">
        Gestorben
      </div>
      <div className="Fish__PropertyValue">
        <CrossIcon className="Fish__Icon" />
        <div>{formatDate(fish.date_death)}</div>
      </div>
    </div>
  ) : null;

  return (
    <div className="Fish">
      <div className="Fish__Column">
        <div className="Fish__ImageWrapper">
          <img className="Fish__Image" src={fish.image ? `${process.env.REACT_APP_CLOUDFRONT_URL}/${fish.image.name}` : PlaceholderImage} alt={`Foto von ${fish.name}`}/>
        </div>
      </div>
      <div className="Fish__Column">
        <h2 className="Fish__Name">
          {fish.name || 'Name'}
          <button onClick={edit}>
            <PencilIcon className="Fish__Icon" />
          </button>
        </h2>
        <div className="Fish__Description">{fish.description}</div>
        <div className="Fish__PropertyRow">
          <div className="Fish__PropertyLabel">
            Art
          </div>
          <div className="Fish__PropertyValue">
            <FishIcon className="Fish__Icon" />
            <div>{fish.species}</div>
          </div>
        </div>
        <div className="Fish__PropertyRow">
          <div className="Fish__PropertyLabel">
            Geschlecht
          </div>
          <div className="Fish__PropertyValue">
            {fish.sex === 'female' ? (<FemaleIcon className="Fish__Icon" />) : fish.sex === 'male' ? (<MaleIcon className="Fish__Icon" />) : null}
            {fish.sex === 'female' ? (<div>Weiblich</div>) : fish.sex === 'male' ? (<div>Männlich</div>) : null}
          </div>
        </div>
        <div className="Fish__PropertyRow">
          <div className="Fish__PropertyLabel">
            Farben
          </div>
          <div className="Fish__PropertyValue">
            { fish.characteristics ? (<ColorsIcon className="Fish__Icon" />) : null }
            <div>{fish.colors?.join(', ')}</div>
          </div>
        </div>
        <div className="Fish__PropertyRow">
          <div className="Fish__PropertyLabel">
            Eigenschaften
          </div>
          <div className="Fish__PropertyValue">
            { fish.characteristics?.length ? (<StarsIcon className="Fish__Icon" />) : null }
            <div>{fish.characteristics?.join(', ')}</div>
          </div>
        </div>
        <div className="Fish__PropertyRow">
          <div className="Fish__PropertyLabel">
            Seit
          </div>
          <div className="Fish__PropertyValue">
            <HouseIcon className="Fish__Icon" />
            <div>{formatDate(fish.date_since)}</div>
          </div>
        </div>
        { deathHtml}
      </div>
    </div>
  );
}

export default Home;

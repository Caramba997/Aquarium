import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import useApi from '../api.js';
import Events from '../events.js';
import { useNavigate  } from "react-router-dom";
import './Fish.css';
import PlaceholderImage from '../images/fish_placeholder.png';
import { ReactComponent as FishIcon } from '../icons/fish.svg';
import { ReactComponent as HouseIcon } from '../icons/house.svg';
import { ReactComponent as AsteriskIcon } from '../icons/asterisk.svg';
import { ReactComponent as CrossIcon } from '../icons/cross.svg';
import { ReactComponent as PencilIcon } from '../icons/pencil.svg';
import { ReactComponent as StarsIcon } from '../icons/stars.svg';
import { ReactComponent as ColorsIcon } from '../icons/color_palette.svg';
import { ReactComponent as MaleIcon } from '../icons/male.svg';
import { ReactComponent as FemaleIcon } from '../icons/female.svg';
import { useContext } from 'react';
import { UserContext } from '../context.js';

function Home() {
  const { username } = useContext(UserContext);
  const { id } = useParams();
  const [fish, setFish] = useState({});

  const api = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      Events.push('pageState', 'page:loading');
      const fishData = await api.getFish(id);
      setFish(fishData);
      Events.push('pageState', 'page:ready');
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

  const getAge = (date) => {
    const d = new Date(date);
    const now = Date.now();
    const age = now - d.getTime();
    if (age / 1000 / 60 / 60 / 24 < 1) {
      return '1 Tag';
    }
    else if (age / 1000 / 60 / 60 / 24 / 7 < 1) {
      const days = Math.floor(age / 1000 / 60 / 60 / 24);
      return `${days} ${days === 1 ? 'Tag' : 'Tage'}`;
    }
    else if (age / 1000 / 60 / 60 / 24 / 30 < 1) {
      const weeks = Math.floor(age / 1000 / 60 / 60 / 24 / 7);
      return `${weeks} ${weeks === 1 ? 'Woche' : 'Wochen'}`;
    }
    else if (age / 1000 / 60 / 60 / 24 / 30 / 12 < 1) {
      const months = Math.floor(age / 1000 / 60 / 60 / 24 / 30);
      return `${months} ${months === 1 ? 'Monat' : 'Monate'}`;
    }
    else {
      const years = Math.floor(age / 1000 / 60 / 60 / 24 / 365);
      return `${years} ${years === 1 ? 'Jahr' : 'Jahre'}`;
    }
  };

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
          { username ? (
            <button onClick={edit}>
              <PencilIcon className="Fish__Icon" />
            </button>
          ) : null}
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
        <div className="Fish__PropertyRow">
          <div className="Fish__PropertyLabel">
            Geboren
          </div>
          <div className="Fish__PropertyValue">
            <AsteriskIcon className="Fish__Icon" />
            <div>{fish.born_here ? formatDate(fish.date_since) + ' (' + getAge(fish.date_since) + ' alt)' : '?'}</div>
          </div>
        </div>
        { deathHtml }
      </div>
    </div>
  );
}

export default Home;

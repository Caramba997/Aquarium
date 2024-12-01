import './FishCard.css';
import { Link } from "react-router-dom";
import PlaceholderImage from '../images/fish_placeholder.png';
import { ReactComponent as FishIcon } from '../icons/fish.svg';
import { ReactComponent as CrossIcon } from '../icons/cross.svg';
import { ReactComponent as ColorsIcon } from '../icons/color_palette.svg';
import { ReactComponent as MaleIcon } from '../icons/male.svg';
import { ReactComponent as FemaleIcon } from '../icons/female.svg';

function FishCard(props) {

  const fish = props.fish;

  return (
    <Link to={{ pathname: `/fish/${fish._id}` }} className={`FishCard${fish.date_death ? ' FishCard--red' : ''}`}>
      <div className="FishCard__ImageWrapper">
        <img className={`FishCard__Image FishCard__Image--${fish.image ? 'custom' : 'default'}`} src={fish.image ? `${process.env.REACT_APP_CLOUDFRONT_URL}/${fish.image.name}` : PlaceholderImage} alt={`Foto von ${fish.name}`}/>
      </div>
      <div className="FishCard__Descriptors">
        <div className="FishCard__Name">
          {fish.name}
          <div className="FishCard__Icons">
            {fish.sex === 'female' ? (<FemaleIcon className="FishCard__Icon" />) : (<MaleIcon className="FishCard__Icon" />)}
            {fish.date_death ? (<CrossIcon className="FishCard__Icon" />) : null}
          </div>
        </div>
        <hr />
        <div className="FishCard__Chips">
          <div className="FishCard__Chip">
            <FishIcon className="FishCard__Icon" />
            <div>{fish.species}</div>
          </div>
          <div className="FishCard__Chip">
            <ColorsIcon className="FishCard__Icon" />
            <div>{fish.colors.join(', ')}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FishCard;

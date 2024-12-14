import './LoadingContainer.css';
import { ReactComponent as FishIcon } from '../icons/fish.svg';
import { ReactComponent as WaveIcon } from '../icons/wave.svg';

export default function LoadingContainer({ children, type, isLoading, fullHeight }) {

  return (
    <div className={`LoadingContainer LoadingContainer--${type}${fullHeight ? ' LoadingContainer--fullHeight' : ''}${isLoading ? ' is-loading' : ''}`}>
      { children }
      { type === 'fish' && (
      <div className="LoadingContainer__FishBox">
        <FishIcon className="LoadingContainer__Icon LoadingContainer__Icon--fish" />
        <WaveIcon className="LoadingContainer__Icon LoadingContainer__Icon--waveOne" />
        <WaveIcon className="LoadingContainer__Icon LoadingContainer__Icon--waveTwo" />
      </div>
      ) }
    </div>
  );
}
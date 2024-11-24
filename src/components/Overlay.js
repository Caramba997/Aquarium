import './Overlay.css';
import { useEffect, useState } from 'react';
import Events from '../events';

function Overlay() {

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onShow = () => {
      setIsVisible(true);
    };
    const onHide = () => {
      setIsVisible(false);
    }

    Events.subscribe("overlay:show", onShow);
    Events.subscribe("overlay:hide", onHide);

    return () => {
      Events.unsubscribe("overlay:show", onShow);
      Events.unsubscribe("overlay:hide", onHide);
    }
  }, []);

  const onClick = () => {
    Events.publish('overlay:clicked');
  }

  return (
    <div id="Overlay" className={isVisible ? 'is-visible' : ''} onClick={onClick}></div>
  );
}

export default Overlay;

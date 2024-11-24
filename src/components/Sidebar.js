import './Sidebar.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Events from '../events';

function Sidebar() {

  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
    Events.publish('overlay:show');
  }

  const close = () => {
    setIsOpen(false);
    Events.publish('overlay:hide');
  };

  useEffect(() => {
    const onOpen = () => {
      open();
    };
    const onClose = () => {
      close();
    };

    Events.subscribe('sidebar:open', onOpen);
    Events.subscribe('sidebar:close', onClose);
    Events.subscribe('overlay:clicked', onClose);

    return () => {
      Events.unsubscribe('sidebar:open', onOpen);
      Events.unsubscribe('sidebar:close', onClose);
      Events.unsubscribe('overlay:clicked', onClose);
    }
  }, []);

  return (
    <div id='Sidebar' aria-hidden={isOpen ? 'false' : 'true'}>
      <div className='Sidebar__Header'>
        <div>
          Menü
        </div>
        <div>
          <button className='Sidebar__CloseButton' onClick={close}>
            X
          </button>
        </div>
      </div>
      <div className='Sidebar__Content'>
        <div className='Navigation'>
          <Link to={{ pathname: '/' }} className="Navigation__Item" onClick={close}>
            Übersicht
          </Link>
          <Link to={{ pathname: '/create' }} className="Navigation__Item" onClick={close}>
            + Neuer Fisch
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

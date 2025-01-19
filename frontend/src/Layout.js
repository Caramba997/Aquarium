import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import './Layout.css';
import { ReactComponent as BurgerIcon } from './icons/burger.svg';
import { ReactComponent as AccountIcon } from './icons/account.svg';
import { ReactComponent as CircleIcon } from './icons/circle.svg';
import Sidebar from "./components/Sidebar.js";
import Overlay from "./components/Overlay.js";
import Events from "./events.js";
import { useContext } from 'react';
import { UserContext } from './context.js';
import LoadingContainer from "./components/LoadingContainer.js";
import { VERSION } from "./version.js";

const Layout = () => {

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const processPageStateEvent = event => {
      if (event.name === 'page:loading') {
        setIsLoading(true);
      }
      else if (event.name === 'page:ready') {
        setIsLoading(false);
      }
    };
    const previousEvents = Events.listen('pageState', event => {
      processPageStateEvent(event);
    });
    for (const event of previousEvents) {
      processPageStateEvent(event);
    }
  }, []);

  const { username } = useContext(UserContext);

  const openSidebar = () => {
    Events.publish('sidebar:open')
  };

  return (
    <>
      <nav id="Header">
        <div className="Header__Burger">
          <button className="Header__BurgerButton" onClick={openSidebar}>
            <BurgerIcon className="Header__Icon" />
          </button>
        </div>
        <div className="Header__Logo">
          <Link to={{ pathname: "/" }} >
            Aquarium
          </Link>
        </div>
        <div className="Header__Account">
          { username ? (
            <Link className="Header__AccountButton" to={{ pathname: "/account" }} >
              <CircleIcon className="Header__Icon" />
              <div className="Header__AccountInitial">
                {username[0].toUpperCase()}
              </div>
            </Link>
          ) : (
            <Link className="Header__AccountButton" to={{ pathname: "/login" }} >
              <AccountIcon className="Header__Icon" />
            </Link>
          )}
        </div>
      </nav>

      <Sidebar />

      <Overlay />

      <LoadingContainer type="fish" isLoading={isLoading} fullHeight={true}>
        <div id="Page">
          <Outlet />
        </div>
      </LoadingContainer>

      <footer id="Footer">
        <div>© Finn Carstensen {new Date(VERSION.date).getFullYear()}</div>
      </footer>
    </>
  )
};

export default Layout;
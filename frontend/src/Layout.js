import { Outlet, Link } from "react-router-dom";
import './Layout.css';
import { ReactComponent as BurgerIcon } from './icons/burger.svg';
import Sidebar from "./components/Sidebar.js";
import Overlay from "./components/Overlay.js";
import Events from "./events.js";

const Layout = () => {

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
        <div></div>
      </nav>

      <Sidebar />

      <Overlay />

      <div id="Page">
        <Outlet />
      </div>

      <footer id="Footer">
        <div>© Finn Carstensen 2024</div>
      </footer>
    </>
  )
};

export default Layout;
import './Account.css';
import { useNavigate } from 'react-router-dom';
import useApi from '../api.js';

function Account() {
  const username = localStorage.getItem('username') || '';

  const navigate = useNavigate();
  const api = useApi();

  const handleLogout = () => {
    api.logout();
    navigate('/');
  }

  return (
    <div className="Account">
      <div className="PageTitle">Account</div>
      <div className="Account__Row">
        <div className="Account__Label">Benutzername:</div>
        <div className="Account__Username">{username}</div>
      </div>
      <div className="Account__Row">
        <button className="Account__Logout" onClick={handleLogout}>Abmelden</button>
      </div>
    </div>
  );
}

export default Account;

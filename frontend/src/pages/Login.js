import { useState, useEffect } from 'react';
import useApi from '../api.js';
import { useNavigate  } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const api = useApi();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (!formData.get('username')) {
      setError('Bitte Benutzername eingeben');
      return;
    }
    if (!formData.get('password')) {
      setError('Bitte Passwort eingeben');
      return;
    }
    try {
      const response = await api.login(formData.get('username'), formData.get('password'));
      setError('');
      navigate('/');
    }
    catch(e) {
      console.error(e);
      setError('Benutzername oder Passwort ungültig');
      return;
    }
  };

  return (
    <div className="Login">
      <form className="Login__Form" onSubmit={handleSubmit}>
        <label className="Login__Label" htmlFor="username">Benutzername</label>
        <input className="Login__Input" type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label className="Login__Label" htmlFor="password">Passwort</label>
        <input className="Login__Input" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="Login__ButtonRow">
          <button type="submit" className="Login__Submit">Anmelden</button>
        </div>
        {error && <div className="Login__Error">{error}</div>}
      </form>
    </div>
  );
}

export default Login;

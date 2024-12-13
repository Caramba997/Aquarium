import React from 'react';
import './index.css';
import './normalize.css';
import { UserContext } from './context.js';
import AquariumRouter from './router.js';


const App = () => {

  const [username, setUsername] = React.useState(localStorage.getItem('username') || '');

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <AquariumRouter />
    </UserContext.Provider>
  );
}

export default App;
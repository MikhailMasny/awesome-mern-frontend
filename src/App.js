import React from 'react';
import 'uikit'
import { useRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import { Loader } from './components/Loader';

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token,
      login,
      logout,
      userId,
      isAuthenticated
    }}>
      <Router>
        { isAuthenticated && <Navbar/> }
        {routes}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

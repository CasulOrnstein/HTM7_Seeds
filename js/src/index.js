import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css';
import { Login } from './pages/Login/Login';
import Home from './pages/Home/Home';
import { FirebaseAppContext, initializeFirebaseApp } from './contexts/FirebaseContext';
import { UserContext } from './contexts/UserContext';
import { LoggedInGuard } from './components/LoggedInGuard';

const root = ReactDOM.createRoot(document.getElementById('root'));

const WrappedApp = () => {
  const userLocal = localStorage.getItem('user-info');
  const [user, setUser] = useState(userLocal ? JSON.parse(userLocal) : null);

  const setUserInLocal = (user) => {
    setUser(user);
    localStorage.setItem('user-info', JSON.stringify(user));
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LoggedInGuard><Home/></LoggedInGuard>
      ),
    },
    {
      path: "/login",
      element: <Login setUser={setUserInLocal} user={user} />,
    },
  ]);

  return (
    <UserContext.Provider value={user}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  )
}

root.render(
  <React.StrictMode>
    <FirebaseAppContext.Provider value={initializeFirebaseApp()}>
      <WrappedApp/>
    </FirebaseAppContext.Provider>
  </React.StrictMode>
);

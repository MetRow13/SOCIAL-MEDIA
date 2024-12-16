/*
import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './assets/StyleSheet/index.css';
import Header from './Components/Header.jsx';
import Home from './Components/Home.jsx';
import Registration from './Components/Registration.jsx';
import Login from './Components/Login.jsx';
import EditProfile from './Components/EditProfile.jsx';
import Search from './Components/Search.jsx';
import { AuthContext } from './helper/apiHelper'; // Import AuthContext
import PropTypes from 'prop-types'; // Import PropTypes
import NewPost from './Components/NewPost.jsx';
import Settings from './Components/Settings.jsx';

// ProtectedRoute component with prop validation
// eslint-disable-next-line react-refresh/only-export-components
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    console.log("No token found, redirecting to login.");
    return <Navigate to="/" />;
  }
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is passed
};

// eslint-disable-next-line react-refresh/only-export-components
function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: null,
    status: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setAuthState({
        username: localStorage.getItem("username"),
        id: localStorage.getItem("userId"),
        status: true,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <StrictMode>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
            <Route path="/newPost" element={<ProtectedRoute><NewPost /></ProtectedRoute>} />
            <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </StrictMode>
    </AuthContext.Provider>
  );
}

createRoot(document.getElementById('root')).render(<App />);
*/
import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './assets/StyleSheet/index.css';
import Header from './Components/Header.jsx';
import Home from './Components/Home.jsx';
import Registration from './Components/Registration.jsx';
import Login from './Components/Login.jsx';
import EditProfile from './Components/EditProfile.jsx';
import Search from './Components/Search.jsx';
import NewPost from './Components/NewPost.jsx';
import Settings from './Components/Settings.jsx';
import { AuthContext } from './helper/apiHelper';
import PropTypes from 'prop-types';
import SearchPage from './Components/SearchPage.jsx';
import ProfilePage from './Components/ProfilePage.jsx';
// eslint-disable-next-line react-refresh/only-export-components
function ProtectedRoute({ children }) {
  return localStorage.getItem('jwtToken') ? children : <Navigate to="/" />;
}

ProtectedRoute.propTypes = { children: PropTypes.node.isRequired };

// eslint-disable-next-line react-refresh/only-export-components
function App() {
  const [authState, setAuthState] = useState({ username: "", id: null, status: false });

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setAuthState({ username: localStorage.getItem('username'), id: localStorage.getItem('userId'), status: true });
    }
  }, []);

  const protectedRoute = (Component) => (
    <ProtectedRoute>
      <Header />
      {Component}
    </ProtectedRoute>
  );

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/home" element={protectedRoute(<Home />)} />
            <Route path="/search" element={protectedRoute(<Search />)} />
            <Route path="/newPost" element={protectedRoute(<NewPost />)} />
            <Route path="/edit-profile" element={protectedRoute(<EditProfile />)} />
            <Route path="/settings" element={protectedRoute(<Settings />)} />
            <Route path="/search-page" element={protectedRoute(<SearchPage />)} />
            <Route path="/users/posts/:user_id" element={protectedRoute(<ProfilePage/>)} />
          </Routes>
        </BrowserRouter>
      </StrictMode>
    </AuthContext.Provider>
  );
}

createRoot(document.getElementById('root')).render(<App />);

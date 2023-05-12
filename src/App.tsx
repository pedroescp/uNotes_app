import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './index.css';
import Archive from './pages/archive';
import Home from './pages/home';
import Login from './pages/login';
import Note from './pages/note';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/profile';
import Trash from './pages/trash';
import { AuthProvider, AuthContext } from './contents/auth';
import { useContext } from 'react';
import Document from './pages/document';
import EditDocumento from './pages/editDocument';

function App() {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div className='loading'>Carregando...</div>;
    }

    if (!authenticated) {
      return <Navigate to={'/'} />;
    }
    return children;
  };
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/home'
          element={
            <Private>
              <Home />
            </Private>
          }
        />
        <Route
          path='/note'
          element={
            <Private>
              <Note />
            </Private>
          }
        />
        <Route
          path='/document'
          element={
            <Private>
              <Document />
            </Private>
          }
        />
        <Route
          path='/document/:id'
          element={
            <Private>
              <EditDocumento />
            </Private>
          }
        />
        <Route
          path='/profile'
          element={
            <Private>
              <Profile />
            </Private>
          }
        />
        <Route
          path='/trash'
          element={
            <Private>
              <Trash />
            </Private>
          }
        />
        <Route
          path='/archive'
          element={
            <Private>
              <Archive />
            </Private>
          }
        />
        <Route
          path='/group'
          element={
            <Private>
              <Archive />
            </Private>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { authUtils } from '../utils/auth';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = authUtils.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          // Opcional: Verificar token con el backend
          await authAPI.verifyToken();
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error cargando usuario:', error);
        authUtils.logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [navigate]);

  const handleLogout = () => {
    authUtils.logout();
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="main-title">ASTROCOIN</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      {user && (
        <div className="user-info">
          <h2>Your Profile</h2>
          <div className="info-card">
            <p><strong>Name:</strong> {user.nombre}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {user.telefono && (
              <p><strong>Phone:</strong> {user.telefono}</p>
            )}
            <p><strong>Registration Date:</strong> {
              new Date(user.fechaRegistro).toLocaleDateString('en-US')
            }</p>
          </div>
        </div>
      )}

      <div className="crypto-info">
        <h2>🚀 The Cryptocurrency of the Future</h2>
        <p>Welcome to ASTROCOIN - Coming soon: Trading features, wallet, and more...</p>
      </div>
    </div>
  );
}

export default Dashboard;


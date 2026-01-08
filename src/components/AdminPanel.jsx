import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authUtils } from '../utils/auth';
import { authAPI } from '../services/api';
import './AdminPanel.css';

function AdminPanel() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = authUtils.getCurrentUser();
        if (!currentUser) {
          navigate('/login');
          return;
        }
        
        // Verificar si es admin
        if (!authUtils.isAdmin()) {
          navigate('/dashboard');
          return;
        }
        
        setUser(currentUser);
        await authAPI.verifyToken();
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

  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      // Nota: Necesitarías crear un endpoint en el backend para obtener todos los usuarios
      // Por ahora, esto es solo un ejemplo
      const response = await authAPI.getProfile();
      // Aquí deberías llamar a un endpoint como: await api.get('/admin/users');
      console.log('Cargar usuarios - endpoint pendiente de implementar en backend');
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1 className="main-title">ASTROCOIN</h1>
          <p className="admin-badge">🔐 Admin Panel</p>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      {user && (
        <div className="admin-info">
          <h2>Welcome, {user.nombre}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> Administrator</p>
        </div>
      )}

      <div className="admin-sections">
        <div className="admin-card">
          <h3>👥 User Management</h3>
          <p>Manage system users</p>
          <button onClick={loadUsers} className="admin-button" disabled={loadingUsers}>
            {loadingUsers ? 'Loading...' : 'View Users'}
          </button>
        </div>

        <div className="admin-card">
          <h3>📊 Statistics</h3>
          <p>View system statistics</p>
          <button className="admin-button" disabled>
            Coming Soon
          </button>
        </div>

        <div className="admin-card">
          <h3>⚙️ Settings</h3>
          <p>System configuration</p>
          <button className="admin-button" disabled>
            Coming Soon
          </button>
        </div>
      </div>

      {users.length > 0 && (
        <div className="users-list">
          <h3>User List</h3>
          <div className="users-table">
            {users.map((u) => (
              <div key={u.id} className="user-item">
                <p><strong>{u.nombre}</strong> - {u.email}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;


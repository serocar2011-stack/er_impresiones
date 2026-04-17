import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard-layout">
      <nav className="admin-sidebar">
        <h3>Admin Panel</h3>
        <ul>
          <li><Link to="/admin/dashboard/impresiones">Pedidos de Impresión</Link></li>
          <li><Link to="/admin/dashboard/libreria">Artículos de Librería</Link></li>
        </ul>
        <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
      </nav>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;

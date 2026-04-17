import React, { useEffect, useState } from 'react';
import { API_URL } from '../../config';

const AdminImpresiones = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${API_URL}/fullprintjobs`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <div>Cargando pedidos...</div>;

  return (
    <div className="admin-jobs-container">
      <h2>Pedidos de Impresión</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Email</th>
            <th>Archivos</th>
            <th>Total Páginas</th>
            <th>Precio Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job._id}>
              <td>{job.cliente?.nombre} {job.cliente?.apellido}</td>
              <td>{job.cliente?.email}</td>
              <td>{job.files?.length} archivos</td>
              <td>{job.totalPages}</td>
              <td>${job.totalPrice}</td>
              <td>{job.status}</td>
              <td>
                <button className="view-button">Ver Detalle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminImpresiones;

import React, { useState, useEffect } from 'react';
import { getExperts, createExpert, updateExpert, deleteExpert } from '../../services/experts';
import ExpertForm from './ExpertForm';
import ExpertList from './ExpertList';

const ExpertsManager = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExpert, setEditingExpert] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      setLoading(true);
      const response = await getExperts();
      setExperts(response.data);
    } catch (error) {
      setError('Failed to fetch experts');
      console.error('Error fetching experts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateExpert = async (expertData) => {
    try {
      const response = await createExpert(expertData);
      setExperts([...experts, response.data]);
      setShowForm(false);
      setError('');
    } catch (error) {
      setError('Failed to create expert');
      console.error('Error creating expert:', error);
    }
  };

  const handleUpdateExpert = async (id, expertData) => {
    try {
      const response = await updateExpert(id, expertData);
      setExperts(experts.map(expert => expert.id === id ? response.data : expert));
      setEditingExpert(null);
      setError('');
    } catch (error) {
      setError('Failed to update expert');
      console.error('Error updating expert:', error);
    }
  };

  const handleDeleteExpert = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expert?')) {
      return;
    }

    try {
      await deleteExpert(id);
      setExperts(experts.filter(expert => expert.id !== id));
      setError('');
    } catch (error) {
      setError('Failed to delete expert');
      console.error('Error deleting expert:', error);
    }
  };

  const handleEditExpert = (expert) => {
    setEditingExpert(expert);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingExpert(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="modern-card">
        <div className="loading-spinner"></div>
        <p>Loading experts...</p>
      </div>
    );
  }

  return (
    <div className="experts-manager">
      <div className="modern-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3>🎓 Experts Management</h3>
          <button
            onClick={() => setShowForm(true)}
            style={{
              background: 'linear-gradient(135deg, #27ae60, #219a52)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            + Add New Expert
          </button>
        </div>

        {error && (
          <div className="error-message" style={{ marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        {showForm ? (
          <ExpertForm
            expert={editingExpert}
            onSubmit={editingExpert ? handleUpdateExpert : handleCreateExpert}
            onCancel={handleCancelEdit}
          />
        ) : (
          <ExpertList
            experts={experts}
            onEdit={handleEditExpert}
            onDelete={handleDeleteExpert}
          />
        )}
      </div>
    </div>
  );
};

export default ExpertsManager;
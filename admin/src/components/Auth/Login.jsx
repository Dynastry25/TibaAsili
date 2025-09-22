import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import '../../styles/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    
    try {
      await login(formData);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Karibu Tiba Asili</h2>
          <p>Ingia kwenye akaunti yako ya usimamizi</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="login-email">Barua Pepe</label>
            <input
              type="email"
              id="login-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="weka barua pepe yako"
              disabled={loading}
              autoComplete="email"
              aria-describedby="email-help"
            />
            <small id="email-help" className="form-help">Weka barua pepe uliyojiandikisha nayo</small>
          </div>
          
          <div className="form-group">
            <label htmlFor="login-password">Nenosiri</label>
            <input
              type="password"
              id="login-password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="weka nenosiri lako"
              disabled={loading}
              autoComplete="current-password"
              aria-describedby="password-help"
            />
            <small id="password-help" className="form-help">Nenosiri lako la siri</small>
          </div>
          
          <div className="form-options">
            <label className="checkbox-container">
              <input 
                type="checkbox" 
                id="remember-me"
                autoComplete="off"
              />
              <span className="checkmark"></span>
              Nikumbuke
            </label>
            
            <Link to="/forgot-password" className="forgot-link">
              Umesahau nenosiri?
            </Link>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`btn-primary auth-btn ${loading ? 'loading' : ''}`}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Inaingiza...
              </>
            ) : (
              'Ingia'
            )}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            Huna akaunti? {' '}
            <Link to="/register" className="auth-link">
              Fungua akaunti mpya
            </Link>
          </p>
        </div>
      </div>
      
      <div className="auth-background">
        <div className="background-overlay"></div>
        <div className="welcome-message">
          <h1>Tiba Asili Admin</h1>
          <p>Jukwaa la kisasa la usimamizi wa tiba za asili</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
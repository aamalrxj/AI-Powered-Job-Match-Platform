import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Client-side validation
    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email format');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/register', formData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      navigate('/main_homepage');
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message === 'Network Error') {
        setError('Cannot connect to server');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Register</h2>
        
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={e => setFormData({ ...formData, username: e.target.value })}
          required
          style={styles.input}
        />
        
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          required
          style={styles.input}
        />
        
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={formData.password}
          onChange={e => setFormData({ ...formData, password: e.target.value })}
          required
          minLength={6}
          style={styles.input}
        />
        
        <button 
          type="submit" 
          style={styles.button}
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <div style={{ marginTop: '1rem', width: '100%' }}>
          <button
            type="button"
            style={styles.secondaryButton}
            onClick={() => navigate('/login')}
          >
            Already have an account? Login
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f6f8fa',
  },
  form: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '320px',
  },
  input: {
    margin: '0.5rem 0',
    padding: '0.75rem',
    width: '100%',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    marginTop: '1rem',
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: 'none',
    background: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    width: '100%',
  },
  secondaryButton: {
    padding: '0.5rem 1.5rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #007bff',
    background: '#fff',
    color: '#007bff',
    cursor: 'pointer',
    width: '100%',
  },
  error: {
    color: 'red',
    marginTop: '0.5rem',
  },
};

export default Register;

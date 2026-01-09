import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Add focus animation
  const [focused, setFocused] = useState({
    email: false,
    password: false
  });

  const handleFocus = (field) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field) => {
    if (!formData[field]) {
      setFocused({ ...focused, [field]: false });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await login(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.result));
      
      // Add animation before redirect
      document.querySelector('.auth-card').classList.add('success-animation');
      
      // Delay navigation for animation
      setTimeout(() => {
        navigate('/dashboard');
      }, 400);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || 'Failed to login. Please try again.');
      
      // Add shake animation on error
      const card = document.querySelector('.auth-card');
      card.classList.add('error-shake');
      setTimeout(() => {
        card.classList.remove('error-shake');
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className={`form-group ${focused.email ? 'focused' : ''}`}>
            <label htmlFor="email" className={focused.email ? 'floating' : ''}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
              required
              placeholder="Your Email"
              className={focused.email ? 'has-content' : ''}
            />
          </div>
          
          <div className={`form-group ${focused.password ? 'focused' : ''}`}>
            <label htmlFor="password" className={focused.password ? 'floating' : ''}>Password</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => handleFocus('password')}
                onBlur={() => handleBlur('password')}
                required
                placeholder="Your Password"
                className={focused.password ? 'has-content' : ''}
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
          
          <div className="form-extra">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>
          
          <button 
            type="submit" 
            className="auth-submit-btn" 
            disabled={loading}
          >
            {loading ? (
              <span className="loading-spinner">
                <span className="spinner-circle"></span>
                <span className="spinner-text">Logging in...</span>
              </span>
            ) : 'Login'}
          </button>
        </form>
        
        <div className="auth-redirect">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

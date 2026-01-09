import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../api';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  // Add focus animation
  const [focused, setFocused] = useState({
    name: false,
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Check password strength
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  };

  const getStrengthLabel = () => {
    switch (passwordStrength) {
      case 0: return "Very Weak";
      case 1: return "Weak";
      case 2: return "Medium";
      case 3: return "Strong";
      case 4: return "Very Strong";
      default: return "";
    }
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0: return "#e74c3c";
      case 1: return "#e67e22";
      case 2: return "#f1c40f";
      case 3: return "#2ecc71";
      case 4: return "#27ae60";
      default: return "#e0e0e0";
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await signup(formData);
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
      setError(error.response?.data?.message || 'Failed to sign up. Please try again.');
      
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
        <h2 className="auth-title">Create Account</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className={`form-group ${focused.name ? 'focused' : ''}`}>
            <label htmlFor="name" className={focused.name ? 'floating' : ''}>Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => handleFocus('name')}
              onBlur={() => handleBlur('name')}
              required
              placeholder="Your Name"
              className={focused.name ? 'has-content' : ''}
            />
          </div>
          
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
                minLength="6"
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
            
            {formData.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div 
                    className="strength-indicator" 
                    style={{ 
                      width: `${(passwordStrength / 4) * 100}%`,
                      backgroundColor: getStrengthColor()
                    }}
                  ></div>
                </div>
                <span className="strength-label" style={{ color: getStrengthColor() }}>
                  {getStrengthLabel()}
                </span>
              </div>
            )}
          </div>
          
          <div className="terms-checkbox">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </label>
          </div>
          
          <button 
            type="submit" 
            className="auth-submit-btn" 
            disabled={loading}
          >
            {loading ? (
              <span className="loading-spinner">
                <span className="spinner-circle"></span>
                <span className="spinner-text">Creating Account...</span>
              </span>
            ) : 'Create Account'}
          </button>
        </form>
        
        <div className="auth-redirect">
          Already have an account? <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

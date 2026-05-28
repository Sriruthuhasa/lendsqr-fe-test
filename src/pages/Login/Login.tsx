import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError('Email address is required'); return; }
    if (!password) { setError('Password is required'); return; }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="login">
      <div className="login__left">
        <div className="login__logo"><h2>lendsqr</h2></div>
        <div className="login__hero">
          <div className="hero-badge">TRUSTED LENDING PLATFORM</div>
          <h1>Modern lending<br/>for <span>everyone</span></h1>
          <p>Empowering lenders to manage over 500,000 customers with precision, speed, and confidence.</p>
          <div className="login__stats">
            <div className="stat">
              <strong>500K+</strong>
              <span>Customers</span>
            </div>
            <div className="stat">
              <strong>₦2.4B</strong>
              <span>Disbursed</span>
            </div>
            <div className="stat">
              <strong>99.9%</strong>
              <span>Uptime</span>
            </div>
          </div>
        </div>
      </div>

      <div className="login__right">
        <div className="login__form-container">
          <div className="login__form-header">
            <h1>Welcome back</h1>
            <p>Sign in to your admin dashboard</p>
          </div>

          {error && <div className="login__error">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="login__field">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@lendsqr.com"
              />
            </div>

            <div className="login__field">
              <label>Password</label>
              <div className="login__password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? 'HIDE' : 'SHOW'}
                </span>
              </div>
            </div>

            <button type="button" className="login__forgot">
              Forgot password?
            </button>

            <button type="submit" className="login__button" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
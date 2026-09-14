import { Link, useLocation } from 'react-router-dom';
import './nav.css';
import paceIcon from '../../assets/pace-icon.png';

export default function Navigation() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="nav-bar">
      <div className="nav-container">
        <Link to="/userdata" className="nav-logo">
          <img src={paceIcon} alt="Pace" className="logo-icon" />
          <span className="logo-text">PACE</span>
        </Link>

        <div className="nav-links">
          <Link
            to="/userdata"
            className={`nav-link ${isActive('/userdata') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link
            to="/chat"
            className={`nav-link ${isActive('/chat') ? 'active' : ''}`}
          >
            Coach
          </Link>
          <button
            className="nav-logout"
            onClick={() => {
              localStorage.removeItem('username');
              localStorage.removeItem('id');
              window.location.href = '/login';
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

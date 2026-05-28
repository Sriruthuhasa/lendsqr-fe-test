import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.scss';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { title: 'USERS', value: '2,453', icon: '👥' },
    { title: 'ACTIVE USERS', value: '2,453', icon: '👤' },
    { title: 'USERS WITH LOANS', value: '12,453', icon: '💰' },
    { title: 'USERS WITH SAVINGS', value: '102,453', icon: '🏦' },
  ];

  const navItems = [
    'Dashboard', 'Users', 'Guarantors', 'Loans',
    'Decision Models', 'Savings', 'Loan Requests',
    'Whitelist', 'Karma'
  ];

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar__logo">lendsqr</div>
        <nav className="sidebar__nav">
          {navItems.map((item) => (
            <div
              key={item}
              className={`sidebar__item ${item === 'Users' ? 'active' : ''}`}
              onClick={() => item === 'Users' && navigate('/users')}
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="dashboard__main">
        {/* Top Nav */}
        <header className="topnav">
          <div className="topnav__search">
            <input type="text" placeholder="Search for anything" />
          </div>
          <div className="topnav__right">
            <span>Docs</span>
            <span>🔔</span>
            <span>Adedeji ▼</span>
          </div>
        </header>

        {/* Content */}
        <main className="dashboard__content">
          <h1>Users</h1>

          {/* Stat Cards */}
          <div className="stats">
            {stats.map((stat) => (
              <div key={stat.title} className="stats__card">
                <span className="stats__icon">{stat.icon}</span>
                <p className="stats__title">{stat.title}</p>
                <h2 className="stats__value">{stat.value}</h2>
              </div>
            ))}
          </div>

          {/* Users Table */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ORGANIZATION</th>
                  <th>USERNAME</th>
                  <th>EMAIL</th>
                  <th>PHONE NUMBER</th>
                  <th>DATE JOINED</th>
                  <th>STATUS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr onClick={() => navigate('/users/1')}>
                  <td>Irorun</td>
                  <td>Grace Effiom</td>
                  <td>grace@gmail.com</td>
                  <td>07060780922</td>
                  <td>May 15, 2020 10:00 AM</td>
                  <td><span className="status active">Active</span></td>
                  <td>⋮</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
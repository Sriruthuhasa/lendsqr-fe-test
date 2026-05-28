import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USERS, User } from '../../services/mockData';
import './Users.scss';

const ITEMS_PER_PAGE = 10;

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const filtered = USERS.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.organization.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = filtered.slice(start, start + ITEMS_PER_PAGE);

  const handleViewUser = (user: User) => {
    localStorage.setItem('selectedUser', JSON.stringify(user));
    navigate(`/users/${user.id}`);
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'active': return 'status--active';
      case 'inactive': return 'status--inactive';
      case 'pending': return 'status--pending';
      case 'blacklisted': return 'status--blacklisted';
      default: return '';
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar__logo">lendsqr</div>
        <nav className="sidebar__nav">
          {['Dashboard','Users','Guarantors','Loans',
            'Decision Models','Savings','Loan Requests',
            'Whitelist','Karma'].map(item => (
            <div
              key={item}
              className={`sidebar__item ${item === 'Users' ? 'active' : ''}`}
              onClick={() => {
                if (item === 'Dashboard') navigate('/dashboard');
              }}
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="dashboard__main">
        <header className="topnav">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            className="topnav__search-input"
          />
          <div className="topnav__right">
            <span>Docs</span>
            <span>🔔</span>
            <span>Adedeji ▼</span>
          </div>
        </header>

        <main className="dashboard__content">
          <h1>Users</h1>

          {/* Stat Cards */}
          <div className="stats">
            {[
              { title: 'USERS', value: '2,453', icon: '👥' },
              { title: 'ACTIVE USERS', value: '2,453', icon: '👤' },
              { title: 'USERS WITH LOANS', value: '12,453', icon: '💰' },
              { title: 'USERS WITH SAVINGS', value: '102,453', icon: '🏦' },
            ].map(stat => (
              <div key={stat.title} className="stats__card">
                <span className="stats__icon">{stat.icon}</span>
                <p className="stats__title">{stat.title}</p>
                <h2 className="stats__value">{stat.value}</h2>
              </div>
            ))}
          </div>

          {/* Table */}
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
                {currentUsers.map(user => (
                  <tr key={user.id} onClick={() => handleViewUser(user)}>
                    <td>{user.organization}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.dateJoined}</td>
                    <td>
                      <span className={`status ${getStatusClass(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>⋮</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <span>Showing {start + 1}–{Math.min(start + ITEMS_PER_PAGE, filtered.length)} of {filtered.length}</span>
            <div className="pagination__buttons">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>←</button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={currentPage === page ? 'active' : ''}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>→</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Users;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../services/mockData';
import './UserDetails.scss';

const UserDetails: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('General Details');

  useEffect(() => {
    const stored = localStorage.getItem('selectedUser');
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      navigate('/users');
    }
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  const tabs = ['General Details', 'Documents', 'Bank Details', 'Loans', 'Savings', 'App and System'];

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
                if (item === 'Users') navigate('/users');
              }}
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>

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

        <main className="dashboard__content">
          {/* Back Button */}
          <button className="back-btn" onClick={() => navigate('/users')}>
            ← Back to Users
          </button>

          <div className="user-details__header">
            <h1>User Details</h1>
            <div className="user-details__actions">
              <button className="btn btn--blacklist">BLACKLIST USER</button>
              <button className="btn btn--activate">ACTIVATE USER</button>
            </div>
          </div>

          {/* Profile Card */}
          <div className="profile-card">
            <div className="profile-card__top">
              <div className="profile-card__avatar">
                {user.username.charAt(0)}
              </div>
              <div className="profile-card__info">
                <h2>{user.username}</h2>
                <p>{user.id}</p>
              </div>
              <div className="profile-card__tier">
                <p>User's Tier</p>
                <div className="stars">
                  {[1,2,3].map(s => (
                    <span key={s} className={s <= user.tier ? 'star filled' : 'star'}>★</span>
                  ))}
                </div>
              </div>
              <div className="profile-card__balance">
                <h2>{user.accountBalance}</h2>
                <p>{user.bankAccount}/{user.bankName}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="profile-card__tabs">
              {tabs.map(tab => (
                <button
                  key={tab}
                  className={`tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Details Content */}
          {activeTab === 'General Details' && (
            <div className="details-card">

              <section className="details-section">
                <h3>Personal Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <p className="detail-label">FULL NAME</p>
                    <p className="detail-value">{user.username}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label">PHONE NUMBER</p>
                    <p className="detail-value">{user.phone}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label">EMAIL ADDRESS</p>
                    <p className="detail-value">{user.email}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label">BVN</p>
                    <p className="detail-value">{user.bvn}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label">GENDER</p>
                    <p className="detail-value">{user.gender}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label">MARITAL STATUS</p>
                    <p className="detail-value">{user.maritalStatus}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label">CHILDREN</p>
                    <p className="detail-value">{user.children}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label">TYPE OF RESIDENCE</p>
                    <p className="detail-value">{user.typeOfResidence}</p>
                  </div>
                </div>
              </section>

              <section className="details-section">
                <h3>Education and Employment</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <p className="detail-label">LEVEL OF EDUCATION</p>
                    <p className="detail-value">{user.educationLevel}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label">EMPLOYMENT STATUS</p>
                    <p className="detail-value">{user.employmentStatus}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label">MONTHLY INCOME</p>
                    <p className="detail-value">{user.monthlyIncome}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label">LOAN REPAYMENT</p>
                    <p className="detail-value">{user.loanRepayment}</p>
                  </div>
                </div>
              </section>

              <section className="details-section">
                <h3>Socials</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <p className="detail-label">TWITTER</p>
                    <p className="detail-value">{user.twitter}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label">FACEBOOK</p>
                    <p className="detail-value">{user.facebook}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label">INSTAGRAM</p>
                    <p className="detail-value">{user.instagram}</p>
                  </div>
                </div>
              </section>

              <section className="details-section">
                <h3>Guarantor</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <p className="detail-label">FULL NAME</p>
                    <p className="detail-value">{user.guarantorName}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label">PHONE NUMBER</p>
                    <p className="detail-value">{user.guarantorPhone}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label">EMAIL ADDRESS</p>
                    <p className="detail-value">{user.guarantorEmail}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label">RELATIONSHIP</p>
                    <p className="detail-value">{user.guarantorRelationship}</p>
                  </div>
                </div>
              </section>

            </div>
          )}

          {activeTab !== 'General Details' && (
            <div className="details-card">
              <p style={{padding: '2rem', color: '#545F7D'}}>
                {activeTab} content coming soon.
              </p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default UserDetails;
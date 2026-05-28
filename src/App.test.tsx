import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './pages/Login/Login';
import { generateUsers, USERS } from './services/mockData';

// ================================
// LOGIN PAGE TESTS
// ================================

describe('Login Page', () => {

  // POSITIVE TEST 1
  test('renders login form with email and password fields', () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    expect(screen.getByPlaceholderText('admin@lendsqr.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
  });

  // POSITIVE TEST 2
  test('renders Sign In button', () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    expect(screen.getByText('Sign In →')).toBeInTheDocument();
  });

  // POSITIVE TEST 3
  test('shows and hides password when SHOW is clicked', () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const showBtn = screen.getByText('SHOW');
    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(showBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');
    expect(screen.getByText('HIDE')).toBeInTheDocument();
  });

  // NEGATIVE TEST 1
  test('shows error when email is empty', () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    fireEvent.click(screen.getByText('Sign In →'));
    expect(screen.getByText('Email address is required')).toBeInTheDocument();
  });

  // NEGATIVE TEST 2
  test('shows error when password is empty', () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    fireEvent.change(
      screen.getByPlaceholderText('admin@lendsqr.com'),
      { target: { value: 'test@gmail.com' } }
    );
    fireEvent.click(screen.getByText('Sign In →'));
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  // NEGATIVE TEST 3
  test('does not show error when both fields are filled', () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    fireEvent.change(
      screen.getByPlaceholderText('admin@lendsqr.com'),
      { target: { value: 'test@gmail.com' } }
    );
    fireEvent.change(
      screen.getByPlaceholderText('Enter your password'),
      { target: { value: 'password123' } }
    );
    fireEvent.click(screen.getByText('Sign In →'));
    expect(screen.queryByText('Email address is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
  });
});

// ================================
// MOCK DATA TESTS
// ================================

describe('Mock Data Service', () => {

  // POSITIVE TEST 1
  test('generates correct number of users', () => {
    const users = generateUsers(500);
    expect(users).toHaveLength(500);
  });

  // POSITIVE TEST 2
  test('each user has required fields', () => {
    const user = USERS[0];
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('status');
    expect(user).toHaveProperty('accountBalance');
  });

  // POSITIVE TEST 3
  test('user status is one of the valid values', () => {
    const validStatuses = ['active', 'inactive', 'pending', 'blacklisted'];
    USERS.forEach(user => {
      expect(validStatuses).toContain(user.status);
    });
  });

  // POSITIVE TEST 4
  test('account balance starts with dollar sign', () => {
    USERS.forEach(user => {
      expect(user.accountBalance).toMatch(/^\$/);
    });
  });

  // NEGATIVE TEST 1
  test('generates zero users when count is 0', () => {
    const users = generateUsers(0);
    expect(users).toHaveLength(0);
  });

  // NEGATIVE TEST 2
  test('user ids are unique', () => {
    const ids = USERS.map(u => u.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(USERS.length);
  });
});
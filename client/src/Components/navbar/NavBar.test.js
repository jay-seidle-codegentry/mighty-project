import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";

import { useAuth0 } from '../../react-auth0-spa';
import NavBar from './NavBar';

// create a dummy Auth0 profile
const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746'
};

// intercept useAuth0 function and mock it
jest.mock('../../react-auth0-spa');

describe('As an authenticated user:', () => {
  beforeEach(() => {
    // mock Auth0 hook response to return logged in
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      loading: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });
  });

  it('NavBar Component is loading', () => {
    const { getByText, getByTestId, container } = render(<NavBar />);
    expect(container).toBeTruthy();
  });

  it('Confirm Login button does not exist', () => {
    const { getByText, getByTestId, container, queryByTestId } = render(<NavBar />);
    const login = queryByTestId('login');
    expect(login).toBeNull();
  });

  it('Confirm Logout button exists', () => {
    const { getByText, getByTestId, container, queryByTestId } = render(<NavBar />);
    const logout = getByTestId('logout');
    expect(logout.innerHTML).toBe('Log out');
  });
});

describe('As an un-authenticated user:', () => {
  beforeEach(() => {
    // mock Auth0 hook response to return logged in
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      loading: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });
  });

  it('NavBar Component is loading', () => {
    const { getByText, getByTestId, container } = render(<NavBar />);
    expect(container).toBeTruthy();
  });

  it('Confirm Logout button does not exist', () => {
    const { getByText, getByTestId, container, queryByTestId } = render(<NavBar />);
    const logout = queryByTestId('logout');
    expect(logout).toBeNull();
  });

  it('Confirm Login button exists', () => {
    const { getByText, getByTestId, container, queryByTestId } = render(<NavBar />);
    const login = getByTestId('login');
    expect(login.innerHTML).toBe('Log in');
  });
});

import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";

import App from './App';
import { useAuth0 } from './react-auth0-spa';

// create a dummy Auth0 profile
const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746'
};

// intercept useAuth0 function and mock it
jest.mock('./react-auth0-spa');

describe('With Application container:', () => {
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

  it('is App Container loading', () => {
    const { getByText, getByTestId, container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('does Learn React link exist', () => {
    const { getByText, getByTestId, container, queryByTestId } = render(<App />);
    const link = getByTestId('learn-link');
    expect(link.innerHTML).toBe('Learn React');
  });
});
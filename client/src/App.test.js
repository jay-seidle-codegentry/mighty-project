import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import "@testing-library/jest-dom";

import App from './App';
import { useAuth0 } from './react-auth0-spa';

// create a dummy Auth0 profile
const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746'
}

// intercept useAuth0 function and mock it
jest.mock('./react-auth0-spa');

test('logged in state', async () => {
  beforeEach(() => {
    // mock Auth0 hook response to return logged in
    useAuth0.mockReturnValue({
      isAuthenticate: true,
      loading: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });

    const wrapper = render(<App />);
    expect(true).toBeFalsy();

    // it('Renders App Component - learn react found', async () => {
    //   const wrapper = render(<App />);
    //   expect(wrapper).toBeFalsy();
    //   //expect(wrapper).toBeTruthy();
    //   //expect(wrapper.findAllByTestId('button')).toBeDefined();
    //   //expect(wrapper.findAllByText('Learn Reacts')).toBeTruthy();
    // });
  });
});


// jest.mock('./react-auth0-spa', () => {
//   console.log('loading - mock');
//   const mockReact = require('react');
//   const mockMyContext = mockReact.createContext({"isAuthenticated": false, "loading": true });
//   const useAuth0 = () => mockReact.useContext(mockMyContext);
//   const {isAuthenticated, loading} = useAuth0();
//   console.log(isAuthenticated);
//   console.log(loading);
//   return useAuth0;
// });

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
// test('authenticated render', () => {
//   //const isAuthenticated = true;
//   //const loading = false;
//   jest.mock('./react-auth0-spa', () => {
//     const mockReact = require('react');
//     const mockMyContext = mockReact.createContext({"isAuthenticated": true, "loading":false });
//     const useAuth0 = () => mockReact.useContext(mockMyContext);
//     return useAuth0;
//   });

//    // const useAuth0 = require('./react-auth0-spa');
//   // useAuth0.mockImplementation(() => {
//   //   return {
//   //     isAuthenticatedw: true,
//   //     loading: false  
//   //    };
//   // });

//   //const useAuth0 = jest.fn();
//   // jest.mock('./react-auth0-spa', () => {
//   //   return jest.fn().mockImplementation(() => {
//   //     return function()
//   //     {
//   //        return {
//   //         isAuthenticatedw: true,
//   //         loading: false  
//   //        };
//   //     };
//   //   });
//   // });
//   const renderer = ShallowRenderer.createRenderer();
//   renderer.render(<App />);
//   const results = renderer.getRenderOutput();
//   console.log(results.props.children[0].props.children); //.props.children);
//   //console.log(results);
//   //const { getByText } = render(results);
//   //const { getByText } = renderer.getMountedInstance();
//   //const xyz = renderer.getMountedInstance();
//   expect(results.props.children[0].props.children[4].props.children).toContain('Learn React');
//   //const linkElement = renderer.getMountedInstance().getByText(/learn react/i);
//   //expect(linkElement).toBeInTheDocument();
// });

// test('just loading', () => {

//   const renderer = ShallowRenderer.createRenderer();
//   renderer.render(<App />);
//   const results = renderer.getRenderOutput();
//   console.log(results.props.children[0].props.children); //.props.children);
//   expect(results.props.children[0].props.children[4].props.children).toContain('Learn React');
// });
import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "./App";
import { useAuth0 } from "./react-auth0-spa";

// create a dummy Auth0 profile
const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "fake-oauth2|2147627834623744883746",
};

// intercept useAuth0 function and mock it
jest.mock("./react-auth0-spa");

describe("With Application container as UN-AUTHENTICATED:", () => {
  beforeEach(() => {
    // mock Auth0 hook response to return logged in
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      loading: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
      getTokenSilently: jest.fn()
    });
  });

  it("Is LandingPage Component rendered", () => {
    const { getByText, getByTestId, container } = render(
      <App />
    );
    expect(container).toHaveTextContent("Are you ready");
  });
});

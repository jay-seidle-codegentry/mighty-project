import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useAuth0 } from "../../react-auth0-spa";
import { LanguageContext, LanguageProvider } from "../locale/LanguageProvider";
import { LandingPage } from "./LandingPage";

// create a dummy Auth0 profile
const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "fake-oauth2|2147627834623744883746",
};

jest.mock("../../react-auth0-spa");

describe("With LandingPage Container:", () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      loading: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
      getTokenSilently: jest.fn(),
    });
  });

  it("LandingPage Component is loading", () => {
    const { getByText, getByTestId, container } = render(
      <LanguageProvider>
        <LandingPage />
      </LanguageProvider>
    );

    expect(container).toBeTruthy();
    expect(container).toHaveTextContent("Josh Appel");
  });
});

import React from "react";
import { render, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useAuth0 } from "../../react-auth0-spa";
import { getProfile, setProfile } from "../../usecases/user-api.usecase";
import { successResponse, errorResponse } from "../../utils/json.utils";
import { ProfileProvider } from "./ProfileProvider";
import ProfileConsumerMock from "../../mocks/ProfileConsumer.mock";

// create a dummy Auth0 profile
const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "fake-oauth2|2147627834623744883746",
};

// intercept useAuth0 function and mock it
jest.mock("../../react-auth0-spa");
jest.mock("../../usecases/user-api.usecase");

describe("With Application Container", () => {
  beforeEach(() => {
    // mock Auth0 hook response to return logged in
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      loading: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
      getTokenSilently: jest.fn(),
    });
    setProfile.mockReturnValue(
      successResponse({
        exists: true,
        nickName: "Bubba",
        email: "",
        onBoarded: Date.now,
        errorState: {},
      })
    );
    getProfile.mockReturnValue(
      successResponse({
        exists: true,
        nickName: "Bubba",
        email: "",
        onBoarded: Date.now,
        errorState: {},
      })
    );
  });

  // it("ProfileProvider Component is loading", async () => {
  //   const { getByText, getByTestId, container } = render(<ProfileProvider />);
  //   const result = await waitForElement(
  //     () => {
  //       (container.innerHTML.length >= 5);
  //     },
  //     { container }
  //   );
  //   expect(container).toBeTruthy();
  // });

  it("ProfileProvider passes profile - get Profile Value", async () => {
        const { getByText, getByTestId, container } = render(
            <ProfileProvider>
              <ProfileConsumerMock />
            </ProfileProvider>
          );
          const result = await waitForElement(
            () => getByText("Bubba")
          );
          expect(result).toBeTruthy();
          expect(result).toHaveTextContent("Bubba");
  });
});

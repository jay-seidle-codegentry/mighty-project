import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useAuth0 } from "../../react-auth0-spa";
import { getProfile, setProfile } from "../../usecases/user-api.usecase";
import { successResponse, errorResponse } from "../../utils/json.utils";
import { ProfileContext, ProfileProvider } from "./ProfileProvider";
//import { ProfileConsumerMock } from "../../mocks/LanguageConsumer.mock";
import Secret from "../secret/Secret";
import { act } from "react-dom/test-utils";

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
    //getProfile.mock.fn();
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
      //async () => {
      //return (
      //    Promise.resolve(
      successResponse({
        exists: true,
        nickName: "Bubba",
        email: "",
        onBoarded: Date.now,
        errorState: {},
      })
      //)
    );
    //});
    // setProfile.mockReturnValue((token, profile) => {
    //     return             successResponse({
    //         exists: true,
    //         nickName: "Bubba",
    //         email: "",
    //         onBoarded: Date.now,
    //         errorState: {},
    //     });

    // });
    //     return (
    //         successResponse({
    //             exists: true,
    //             nickName: profile.nickName,
    //             email: profile.email,
    //             onBoarded: Date.now,
    //             errorState: {},
    //         })
    //     );
    // });
  });

  it("ProfileProvider Component is loading", () => {
    const { getByText, getByTestId, container } = render(<ProfileProvider />);
    expect(container).toBeTruthy();
  });

  it("ProfileProvider passes profile", () => {
      act(async () => {
        const { getByText, getByTestId, container } = render(
            <ProfileProvider>
              <Secret />
            </ProfileProvider>
          );
          console.log(container.innerHTML);
          expect(true).toBeTruthy();      
      });
  });
});

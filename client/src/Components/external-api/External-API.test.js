import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

import { successResponse, errorResponse } from "../../utils/json.utils";
import { ExternalApi } from "./External-API";
import { useAuth0 } from "../../react-auth0-spa";
import {
  getTimestamp,
  getExternalApi,
} from "../../usecases/external-api-usecases";

// create a dummy Auth0 profile
const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "fake-oauth2|2147627834623744883746",
};

jest.mock("../../react-auth0-spa");
jest.mock("../../usecases/external-api-usecases");

describe("With Extermal-API container:", () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      loading: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
      getTokenSilently: jest.fn(),
    });
    const epoch = new Date(2018, 11, 24, 10, 33, 30, 0).getTime() / 1000.0;
    getTimestamp.mockReturnValue(
      Promise.resolve(successResponse({ msg: epoch }))
    );
    getExternalApi.mockReturnValue(
        Promise.resolve(errorResponse({msg: "big error"}))
    );
  });

  it("ExternalApi Component is loading", () => {
    const { getByText, getByTestId, container } = render(<ExternalApi />);
    expect(container).toBeTruthy();
  });

  it("ExternalApi Click Button to Call Time Service", async () => {
    const { getByText, getByTestId, container } = render(<ExternalApi />);
    const epoch = new Date(2018, 11, 24, 10, 33, 30, 0).getTime() / 1000.0;
    await act(async () => {
      fireEvent.click(getByTestId("btn-time"));
    });
    expect(container).toHaveTextContent(epoch);
  });

  it("ExternalApi Click Button to Call Secured Service returning ERROR", async () => {
    const { getByText, getByTestId, container } = render(<ExternalApi />);
    await act(async () => {
      fireEvent.click(getByTestId("btn-secure-api"));
    });
    expect(container).toHaveTextContent(JSON.stringify(("big error"), null, 2));
  });
});

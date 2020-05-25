import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";

import FetchComponent from "../mocks/FetchComponent.mock";

it("test useFetch", async () => {
  let responseMessage = "omg does this work yet";

  jest.spyOn(global, "fetch").mockImplementation((endPoint, headers) => {
    const mockResponse = { message: responseMessage };
    const mockJsonResponse = new Promise((resolve) => {
      setTimeout(() => resolve(mockResponse), 1000);
    });
    const mockFetchResponse = Promise.resolve({ json: () => mockJsonResponse });
    return mockFetchResponse;
  });

  const { getByText, getByTestId, container } = render(<FetchComponent />);

  const result = getByTestId("loading");
  expect(result).toBeTruthy();
  expect(result).toHaveTextContent("Loading...");

  const result2 = await waitForElement(() =>
    getByText("omg does this work yet")
  );
  expect(result2).toBeTruthy();
  expect(result2).toHaveTextContent("omg does this work yet");

  responseMessage = "not this time";
  await act(async () => {
    fireEvent.click(getByTestId("updateButton"));
  });

  const result3 = await waitForElement(() => getByText("not this time"));
  expect(result3).toBeTruthy();
  expect(result3).toHaveTextContent("not this time");
});

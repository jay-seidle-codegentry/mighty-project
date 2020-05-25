import React, { useContext } from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Loading from "./Loading";
import { LanguageProvider } from "../../Components/locale/LanguageProvider";
import en from "../locale/en";

it("TLoading Component is loading", () => {
  const { getByText, getByTestId, container } = render(
    <LanguageProvider>
      <Loading />
    </LanguageProvider>
  );
  expect(container).toBeTruthy();
});

it("TLoading Component has message", () => {
  const { getByText, getByTestId, container } = render(
    <LanguageProvider>
      <Loading />
    </LanguageProvider>
  );
  expect(getByText(en.LoadingMessage)).toBeTruthy();
});

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { LanguageSelector } from "./LanguageSelector";
import { LanguageContext, LanguageProvider } from "../locale/LanguageProvider";

it("LanguageSelector Component is loading", () => {
  const { getByText, getByTestId, container } = render(<LanguageSelector />);
  expect(container).toBeTruthy();
});

it("LanguageSelector has menu item", () => {
  const { getByText, getByTestId, container } = render(
    <LanguageProvider>
      <LanguageSelector />
    </LanguageProvider>
  );
  expect(getByText("English")).toBeTruthy();
});

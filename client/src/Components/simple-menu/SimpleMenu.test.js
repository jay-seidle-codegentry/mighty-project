import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { dictionaries } from "../locale/dictionaries";
import { LanguageContext } from "../locale/LanguageProvider";
import SimpleMenu from "./SimpleMenu";

it("SimpleMenu Component is loading", () => {
  const { getByText, getByTestId, container } = render(<SimpleMenu />);
  expect(container).toBeTruthy();
});

it("SimpleMenu has message", () => {
  const provider = {
    language: "en",
    dictionary: dictionaries["en"],
  };

  const { getByText, getByTestId, container } = render(
    <LanguageContext.Provider value={provider}>
      <SimpleMenu />
    </LanguageContext.Provider>
  );

  expect(getByText("Getting Started")).toBeTruthy();
});

it("SimpleMenu has message in Spanish", () => {
  const provider = {
    language: "es",
    dictionary: dictionaries["es"],
  };

  const { getByText, getByTestId, container } = render(
    <LanguageContext.Provider value={provider}>
      <SimpleMenu />
    </LanguageContext.Provider>
  );

  expect(getByText("Empezando")).toBeTruthy();
});

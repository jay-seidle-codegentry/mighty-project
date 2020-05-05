import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import en from "./en";
import es from "./es";
import { dictionaries } from "./dictionaries";
import { LanguageContext, LanguageProvider } from "./LanguageProvider";
import { LanguageConsumerMock } from "../../mocks/LanguageConsumer.mock";

it("LanguageProvider Component is loading", () => {
  const { getByText, getByTestId, container } = render(<LanguageProvider />);
  expect(container).toBeTruthy();
});

it("LanguageProvider passes default language (en) to sub component", () => {
  const { getByText, getByTestId, container } = render(
    <LanguageProvider>
      <LanguageConsumerMock />
    </LanguageProvider>
  );
  expect(getByText(en.Title)).toBeTruthy();
});

it("LanguageContext Component is loading", () => {
  const { getByText, getByTestId, container } = render(
    <LanguageContext.Provider />
  );
  expect(container).toBeTruthy();
});

it("LanguageContext passes es language to sub componentn", () => {
  const provider = {
    language: "es",
    dictionary: dictionaries["es"],
  };

  const { getByText, getByTestId, container } = render(
    <LanguageContext.Provider value={provider}>
      <LanguageConsumerMock />
    </LanguageContext.Provider>
  );

  expect(getByText(es.Title)).toBeTruthy();
});

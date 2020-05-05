import React, { useContext, useEffect } from "react";
import { languages } from "./dictionaries";

import { LanguageContext } from "./LanguageProvider";

export const LanguageSelector = (props) => {
  const languageContext = useContext(LanguageContext);

  const handleLanguageChange = (event) => {
    const selectedLanguage = languages.find(
      (item) => item.id === event.target.value
    );
    // set selected language by calling context method
    languageContext.setLanguage(selectedLanguage);
  };

  useEffect(() => {
    localStorage.setItem("lang", languageContext.language.id);
  });

  return (
    <select
      {...props}
      onChange={handleLanguageChange}
      value={languageContext.language.id}
    >
      {languages.map((item) => (
        <option key={item.id} value={item.id}>
          {item.text}
        </option>
      ))}
    </select>
  );
}

export default LanguageSelector;
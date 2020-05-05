import React, { useContext, useState } from "react";
import { languages, dictionaries } from "./dictionaries";

// get saved language id
var selectedLanguage = localStorage.getItem("lang") || "en";
var defaultLanguage = languages.find((item) => item.id === selectedLanguage);

// create the language context with default selected language
export const LanguageContext = React.createContext({
  language: defaultLanguage,
  dictionary: dictionaries[defaultLanguage.id],
});

// it provides the language context to app
export const LanguageProvider = (props) => {
  const languageContext = useContext(LanguageContext);
  const [language, setLanguage] = useState(languageContext.language);
  const [dictionary, setDictionary] = useState(languageContext.dictionary);

  const provider = {
    language,
    dictionary,
    setLanguage: (selectedLanguage) => {
      setLanguage(selectedLanguage); // it will update the language in state
      setDictionary(dictionaries[selectedLanguage.id]);
    },
  };

  return (
    <LanguageContext.Provider value={provider}>
      {props.children}
    </LanguageContext.Provider>
  );
};

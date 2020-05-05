import React, { useContext } from "react";
import { LanguageContext } from "../Components/locale/LanguageProvider";

export const LanguageConsumerMock = (props) => {
  const T = useContext(LanguageContext).dictionary;

  return (
    <>
    {T.Title}
    </>
  );
};

export default LanguageConsumerMock;

import React, { useContext } from "react";
import { LanguageContext } from "../locale/LanguageProvider";

export const Loading = (props) => {
  const t = useContext(LanguageContext).dictionary;

  return <div>{t.LoadingMessage ? t.LoadingMessage : "Loading..."}</div>;
};

export default Loading;

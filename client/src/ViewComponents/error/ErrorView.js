import React, { useContext } from "react";
import { Typography, Box } from "@material-ui/core";
import {LanguageContext} from "../../Components/locale/LanguageProvider";

export const ErrorView = (props) => {
    const T = useContext(LanguageContext).dictionary;
    const styles = {
        center: {
            paddingTop: "15%",
        },
    }
  return (
    <Typography style={styles.center} component="div">
        <Box textAlign="center" fontSize="h1.fontSize">{T.Errors.Title}</Box>
        <Box textAlign="center" fontSize="h3.fontSize">{T.Errors.SubTitle}</Box>
        <Box textAlign="center">{T.Errors.Message}{props.message}</Box>
    </Typography>
  );
};

export default ErrorView;

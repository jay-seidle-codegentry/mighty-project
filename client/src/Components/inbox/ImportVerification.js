import React, { useContext, useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { IconButton, Typography, Button } from "@material-ui/core";
import { TransactionContext } from "../transaction/TransactionProvider";
import { swapArrayElements } from "../../utils/general-utils";
import { importStoredTransactions } from "../../usecases/transactions_api.usecase";
import { GlobalContext } from "../Global/GlobalProvider";

const useStyles = makeStyles({
  table: {
    minWidth: "1152px",
  },
  icon: {
    float: "left",
  },
  assignButton: {
    padding: "unset",
  },
  standardBackground: {
    backgroundColor: "white",
  },
  highlightColor: {
    backgroundColor: "lightgreen",
  },
});

export const ImportVerification = (props) => {
  const globalContext = useContext(GlobalContext);
  const { closeHandler } = props;
  const [stagedTransactionInfo, setStagedTransactionInfo] = useState(null);
  const [fieldMapping, setFieldMapping] = useState([]);
  const [firstRowWithData, setFirstRowWithData] = useState(-1);
  const previousFirstRowWithData = useRef(-1);
  const { withTransactions } = useContext(TransactionContext);

  const stagedDataHandler = (stagedDataInfo) => {
    setStagedTransactionInfo(stagedDataInfo);
  };

  useEffect(() => {
    globalContext.subscribe("stagedData", stagedDataHandler);

    let mappedFields = [];
    if (stagedTransactionInfo) {
      Object.keys(stagedTransactionInfo.items[0]).map((key, index) => {
        mappedFields.push(stagedTransactionInfo.mapping[key]);
        return true;
      });
      setFieldMapping(mappedFields);
    }

    let initialFirstRow = -1;
    if (stagedTransactionInfo) {
      stagedTransactionInfo.items.map((row, rowIndex) =>
        Object.values(row).map((value, cellIndex) => {
          if (!isNaN(value) && initialFirstRow === -1) {
            initialFirstRow = rowIndex;
          }
          return true;
        })
      );
    }
    setFirstRowWithData(initialFirstRow);

    return () => {
      globalContext.unsubscribe("stagedData", stagedDataHandler);
    };
  }, [globalContext, stagedTransactionInfo]);

  const classes = useStyles();

  const importIt = async () => {
    const params = {
      body: {
        key: stagedTransactionInfo.key,
        account: stagedTransactionInfo.account,
        map: fieldMapping,
        startingRow: firstRowWithData,
      },
    };
    await withTransactions(importStoredTransactions, params);
    if (closeHandler) closeHandler();
  };

  const closeIt = () => {
    if (closeHandler) closeHandler();
  };

  const onButtonClick = (direction, id) => {
    previousFirstRowWithData.current = firstRowWithData;
    if (direction === "down") {
      setFirstRowWithData(firstRowWithData + 1);
    }
    if (direction === "up") {
      setFirstRowWithData(firstRowWithData - 1);
    }
  };

  const onHeadingClick = (direction, id) => {
    if (direction === "left") {
      setFieldMapping([...swapArrayElements(fieldMapping, id, id - 1)]);
    }
    if (direction === "right") {
      setFieldMapping([...swapArrayElements(fieldMapping, id, id + 1)]);
    }
  };

  useEffect(() => {
    if (previousFirstRowWithData.current !== -1) {
      document.getElementById(
        "row" + previousFirstRowWithData.current
      ).className = classes.standardBackground;
      document.getElementById(
        "arrow" + previousFirstRowWithData.current
      ).style = "display: none";
    }

    if (firstRowWithData !== -1) {
      document.getElementById("row" + firstRowWithData).className =
        classes.highlightColor;
      document.getElementById("arrow" + firstRowWithData).style = "";
    }
  }, [firstRowWithData, classes.highlightColor, classes.standardBackground]);

  return (
    <>
      <Typography variant="h4">Confirm Import Fields</Typography>
      <Typography style={{ backgroundColor: "lightblue" }}>
        1. CONFIRM or ALIGN the headings in blue with the correct column by
        using arrows
      </Typography>
      <Typography style={{ backgroundColor: "lightgreen" }}>
        2. Adjust the green bar in the table to highlight the first row of data
      </Typography>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell padding="none" size="medium">
                Start
              </TableCell>
              {stagedTransactionInfo &&
                Object.keys(stagedTransactionInfo.items[0]).map(
                  (key, index) => {
                    return (
                      <TableCell
                        padding="none"
                        size="medium"
                        key={"head=" + key + "-" + index}
                        align="center"
                      >
                        {key}
                      </TableCell>
                    );
                  }
                )}
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell
                padding="none"
                style={{ backgroundColor: "lightblue" }}
              >
                {}
              </TableCell>
              {fieldMapping.map((value, index) => {
                return (
                  <TableCell
                    padding="none"
                    style={{ backgroundColor: "lightblue" }}
                    key={"mapped-header-" + index}
                    align="center"
                  >
                    {value && (
                      <IconButton
                        disabled={Boolean(index === 0)}
                        className={classes.assignButton}
                        onClick={() => onHeadingClick("left", index)}
                      >
                        <ArrowLeftIcon className={classes.icon} />
                      </IconButton>
                    )}
                    {value}
                    {value && (
                      <IconButton
                        disabled={index === fieldMapping.length - 1}
                        className={classes.assignButton}
                        onClick={() => onHeadingClick("right", index)}
                      >
                        <ArrowRightIcon className={classes.icon} />
                      </IconButton>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {stagedTransactionInfo &&
              stagedTransactionInfo.items.map((row, rowIndex) => (
                <TableRow
                  id={"row" + rowIndex}
                  className={classes.standardBackground}
                  key={"data-row-" + rowIndex}
                >
                  <TableCell padding="none">
                    <span id={"arrow" + rowIndex} style={{ display: "none" }}>
                      <IconButton
                        disabled={rowIndex === 0}
                        className={classes.assignButton}
                        onClick={() => onButtonClick("up", rowIndex)}
                      >
                        <ArrowUpwardIcon className={classes.icon} />
                      </IconButton>
                      |
                      <IconButton
                        disabled={
                          stagedTransactionInfo &&
                          rowIndex === stagedTransactionInfo.items.length - 1
                        }
                        className={classes.assignButton}
                        onClick={() => onButtonClick("down", rowIndex)}
                      >
                        <ArrowDownwardIcon className={classes.icon} />
                      </IconButton>
                    </span>
                  </TableCell>
                  {Object.values(row).map((value, cellIndex) => {
                    return (
                      <TableCell
                        padding="none"
                        key={"row-" + rowIndex + "-cell-" + cellIndex}
                        align="center"
                      >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography style={{ float: "right" }}>
        <Button onClick={closeIt} color="secondary">Cancel</Button>
        <Button onClick={importIt} color="primary">
          OK
        </Button>
      </Typography>
    </>
  );
};

export default ImportVerification;

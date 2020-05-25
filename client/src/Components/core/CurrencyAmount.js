import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { LanguageContext } from "../locale/LanguageProvider";

const useStyles = makeStyles((theme) => ({
  negativeAmount: {
    color: "red",
  },
  positiveAmount: {
    color: "green",
  },
}));

const getColor = (amount, styles) => {
  if (amount < 0) {
    return styles.negativeAmount;
  }

  return styles.positiveAmount;
};

const formatMoney = (
  amount,
  decimalCount,
  decimalSymbol,
  currencySymbol,
  thousandsSymbol
) => {
  let money = currencySymbol + "0";

  try {
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
    decimalCount = Math.abs(decimalCount);

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      currencySymbol +
      (j ? i.substr(0, j) + thousandsSymbol : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousandsSymbol) +
      (decimalCount
        ? decimalSymbol +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }

  return money;
};

export const CurrencyAmount = (props) => {
  const classes = useStyles();
  const T = useContext(LanguageContext).dictionary;

  let amount = props.amount;
  let colorStyle = getColor(amount, classes);
  let money = formatMoney(
    amount,
    T.Currency.decimalCount,
    T.Currency.decimalSymbol,
    T.Currency.currencySymbol,
    T.Currency.thousandsSymbol
  );

  return <span className={colorStyle}>{money}</span>;
};

export default CurrencyAmount;

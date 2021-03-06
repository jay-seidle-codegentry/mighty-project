import React, { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../locale/LanguageProvider";
import { GlobalContext } from "../Global/GlobalProvider";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import { CurrencyAmount } from "../core/CurrencyAmount";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const sumTotal = (detail) => {
  let total = 0;
  detail.forEach((element) => {
    total = total + parseFloat(element.amount);
  });
  return total;
};

export const EnvelopeSelector = (props) => {
  const globalContext = useContext(GlobalContext);
  const { envelopeSelectedHandler } = props;
  const {
    Title,
    SelectedMessage,
    SelectOneLabel,
    CanceledMessage,
  } = useContext(LanguageContext).dictionary.Envelope.Selector;
  const [envelopes, setEnvelopes] = useState([]);
  const selectedEnvelope = useRef();
  const [confirm, setConfirm] = useState(-1);

  const envelopesHandler = (envelopes) => {
    setEnvelopes(envelopes);
  };

  useEffect(() => {
    globalContext.subscribe("envelopes", envelopesHandler);

    return () => {
      globalContext.unsubscribe("envelopes", envelopesHandler);
    };
  }, [globalContext]);

  const clearHandler = () => {
    //setConfirm(0);
  };

  const buildEnvelopeSelectorButton = (envelope, index, handler) => {
    const confirmationHandler = (idx) => {
      if (confirm === idx) {
        handler(envelope);
      }
      setConfirm(idx);
    };

    return (
      <ClickAwayListener key={"cal" + index} onClickAway={clearHandler}>
        <ListItem
          onClick={() => confirmationHandler(index)}
          key={"item" + index}
          button
        >
          {Boolean(confirm !== index) && (
            <ListItemText style={{ textAlign: "center" }}>
              <strong>
                <span>
                  {envelope.title} {}
                </span>
                <CurrencyAmount amount={sumTotal(envelope.detail)} />
              </strong>
            </ListItemText>
          )}
          {Boolean(confirm === index) && (
            <ListItemText style={{ textAlign: "center" }}>
              <strong>
                <span>
                  {envelope.title} {}
                </span>
                <CurrencyAmount amount={sumTotal(envelope.detail)} />
                <div style={{ color: "red", fontWeight: "bold" }}>
                  Click again to confirm?
                </div>
              </strong>
            </ListItemText>
          )}
        </ListItem>
      </ClickAwayListener>
    );
  };

  const selectEnvelope = (envelope) => {
    selectEnvelope.current = envelope;
    envelopeSelectedHandler({
      envelope: selectEnvelope.current,
      message: SelectedMessage,
    });
  };

  const closeIt = () => {
    if (!selectedEnvelope.cuurent)
      envelopeSelectedHandler({ canceled: true, message: CanceledMessage });
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        closeIt();
      }}
    >
      <Typography style={{ textAlign: "center" }} component="div">
        <Typography variant="h3">{Title}</Typography>
        <Typography style={{ textAlign: "left" }}>{SelectOneLabel}</Typography>
        <List component="nav" aria-label="select account to receive upload">
          {envelopes.map((envelope, index) => {
            return buildEnvelopeSelectorButton(envelope, index, () =>
              selectEnvelope(envelope)
            );
          })}
        </List>
      </Typography>
    </ClickAwayListener>
  );
};

export default EnvelopeSelector;

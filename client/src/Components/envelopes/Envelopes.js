import React, { useContext, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Grid, IconButton } from "@material-ui/core";
import DraftsIcon from "@material-ui/icons/Drafts";
import AddIcon from "@material-ui/icons/Add";
import RemoveModal from "../core/Remove.modal";
import { LanguageContext } from "../../Components/locale/LanguageProvider";
import { ProfileContext } from "../../Components/Profile/ProfileProvider";
import { removeEnvelope } from "../../usecases/profile-api.usecase";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  useStyles,
} from "../core/ExpansionPanels";
import { SummationPanel } from "../core";

function change(event) {
  alert(event + " button clicked");
}

function showTransactions(event) {
  alert(event + " show transactions clicked");
}

const handlers = {
  showIconHandler: showTransactions,
  changeIconHandler: change,
};

export const Envelopes = (props) => {
  const T = useContext(LanguageContext).dictionary;
  const profileContext = useContext(ProfileContext);
  const { envelopes } = profileContext;
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);
  const [removeItem, setRemoveItem] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const removeClicked = (envelope) => {
    setRemoveItem(envelope);
  };

  const yesRemove = (envelope) => {
    profileContext.setProfile(removeEnvelope, { body: { id: envelope.id } });
    setRemoveItem(null);
  };

  const noRemove = (envelope) => {
    setRemoveItem(null);
  };

  const buildEnvelopeCard = (handlers, envelope, index) => {
    return (
      <SummationPanel
        key={index}
        expanded={expanded === "panel" + index}
        onChange={handleChange("panel" + index)}
        id={envelope}
        title={envelope.title}
        detail={envelope.detail}
        transactionHandler={handlers.showIconHandler}
        changeHandler={handlers.changeIconHandler}
        removeHandler={removeClicked}
      />
    );
  };

  return (
    <>
      <ExpansionPanel
        square
        expanded={props.expanded}
        onChange={props.onChange}
      >
        <ExpansionPanelSummary
          aria-controls="accounts-content"
          id="accounts-header"
        >
          <Typography className={classes.top} component="div">
            <Grid container>
              <Grid item sm={1} xs={2}>
                <DraftsIcon className={classes.floatIcon} fontSize="large" />{" "}
              </Grid>
              <Grid className={classes.title} item xs={8} sm={10}>
                {T.Panels.Envelopes}
              </Grid>
              <Grid item container xs={1}>
                <IconButton
                  className={classes.buttons}
                  disableFocusRipple={true}
                  disableRipple={true}
                >
                  <AddIcon className={classes.action} fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.top}>
            {envelopes.length === 0 && (
              <Typography>{T.Envelopes.NoEnvelopes}</Typography>
            )}
            {envelopes.map((envelope, index) => {
              return buildEnvelopeCard(handlers, envelope, index);
            })}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {removeItem && (
        <RemoveModal
          envelopeModal
          open={removeItem != null}
          item={removeItem}
          yesHandler={yesRemove}
          noHandler={noRemove}
        />
      )}
    </>
  );
};

export default Envelopes;

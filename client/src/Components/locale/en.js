const en = {
  Currency: {
    decimalCount: 2,
    currencySymbol: "$",
    decimalSymbol: ".",
    thousandsSymbol: ",",
  },
  Title: "Outright Money",
  WelcomeMessage1: "Are you ready?",
  WelcomeMessage2: "Take back control of your money!",
  Login: "Login / Sign Up",
  Logout: "Logout",
  InstructionsLogInOut:
    "Click the Login / Sign Up button, then chose login or sign up once authentication dialog is displayed",
  MainMenu: {
    Home: "Home",
    GettingStarted: "Getting Started",
    Privacy: "Privacy",
    Help: "Help",
  },
  UserMenu: {
    Account: "Account",
    Profile: "Profile",
  },
  Errors: {
    Title: "Whoa!",
    SubTitle: "Well that's not good",
    Message: "The app responded with: ",
  },
  Profile: {
    Editor: {
      TitleLabel: "Update Profile",
      EmailLabel: "Email Address:",
      NameLabel: "Display Name:",
      AvatarLabel: "Avatar:",
      DateLabel: "Sign-up Date:",
      CancelLabel: "Cancel",
      SaveLabel: "Save",
    },
    View: {
      TitleLabel: "Profile",
      EditLabel: "Edit",
      EmailLabel: "Email Address:",
      NameLabel: "Display Name:",
      AvatarLabel: "Avatar:",
      DateLabel: "Sign-up Date:",
    },
  },
  Panels: {
    Inbox: "Inbox",
    Envelopes: "Envelopes",
    Accounts: "Accounts",
  },
  Inbox: {
    NoItems: "Your Inbox is Empty",
  },
  Envelopes: {
    NoEnvelopes: "Create an envelope by clicking the plus icon",
  },
  Accounts: {
    NoAccounts: "Create an account by clicking the plus icon",
  },
  Account: {
    Editor: {
      EditTitle: "Update Account",
      NewTitle: "Add Account",
      NameLabel: "Account Name",
      StartingAmountLabel: "Starting Balance",
      CancelLabel: "Cancel",
      SaveLabel: "Save",
      SavedMessage: "Account Saved!",
      CanceledMessage: "Canceled.",
    },
    Selector: {
      Title: "Upload Account?",
      CanceledMessage: "Canceled.",
      SelectedMessage: "Account Selected",
      SelectOneLabel: "Select One:",
    },
  },
  Envelope: {
    Editor: {
      EditTitle: "Update Envelope",
      NewTitle: "Add Envelope",
      NameLabel: "Envelope Name",
      StartingAmountLabel: "Starting Balance",
      CancelLabel: "Cancel",
      SaveLabel: "Save",
      SavedMessage: "Envelope Saved!",
      CanceledMessage: "Canceled.",
    },
    Selector: {
      Title: "Select Envelope",
      CanceledMessage: "Canceled.",
      SelectedMessage: "Envelope Selected",
      SelectOneLabel: "Select One:",
    },
  },
  Dialogs: {
    Dialoger: {
      cancelButton: "Cancel",
      saveButton: "Save",
    },
    RemoveAccount: {
      Title: "Removing an Account!",
      Body: [
        "You will no longer be able to import for this account.",
        "However, any existing transactions will still be there.",
      ],
      Question: "Do you want to remove {title}?",
    },
    RemoveEnvelope: {
      Title: "Removing an Envelope!",
      Body: [
        "You will no longer be able to assign to this envelope.",
        "However, any previous assignments will still be there.",
      ],
      Question: "Do you want to remove {title}?",
    },
  },
  LoadingMessage: "Loading that up for you right now! Just a sec...",
};

export default en;

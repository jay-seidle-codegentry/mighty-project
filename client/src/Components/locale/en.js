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
  Accounts: {
    NoAccounts: "You have no accounts.",
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
    RemoveEnvelop: {
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

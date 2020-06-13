const es = {
  Currency: {
    decimalCount: 2,
    currencySymbol: "$",
    decimalSymbol: ".",
    thousandsSymbol: ",",
  },
  Title: "Dinero Absoluto",
  WelcomeMessage1: "¿Estas listo ahora?",
  WelcomeMessage2: "¡Recupera el control de tu dinero!",
  Login: "Iniciar sesión / Regístrate",
  Logout: "Cerrar sesión",
  InstructionsLogInOut:
    "Haga clic en el botón Iniciar sesión / Registrarse, luego elija iniciar sesión o registrarse una vez que se muestre el diálogo de autenticación",
  MainMenu: {
    Home: "Casa",
    GettingStarted: "Empezando",
    Privacy: "Intimidad",
    Help: "Ayuda",
  },
  UserMenu: {
    Account: "Cuenta",
    Profile: "Perfil",
  },
  Errors: {
    Title: "¡Guau!",
    SubTitle: "Eso no es bueno",
    Message: "La aplicación respondió con: ",
  },
  Profile: {
    Editor: {
      TitleLabel: "Actualización del perfil",
      EmailLabel: "Dirección de correo electrónico:",
      NameLabel: "Nombre para mostrar:",
      AvatarLabel: "Avatar:",
      DateLabel: "Fecha de registro:",
      CancelLabel: "Cancelar",
      SaveLabel: "Salvar",
    },
    View: {
      TitleLabel: "Perfil",
      EditLabel: "Editar",
      EmailLabel: "Dirección de correo electrónico:",
      NameLabel: "Nombre para mostrar:",
      AvatarLabel: "Avatar:",
      DateLabel: "Fecha de registro:",
    },
  },
  Panels: {
    Inbox: "Bandeja de entrada",
    Envelopes: "Sobres",
    Accounts: "Cuentas",
  },
  Accounts: {
    NoAccounts: "No tienes cuentas.",
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
  },
  RemoveEnvelop: {
    Title: "Removing an Envelope!",
    Body: [
      "You will no longer be able to assign to this envelope.",
      "However, any previous assignments will still be there.",
    ],
    Question: "Do you want to remove {title}?",
  },
  LoadingMessage: "¡Cargando eso para ti ahora mismo! Sólo un segundo...",
};

export default es;

import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "./react-auth0-spa";
import { LanguageProvider } from "./Components/locale/LanguageProvider";
import App from "./App";
import config from "./auth_config.json";
import history from "./utils/history";
import "typeface-roboto";

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

let state = {};
window.setState = (changes) => {
  state = Object.assign({}, state, changes);

  ReactDOM.render(
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      audience={config.audience}
      onRedirectCallback={onRedirectCallback}
    >
      <LanguageProvider>
        <App {...state} />
      </LanguageProvider>
    </Auth0Provider>,
    document.getElementById("root")
  );
};

/* eslint no-restricted-globals: 0*/
let initState = {
  started: Date.now(),
  location: location.pathname.replace(/^\/?|\/$/g, ""),
};

window.setState(initState);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

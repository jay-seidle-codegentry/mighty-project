import React, { useContext } from "react";
import { useAuth0 } from "./react-auth0-spa";
import LandingPage from "./Components/landing-page/LandingPage";
import Loading from "./Components/loading/Loading";
import "./App.css";
import { LanguageContext } from "./Components/locale/LanguageProvider";
import { ProfileProvider } from "./Components/Profile/ProfileProvider";
import { Main } from "./Components/main/Main";
import ViewProvider from "./Components/view/ViewProvider";
import { GlobalProvider } from "./Components/Global/GlobalProvider";

const App = (props) => {
  var { isAuthenticated, loading } = useAuth0();
  const t = useContext(LanguageContext).dictionary;

  if (loading) {
    return <Loading />;
  }

  document.title = t.Title;

  if (isAuthenticated) {
    return (
      <GlobalProvider>
        <ProfileProvider>
          <ViewProvider>
            <Main />
          </ViewProvider>
        </ProfileProvider>
      </GlobalProvider>
    );
  } else {
    return <LandingPage />;
  }
};

export default App;

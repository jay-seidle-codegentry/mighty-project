import React, { useContext } from "react";
import Secret from "./Components/secret/Secret";
//import {ProfileConsumerMock} from './mocks/ProfileConsumer.mock';
//import NotFound from "./Components/notfound/NotFound";
//import CallBack from "./Components/callback/Callback";
import { useAuth0 } from "./react-auth0-spa";
//import NavBar from "./Components/navbar/NavBar";
import LandingPage from "./Components/landing-page/LandingPage";
//import logo from "./logo.svg";
import "./App.css";
import { LanguageContext } from "./Components/locale/LanguageProvider";
import { ProfileProvider } from "./Components/Profile/ProfileProvider";

//import { getProfile } from './usecases/user-api.usecase';


const App = (props) => {
  //var contextType = useContext(LanguageContext);
  const { isAuthenticated, loading } = useAuth0();
  const t = useContext(LanguageContext).dictionary;

  if (loading) {
    return <div>Loading...</div>;
  }

  //console.log(contextType.dictionary.Title);

  // let renderComponent = <NotFound />;

  // switch (props.location) {
  //   case "":
  //     //getProfile(au)
  //     if (isAuthenticated) {
  //       renderComponent = <Secret {...props} />;
  //     } else {
  //       renderComponent = <LandingPage {...props} />;
  //     }
  //     break;
  //   case "secret":
  //     if (isAuthenticated) {
  //       renderComponent = <Secret {...props} />;
  //     }
  //     break;
  //   case "callback":
  //     renderComponent = <CallBack {...props} />;
  //     break;
  //   default:
  //     renderComponent = <NotFound />;
  // }

  document.title = t.Title;

  if (isAuthenticated) {
    return (
      <ProfileProvider>
        <Secret />
      </ProfileProvider>
    );
  } else {
    return <LandingPage />;
  }
};

export default App;

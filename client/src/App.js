import React, { useContext } from "react";
import { useAuth0 } from "./react-auth0-spa";
import LandingPage from "./Components/landing-page/LandingPage";
import Loading from "./Components/loading/Loading";
import "./App.css";
import { LanguageContext } from "./Components/locale/LanguageProvider";
import { ProfileProvider } from "./Components/Profile/ProfileProvider";
//import { Loading } from "./Components/loading/Loading";
import { Main } from "./Components/main/Main";
import ViewProvider from "./Components/view/ViewProvider";
//import Secret from "./Components/secret/Secret";
//import {ProfileConsumerMock} from './mocks/ProfileConsumer.mock';
//import NotFound from "./Components/notfound/NotFound";
//import NavBar from "./Components/navbar/NavBar";
//import CallBack from "./Components/callback/Callback";
//import { getProfile } from './usecases/user-api.usecase';

const App = (props) => {
  var { isAuthenticated, loading } = useAuth0();
  const t = useContext(LanguageContext).dictionary;

  if (loading) {
    return <Loading />;
    //<Loading />;
  }

  document.title = t.Title;

  if (isAuthenticated) {
    return (
      <ProfileProvider>
        <ViewProvider>
          <Main />
        </ViewProvider>
      </ProfileProvider>
    );
  } else {
    return <LandingPage />;
  }
};

export default App;
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

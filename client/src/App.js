import React from 'react';
import Main from './Components/main/Main';
import Secret from './Components/secret/Secret';
import NotFound from './Components/notfound/NotFound';
import CallBack from './Components/callback/Callback';
import { useAuth0 } from "./react-auth0-spa";
import NavBar from './Components/navbar/NavBar';
import logo from './logo.svg';
import './App.css';

function App(props) {
  //console.log(useAuth0);
  const { isAuthenticated, loading } = useAuth0();
//console.log(isAuthenticated);
  if (loading) {
    return (<div>Loading...</div>);
  }

  let renderComponent = <NotFound />;

  switch(props.location) {
    case "":
      renderComponent = <Main {...props} />;
      break;
    case "secret":
      if(isAuthenticated) {
        renderComponent = <Secret {...props} />;
      }
      break;
    case "callback":
      renderComponent = <CallBack {...props} />;
      break;
    default:
      renderComponent = <NotFound />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
  <p>{props.started}</p>
        <a
          className="App-link"
          data-testid="learn-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {renderComponent}
    </div>
  );
}

export default App;

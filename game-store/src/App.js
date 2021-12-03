import logo from './logo.svg';
import './App.css';
import React from 'react';
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"






import CredentialsProvider from './providers/CredentialsProvider';
import GamesProvider from './providers/GamesProvider';
import LoginPage from './pages/LoginPage'
import GamesPage from './pages/GamesPage';


function App(){

  return(
    <React.Fragment>
      <CredentialsProvider>
      <Router>
          <nav>
            <ul>
              <li>
                  <Link to ="/">Login</Link>
              </li>
              <li>
                  <Link to ="/games">Games List</Link>
              </li>
            </ul>
          </nav>
            <Switch>
              <Route exact path="/">
                  <LoginPage/>
              </Route>
              <GamesProvider>
                <Route exact path="/games">
                    <GamesPage/>
                </Route>
              </GamesProvider>
            </Switch>
        </Router>
        </CredentialsProvider>
      </React.Fragment>

  )



}



export default App;

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
import LoginPage from './pages/LoginPage'


function App(){

  return(
    <React.Fragment>
      <Router>
          <nav>
            <ul>
              <li>
                  <Link to ="/">Login</Link>
              </li>
            </ul>
          </nav>
          <CredentialsProvider>
            <Switch>
              <Route exact path="/">
                  <LoginPage/>
              </Route>         
            </Switch>
          </CredentialsProvider>
        </Router>
      </React.Fragment>

  )



}



export default App;

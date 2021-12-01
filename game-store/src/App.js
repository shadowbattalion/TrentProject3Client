import logo from './logo.svg';
import './App.css';


import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from './pages/Login'
import Games from './pages/Games'
import LoginSubmit from './pages/LoginSubmit'

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/login">About</Link>
          </li>
          <li>
            <Link to="/games">Contact Us</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/games">
          <Games/>
        </Route>
        <Route exact path="/login-submit">
          <LoginSubmit/>
      </Route>
      </Switch>
    </Router>
  )
}

export default App;

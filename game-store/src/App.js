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
import CartProvider from './providers/CartProvider';
import LoginPage from './pages/LoginPage'
import GamesPage from './pages/GamesPage';
import GameDetailsPage from './pages/GameDetailPage';
import CartPage from './pages/CartPage';


function App(){

  return(
    <React.Fragment>
      <CredentialsProvider>
        <CartProvider>
        <Router>
            <nav>
              <ul>
                <li>
                    <Link to ="/">Login</Link>
                </li>
                <li>
                    <Link to ="/games">Games List</Link>
                </li>
                <li>
                    <Link to ="/cart">Cart</Link>
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
                    <Route exact path="/game-details/:gameId">
                        <GameDetailsPage/>
                    </Route>
                  </GamesProvider>
                  <Route exact path="/cart">
                      <CartPage/>
                  </Route>
                
              </Switch>
          </Router>
        </CartProvider>
        </CredentialsProvider>
      </React.Fragment>

  )



}



export default App;

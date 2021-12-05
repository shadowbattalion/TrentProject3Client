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
import UserRegPage from './pages/UserRegPage';
import ErrorPage from'./pages/ErrorPage'
import GamesPage from './pages/GamesPage';
import GameDetailsPage from './pages/GameDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessfulPage from './pages/OrderSuccessfulPage'
import OrderFailurePage from './pages/OrderFailurePage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import Logout from './components/Logout'

function App(){

  return(
    <React.Fragment>
      <CredentialsProvider>
        <CartProvider>
          <GamesProvider>
        <Router>
            <nav>
              <ul>
                <li>
                    <Link to ="/">Login</Link>
                </li>
                <li>
                    <Logout/>
                </li>
                <li>
                    <Link to ="/user-reg">Sign Up</Link>
                </li>
                <li>
                    <Link to ="/games">Games List</Link>
                </li>
                <li>
                    <Link to ="/cart">Cart</Link>
                </li>
                <li>
                    <Link to ="/order-history">Order History</Link>
                </li>
              </ul>
            </nav>
              <Switch>
              
                <Route exact path="/">
                  <LoginPage/>
                </Route>
                <Route exact path="/user-reg">
                  <UserRegPage/>
                </Route>
                <Route exact path="/error-page">
                  <ErrorPage/>
                </Route>
                <Route exact path="/order-history">
                  <OrderHistoryPage/>
                </Route>
                <Route exact path="/cart">
                  <CartPage/>
                </Route>
                <Route exact path="/checkout">
                  <CheckoutPage/>
                </Route>
                <Route exact path="/order-success">
                  <OrderSuccessfulPage/>
                </Route>
                <Route exact path="/order-fail">
                  <OrderFailurePage/>
                </Route>
                <Route exact path="/games">
                  <GamesPage/>
                </Route>
                <Route exact path="/game-details/:gameId">
                  <GameDetailsPage/>
                </Route>
                    
                      
              </Switch>
              
          </Router>
          </GamesProvider>
        </CartProvider>
      </CredentialsProvider> 
        
      </React.Fragment>

  )



}



export default App;

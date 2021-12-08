import background from './images/pexels-miguel-á-padriñán-19670.jpg'
import './App.css';
import React from 'react';
import{
  BrowserRouter as Router,
  Switch,
  Route,
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


import OrderHistoryPage from './pages/OrderHistoryPage';

import Nav from './components/Nav'

function App(){

  return(
    <React.Fragment>
      <div style={{ 
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          paddingBottom:"50px"
          }}>
      <CredentialsProvider>
        <CartProvider>
          <GamesProvider>
        <Router>
           
              <Switch>
                <Route exact path="/">
                  <Nav/>
                  <LoginPage/>
                </Route>
                <Route exact path="/user-reg">
                  <Nav/>
                  <UserRegPage/>
                </Route>
                <Route exact path="/error-page">
                  <Nav/>
                  <ErrorPage/>
                </Route>
                <Route exact path="/order-history">
                  <Nav/>
                  <OrderHistoryPage/>
                </Route>
                <Route exact path="/cart">
                  <Nav/>
                  <CartPage/>
                </Route>
                <Route exact path="/checkout">
                  <Nav/>
                  <CheckoutPage/>
                </Route>
                
                
                <Route exact path="/games">
                  <Nav/>
                  <GamesPage/>
                </Route>
                <Route exact path="/game-details/:gameId">
                  <Nav/>
                  <GameDetailsPage/>
                </Route>       
              </Switch>
              
          </Router>
          </GamesProvider>
        </CartProvider>
      </CredentialsProvider> 
      </div>      
      </React.Fragment>

  )



}



export default App;

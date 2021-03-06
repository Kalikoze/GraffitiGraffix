import React from 'react';
import { Route } from 'react-router-dom';
import Main from '../Pages/Main/Main/Main';
import './App.css';
import Artists from '../Pages/Artists/Artists/Artists';
import Navigation from '../Pages/Main/Navigation/Navigation';
import SignUp from '../Pages/SignUp/SignUp';
import Profile from '../Pages/Artists/Profile/Profile';

const App = () =>
  (<div className="App">
    <Route exact path="/" render={() => {
        return (
          <div>
            <Navigation />
            <Main />
          </div>
        )
      }
    } />
  <Route exact path="/artists" render={() => {
        return (
          <div>
            <Navigation />
            <Artists />
          </div>
        )
      }
    } />
  <Route exact path="/signup" render={() => {
        return (
          <div>
            <Navigation />
            <SignUp />
          </div>
        )
      }
    } />
  <Route exact path="/profile" render={() => {
        return (
          <div>
            <Navigation />
            <Profile />
          </div>
        )
      }
    } />
   </div>);

export default App;

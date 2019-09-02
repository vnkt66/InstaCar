import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from './components/Home';
import Driver from './components/Driver';
import CustomerRegister from './components/Register';
import CustomerLogin from './components/CustLogin';
import Book from './components/Book';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
      <Route path='/aq-index' exact component={Home}/> 
      <Route path='/aq-index/driver' exact component={Driver} />
      <Route path='/aq-index/register' exact component={CustomerRegister} />
      <Route path='/aq-index/login' exact component={CustomerLogin} />
      <Route path='/aq-index/book' exact component={Book} />
      <Route exact path="/*" render={() => ( <Redirect to="/aq-index"/>)}/>
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

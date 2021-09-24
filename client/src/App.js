import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header.js'
import Home from './pages/Home';
import TodoPage from './pages/TodoPage';
import SchedulePage from './pages/SchedulePage';
import Detail from './pages/Detail';
import Login from './pages/Login';
import Register from "./pages/Register.js";
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/" component={Auth(Home, null)}/ >
        <Route path="/todos" component={Auth(TodoPage, true)} />
        <Route path="/schedule" component={Auth(SchedulePage, true)} />
        <Route path="/detail/:year/:month/:date" component={Auth(Detail, true)} />
        <Route path="/login" component={Auth(Login, false)} />
        <Route path="/register" component={Auth(Register, false)} />
      </Switch>
    </Router>
  );
}

export default App;

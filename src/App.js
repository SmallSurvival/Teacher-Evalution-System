import './App.css';
import Login from './components/login'
import Courses from './Pages/Courses'
import Admin from './components/Admin.login'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route  path="/" exact  component={Login} />
        <Route  path="/admin" exact  component={Admin} />
        <Route  path='/courses' component={Courses} />
      </Switch>
    </Router>
    </>
  );
}

export default App;

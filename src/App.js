import './App.css';
import Login from './components/login'
import Courses from './Pages/Courses'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route  path="/" exact  component={Login} />
        <Route  path='/courses' component={Courses} />
      </Switch>
    </Router>
    </>
  );
}

export default App;

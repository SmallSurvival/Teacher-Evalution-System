import './App.css';
import Login from './components/login'
import Courses from './Pages/Courses'
import Evalution from './Pages/EvalutionAdd'
import Admin from './components/Admin.login'
import Question from "./Pages/QuestionList"
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
          <Route path="/" exact component={Login} />
          <Route path='/courses' component={Courses} />
          <Route path='/question' component={Question} />
          <Route path="/admin" component={Admin} />
          <Route path="/evalution" component={Evalution} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

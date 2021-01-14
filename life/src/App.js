import logo from './logo.svg';
import './App.css';
import { Switch ,Route, Link } from 'react-router-dom';
/*
  App Components
*/
import Counter from './components/counter.component';
import Home from './components/homepage.component';
//import Sprint from './components/sprint/sprint.component';
import SprintBasic from './components/sprint/sprintbasic.component';

function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/counter' component={Counter} />
          <Route exact path='/sprint' component={SprintBasic} />
      </Switch>
    </div>
  );
}

export default App;

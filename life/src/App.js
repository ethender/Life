import logo from './logo.svg';
import './App.css';
import { Switch ,Route, Link } from 'react-router-dom';
import Counter from './components/counter.component';
import Home from './components/homepage.component';

function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/counter' component={Counter} />
      </Switch>
    </div>
  );
}

export default App;

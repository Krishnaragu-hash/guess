import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Playground from './components/Playground';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home/>}> </Route>
        <Route path='/user' element = {<User/>}> </Route>
        <Route path='/playground' element = {<Playground/>}> </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import dashboard from './Components/Dashboard/Dashboard';
import Navbar from './Components/Navbar/Navbar';
import AddForm from './Components/Form/AddForm';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <BrowserRouter>
      <ToastContainer />
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/work-time-slot" component={dashboard} />
          <Route path="/:slotId" component={AddForm} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

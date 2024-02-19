
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import Loader from './Components/Common/Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Routing from './Components/Routing';

function App() {
  return (
<>
<ToastContainer />
{/* <Loader/> */}
<Routing/>
</>
  );
}

export default App;

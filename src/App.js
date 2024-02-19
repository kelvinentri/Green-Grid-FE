
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import Loader from './Components/Common/Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Routing from './Components/Routing';
import { useSelector } from 'react-redux';

function App() {
  const {showLoader}=useSelector(store=>store.general)
  console.log({showLoader});
  return (
<>
<ToastContainer />
{showLoader && <Loader/>}
<Routing/>
</>
  );
}

export default App;

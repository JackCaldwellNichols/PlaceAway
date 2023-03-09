
import './App.css';
import BottomNav from './components/BottomNav';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import Notifications from './components/Notifications';
import RoomDetails from './Rooms/RoomDetails';
import Login from './user/Login';

function App() {
  return (
    <div className="App">
      <Loading />
      <Notifications />
      <Login />
       <Navbar />
       <BottomNav />
       <RoomDetails />
    </div>
  );
}

export default App;

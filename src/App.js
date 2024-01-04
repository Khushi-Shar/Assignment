import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './UserList';
import UserDetails from './UserDetails';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<UserList />} />
        <Route path="/user/:userId" element={<UserDetails />} />
        </Routes>
    </Router>
  );
};

export default App;
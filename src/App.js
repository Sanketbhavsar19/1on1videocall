import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RoomForm from './components/home/index';
import JoinTracks from './components/home/jointracks';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
      <Routes>
        <Route path="/" element={<RoomForm />} />
        <Route path="/jointracks" element={<JoinTracks />} />
      </Routes>
      </Router>
      </header>
    </div>
  );
}

export default App;

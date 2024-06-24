import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';


const App: React.FC = () => {
  return (
    <Router>
            <nav>
        <Link to="/">Home</Link> | <Link to="/results">Results</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
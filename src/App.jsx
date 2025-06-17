import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import GameHub from './pages/GameHub';
import GameResult from './pages/GameResult';
import BiasGame from './pages/BiasGame';
import ConfirmationBiasGame from './games/ConfirmationBiasGame';
import AvailabilityBiasGame from './games/AvailabilityBiasGame';
import AnchoringBiasGame from './games/AnchoringBiasGame';
import DunningKrugerGame from './games/DunningKrugerGame';
import PromptGenerator from './pages/PromptGenerator';
import './App.css';

function App() {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <Router>
      <div className="min-h-screen bg-blue-50 flex flex-col">
        <Navbar showDevTools={isDev} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gamehub" element={<GameHub />} />
            <Route path="/gameresult" element={<GameResult />} />
            <Route path="/play" element={<BiasGame />} />
            <Route path="/games/confirmation" element={<ConfirmationBiasGame />} />
            <Route path="/games/availability" element={<AvailabilityBiasGame />} />
            <Route path="/games/anchoring" element={<AnchoringBiasGame />} />
            <Route path="/games/dunning-kruger" element={<DunningKrugerGame />} />
            {isDev && <Route path="/dev/prompts" element={<PromptGenerator />} />}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

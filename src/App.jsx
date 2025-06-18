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
      <div className="h-screen w-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 font-outfit">
        {/* Background decoration */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-purple/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col">
          <Navbar showDevTools={isDev} />
          <main className="flex-1 scrollable">
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
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import CreateEvent from './pages/CreateEvent';
import VideoIntro from './pages/VideoIntro';
import EventPage from './pages/EventPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-premium-cream font-sans text-premium-dark">
        <Routes>
          <Route path="/" element={<Navigate to="/create" replace />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/intro/:data" element={<VideoIntro />} />
          <Route path="/event/:data" element={<EventPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

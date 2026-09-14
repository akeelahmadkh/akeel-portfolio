import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScrollCanvas } from './components/ScrollCanvas';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { About } from './pages/About';
import { Skills } from './pages/Skills';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#0A0A0A] text-[#F5F5F7] selection:bg-[#D4AF37] selection:text-black">
        
        {/* 60fps Background Canvas Scroll Engine */}
        <ScrollCanvas totalFrames={192} folderPath="/video_frames_30fps_png" />

        {/* Global Navigation */}
        <Navbar />

        {/* Dynamic Route Pages */}
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

      </div>
    </Router>
  );
};

export default App;

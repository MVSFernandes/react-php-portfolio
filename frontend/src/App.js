import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import AddProject from './pages/AddProject';
import EditProject from './pages/EditProject';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-content">
          <div className="gold-logo">
            <svg viewBox="0 0 100 100" className="gold-spinner">
              <path 
                fill="none" 
                stroke="url(#goldGradient)" 
                strokeWidth="8" 
                strokeDasharray="42.76482137044271 42.76482137044271" 
                d="M50 15A35 35 0 1 1 15 50"
              >
                <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  dur="1s" 
                  repeatCount="indefinite" 
                  from="0 50 50" 
                  to="360 50 50"
                />
              </path>
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#daa520" />
                  <stop offset="100%" stopColor="#f5d992" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 className="loading-text">Carregando Portfólio...</h2>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Navbar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/add-project" element={<AddProject />} />
            <Route path="/edit-project/:id" element={<EditProject />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} C&M. Todos os direitos reservados.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
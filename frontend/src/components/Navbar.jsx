import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="gold-text">Portfólio</span> Acadêmico
        </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/projects" className="nav-link" onClick={() => setIsOpen(false)}>Projetos</Link>
          <Link to="/add-project" className="nav-link" onClick={() => setIsOpen(false)}>Adicionar</Link>
          <Link to="/about" className="nav-link" onClick={() => setIsOpen(false)}>Sobre Nós</Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsOpen(false)}>Contato</Link>
        </div>

        <div className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

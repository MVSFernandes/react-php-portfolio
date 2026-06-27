import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="error-container">
        <h1>404</h1>
        <h2>Página Não Encontrada</h2>
        <p>A página que você está procurando não existe ou foi movida.</p>
        <Link to="/" className="home-link">Voltar para a Página Inicial</Link>
      </div>
    </div>
  );
};

export default NotFound;
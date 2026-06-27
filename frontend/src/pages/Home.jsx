import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const response = await fetch('http://localhost/meuprojeto/backend/index.php');
        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error('Esperava array, mas recebeu:', data);
          setFeaturedProjects([]);
          setError('Erro: resposta inesperada do servidor');
          return;
        }

        setFeaturedProjects(data.slice(0, 3));
        setError(null);
      } catch (error) {
        console.error('Error fetching featured projects:', error);
        setError('Falha ao carregar projetos em destaque');
        setFeaturedProjects([]);
      }
    };

    fetchFeaturedProjects();
  }, []);

  const getCorrectImageUrl = (imagePath) => {
    if (!imagePath) return '';

    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }

    // Uploaded files can arrive with or without the app base path.
    const cleanPath = imagePath.replace(/^\/?meuprojeto\/?/, '');
    return `http://localhost/meuprojeto/${cleanPath.replace(/^\/?uploads\//, 'uploads/')}`;
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Bem-vindo ao Meu <span className="gold-text">Portfólio Acadêmico</span></h1>
          <p>Uma coleção dos meus projetos desenvolvidos durante a graduação</p>
          <div className="hero-actions">
            <Link to="/projects" className="primary-btn">Ver Projetos</Link>
            <Link to="/about" className="secondary-btn">Sobre Nós</Link>
          </div>
        </div>
      </section>

      <section className="featured-projects">
        <h2>Projetos em Destaque</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="projects-grid">
          {featuredProjects.length > 0 ? (
            featuredProjects.map(project => (
              <div key={project.id} className="featured-project-card">
                <div className="project-image-container">
                  {project.image_path && (
                    <img
                      src={getCorrectImageUrl(project.image_path)}
                      alt={project.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'http://localhost/meuprojeto/uploads/default-image.jpg';
                      }}
                    />
                  )}
                </div>
                <div className="project-info">
                  <h3>
                    <span className="label-black"><strong>Título:</strong></span> {project.title}
                  </h3>
                  <p className="discipline">
                    <span className="label-black"><strong>Disciplina:</strong></span> {project.discipline}
                  </p>
                  <Link to="/projects" className="view-more">Ver todos</Link>
                </div>
              </div>
            ))
          ) : !error ? (
            <p>Nenhum projeto cadastrado ainda.</p>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default Home;

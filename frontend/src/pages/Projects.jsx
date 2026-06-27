import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import '../styles/Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost/meuprojeto/backend/index.php');

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao carregar projetos');
      }

      const data = await response.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      try {
        const response = await fetch(`http://localhost/meuprojeto/backend/index.php?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.success) {
          setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
        } else {
          throw new Error(result.message || 'Falha ao deletar projeto');
        }
      } catch (error) {
        console.error('Error deleting project:', error);
        setError(error.message);
      }
    }
  };

  const filteredProjects = projects.filter(project =>
    project.title?.toLowerCase().includes(filter.toLowerCase()) ||
    project.discipline?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1>Meus Projetos Acadêmicos</h1>
        <div className="projects-controls">
          <input
            type="text"
            placeholder="Filtrar por título ou disciplina..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="search-input"
          />
          <Link to="/add-project" className="add-project-btn">
            + Adicionar Projeto
          </Link>
        </div>
      </div>

      {error && (
        <div className="error-message">
          Erro: {error}
        </div>
      )}

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : filteredProjects.length === 0 ? (
        <div className="no-projects">
          {filter ? 'Nenhum projeto encontrado com esse filtro.' : 'Nenhum projeto cadastrado ainda.'}
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;

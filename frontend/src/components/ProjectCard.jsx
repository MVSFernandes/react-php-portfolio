import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [gradient, setGradient] = useState('');

  useEffect(() => {
    const angle = (project.id * 30) % 360;
    setGradient(`linear-gradient(${angle}deg, rgba(184,134,11,0.7), rgba(218,165,32,0.4))`);
  }, [project.id]);

  return (
    <div
      className={`project-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: gradient,
        boxShadow: isHovered
          ? '0 10px 25px rgba(218, 165, 32, 0.3)'
          : '0 5px 15px rgba(0, 0, 0, 0.1)'
      }}
    >
      {project.image_path && (
        <div className="project-image-container">
          <img
            src={`http://localhost:80/${project.image_path}`}
            alt={project.title}
            className="project-image"
          />
        </div>
      )}

      <div className="project-content">
        <h3 className="project-title">
          <span className="label-black">Título:</span> {project.title}
        </h3>
        <p className="project-discipline">
          <span className="label-black">Disciplina:</span> {project.discipline}
        </p>
        <p className="project-description">
          <span className="label-black">Descrição:</span> {project.description}
        </p>

        <div className="project-actions">
          <Link to={`/edit-project/${project.id}`} className="edit-btn">
            Editar
          </Link>
          <button onClick={() => onDelete(project.id)} className="delete-btn">
            Excluir
          </button>
          {project.file_path && (
            <a
              href={`http://localhost:80/${project.file_path}`}
              download
              className="download-btn"
            >
              Download
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

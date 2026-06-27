import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectForm = ({ isEdit = false }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEdit && id) {
      const fetchProject = async () => {
        try {
          const response = await fetch(`http://localhost:80/meuprojeto/backend/index.php?id=${id}`);
          if (!response.ok) {
            throw new Error('Falha ao carregar projeto');
          }

          const data = await response.json();

          setTitle(data.title);
          setDescription(data.description);
          setDiscipline(data.discipline);
          if (data.image_path) {
            setPreview(`http://localhost:80/${data.image_path}`);
          }
        } catch (err) {
          console.error('Erro:', err);
          setError(err.message);
        }
      };

      fetchProject();
    }
  }, [id, isEdit]);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setImage(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('discipline', discipline);
    if (image) formData.append('image', image);
    if (file) formData.append('file', file);

    if (isEdit) {
      formData.append('_method', 'PUT');
    }

    try {
      const response = await fetch(`http://localhost:80/meuprojeto/backend/index.php${isEdit ? `?id=${id}` : ''}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao salvar projeto');
      }

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }

      navigate('/projects', { state: { success: true } });
    } catch (err) {
      console.error('Erro:', err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{isEdit ? 'Editar Projeto' : 'Adicionar Novo Projeto'}</h2>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label>Título do Projeto *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label>Disciplina *</label>
          <input
            type="text"
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label>Descrição *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label>Imagem do Projeto {!isEdit && '(Opcional)'}</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isSubmitting}
          />
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Arquivo do Projeto (ZIP/RAR/.7z) {!isEdit && '(Opcional)'}</label>
          <input
            type="file"
            accept=".zip,.rar,.7z"
            onChange={handleFileChange}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Salvando...' : (isEdit ? 'Atualizar' : 'Salvar')}
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate('/projects')}
            disabled={isSubmitting}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;

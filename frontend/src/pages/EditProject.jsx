import ProjectForm from '../components/ProjectForm';

const EditProject = () => {
  return (
    <div className="edit-project-page">
      <ProjectForm isEdit={true} />
    </div>
  );
};

export default EditProject;
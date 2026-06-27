import ProjectForm from '../components/ProjectForm';

const AddProject = () => {
  return (
    <div className="add-project-page">
      <ProjectForm isEdit={false} />
    </div>
  );
};

export default AddProject;
import { useQuery, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import  Project  from "../../../server/models/Project.model";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }:ProjectCardProps) {
  const {refetch} = useQuery(GET_PROJECTS);
    const [deleteProject] = useMutation(DELETE_PROJECT, {
      update(cache) {
        const { projects } = cache.readQuery({ query: GET_PROJECTS }) as any;
        cache.writeQuery({
          query: GET_PROJECTS,
          data: { projects: projects.filter((p: Project) => p.id !== project.id) },
        });
      }
    });

    const handleDeleteProject = async () =>{
        try {
         await deleteProject({
            variables: {id: project.id},
            refetchQueries: [{query: GET_PROJECTS}],
         });
        } catch (error) {
            console.log(error);
            toast.error('Error deleting project');
        }
        toast.success('Project deleted Successfully');
        refetch();
    }

  return (
    <div className='col-md-6'>
        <div className="card mb3">
            <div className="card body">
                <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">{project.name}</h5>
            <div className="d-flex">
              <button className="btn btn-danger btn-sm" onClick={handleDeleteProject}>
                <FaTrash/>
              </button>
              <Link to={`/projects/${project.id}`} className="btn btn-primary btn-sm ml-2">
                View
              </Link>
            </div>
            
          </div>
          <p className="small ">
                    Status: <strong>{project.status}</strong>
                    <br />
                    {project.description.slice(0, 30)}...
                </p>
            </div>
        </div>
    </div>
  )
}

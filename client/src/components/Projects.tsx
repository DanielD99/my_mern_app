import Spinner from "./Spinner"
import {useQuery} from '@apollo/client'
import{GET_PROJECTS} from '../queries/projectQueries'
import ProjectCard from "./ProjectCard"
import  Project  from "../../../server/models/Project.model";

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>Error - something went wrong</p>;

  const projects = data?.getAllProjects || [];
  console.log("DATA PROJECTS",  projects)
  return (
    <>
    {projects.length > 0 ? (
      <div className="row mt-4">
        {projects.map((project: Project) => (
          <ProjectCard key={String(project.id)} project={project} />
        ))}
      </div>
    ) : (
      <p>No projects found</p>
    )}
  </>
);
}
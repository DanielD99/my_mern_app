import Spinner from "./Spinner"
import {useQuery} from '@apollo/client'
import{GET_PROJECTS} from '../queries/projectQueries'
import ProjectCard from "./ProjectCard"

export default function Projects() {
    const {loading, error, data}=useQuery(GET_PROJECTS)
    if (loading) return <Spinner/>
    if (error) return <p>Error - something went wrong</p>;


  return (
    <>
    {data.getAllProjects.length > 0 ? (
        <div className="row mt-4">
            {data.getAllProjects.map((project:any)=>(
                <ProjectCard key={project.id} project=
                {project}/>
            ))}
            </div>
    ) : (
    <p>No projects found</p>
    )}
    </>
  );
}

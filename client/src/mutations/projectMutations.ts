import {gql} from '@apollo/client';


const CREATE_PROJECT = gql`
mutation CreateProject($project: ProjectInput) {
  createProject(project: $project) {
    id
    name
    description
    status
    }
  }
  `;


const DELETE_PROJECT = gql`
mutation DeleteProject($id: ID!) {
  deleteProject(id: $id)
}
`;

export { CREATE_PROJECT, DELETE_PROJECT };
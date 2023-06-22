import{ gql } from '@apollo/client'


const GET_PROJECTS = gql`
query GetAllProjects{
    getAllProjects{
        id
        name
        description
        status
    }
}`;


const GET_PROJECT = gql`
query getProject($id: ID!){
    getProject(id: $id){
        id
        name
        description
        status
        clients {
            id
            name
            email
            phone
        }
    }
}`;

export {GET_PROJECTS, GET_PROJECT};
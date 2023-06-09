import { Link, useParams } from "react-router-dom"
import Spinner from '../components/Spinner'
import ClientInfo from '../components/ClientInfo'
import {useQuery} from '@apollo/client'
import {GET_PROJECT} from '../queries/projectQueries';

export default function Project() {
const {id} = useParams();
const {loading, error, data} = useQuery(GET_PROJECT, 
    {variables: { id } });

if (loading) return <Spinner />;
if (error){
    console.log("UNABLE TO FETCH DATA", error);
    return <p>Error! {error.message}, :(</p>;
} 

console.log("data PROJECT", data.project)

  return (
    <>
    {! loading && !error && data.project &&(
        <div className="mx-auto w-100 card p-5">
            <Link to ="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">Back</Link>

            <h1>{data.project.name} </h1>
            <p>{data.project.description}</p>
            <h5 className="mt-3"> Project Status</h5>
            <p className="lead">{data.project.status}</p>


            {data.project.client && <ClientInfo client={data.project.client} />}
        </div>

  )}
  </>
  );
    }

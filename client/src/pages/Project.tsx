import { Link, useParams } from "react-router-dom"
import Spinner from '../components/Spinner'
import {useQuery} from '@apollo/client'
import {GET_PROJECT} from '../queries/projectQueries'


export default function Project() {
const {id} = useParams();
const {loading, error, data} = useQuery(GET_PROJECT, 
    {variables: { id } });

if (loading) return <Spinner />;
if (error){
    console.log("SOMETHING IS NOT RIGHT", error);
    return <p>Error! {error.message}, :(</p>;
} 


  return (
    <>
    {! loading && !error &&(
        <div className="mx-auto w-100 card p-5">
            <Link to ="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">Back</Link>

            <h1>{} </h1>
        </div>

  )}
  </>
  );
    }

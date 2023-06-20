import React from 'react'
import{useQuery} from '@apollo/client'
import ClientRow from './ClientRow'
import {GET_CLIENTS} from '../queries/clientQueries'
import Spinner from './Spinner'

export default function Clients() {
    const {loading, error, data} = useQuery(GET_CLIENTS)
  if (loading) return <Spinner/>
    if (error) return <p>Error - something went wrong :(</p>
    return (
        <>
        {!loading && !error &&(
           <table className="table table-striped mt3"> 
              <thead>
                <tr>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Phone</th>
                      <th>ID</th>
                     <th></th>
                </tr>
                </thead>
                <tbody>
                    {data.getAllClients.map((client:any)=>(
                        <ClientRow key={client.id} client={client}/>
                    ))}
                </tbody>
            </table>
        )}
        </>
   
  )
}

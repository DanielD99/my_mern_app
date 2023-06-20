import React from 'react'
import {FaTrash} from 'react-icons/fa';
import {Client} from '../../../server/types/client';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

interface ClientRowProps {
    client: Client;
  }

export default function ClientRow({ client }: ClientRowProps) {
const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: {id: client.id},
    update(cache, { data: { deleteClient } }) {
        const{ clients } = cache.readQuery({query: GET_CLIENTS})as any;
        cache.writeQuery({
            query: GET_CLIENTS,
            data: {clients: clients.filter((c:Client)=> c.id !== deleteClient.id)}
        });
    }
       
});

    const handleDeleteClient = () =>{
        deleteClient();
    }

  return (
    <tr>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td>{client.id}</td>
        <td>
            <button className="btn btn-danger btn-sm"
             onClick={handleDeleteClient}>
                <FaTrash/>
            </button>
        </td>
    </tr>
  )
}

import React from 'react'
import {FaTrash} from 'react-icons/fa';
import {Client} from '../../../server/types/client';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import toast from 'react-hot-toast';

interface ClientRowProps {
    client: Client;
  }

  export default function ClientRow({ client }: ClientRowProps) {
    const {refetch} = useQuery(GET_CLIENTS);
    const [deleteClient] = useMutation(DELETE_CLIENT, {
      update(cache) {
        const { clients } = cache.readQuery({ query: GET_CLIENTS }) as any;
        cache.writeQuery({
          query: GET_CLIENTS,
          data: { clients: clients.filter((c: Client) => c.id !== client.id) },
        });
      }
    });

    const handleDeleteClient = async () =>{
        try {
         await deleteClient({
            variables: {id: client.id},
            refetchQueries: [{query: GET_CLIENTS}],
         });
        } catch (error) {
            console.log(error);
        }
        toast.success('Client Added Successfully');
        refetch();
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

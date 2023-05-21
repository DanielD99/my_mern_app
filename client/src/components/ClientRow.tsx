import React from 'react'
import {FaTrash} from 'react-icons/fa';
import {Client} from '../../../server/types/client';

export default function ClientRow({ client }: { client: Client}) {
  return (
    <tr>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td>
            <button className="btn btn-danger btn-sm">
                <FaTrash/>
            </button>
        </td>
    </tr>
  )
}

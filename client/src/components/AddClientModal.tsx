import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation, useQuery} from '@apollo/client';
import { CREATE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import toast from 'react-hot-toast';
import { onError } from '@apollo/client/link/error';

export default function AddClientModal() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const { refetch } = useQuery(GET_CLIENTS);
    const [ createClient ] = useMutation(CREATE_CLIENT);

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(name === "" || email === "" || phone === ""){
        return alert('Please fill in all fields');
        
    }
     await createClient({
        variables: {
            client: { 
                name,
                 email,
                  phone
                },
        },
        refetchQueries: [{query: GET_CLIENTS}]
    });
    refetch();
    toast.success('Client Added Successfully');
  };



return (
    <>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addClientModal">
            <div className="d-flex align-items-center">
                <FaUser className="icon" />
                <div>Add New Client</div>
            </div>
        </button>

        <div className="modal fade" id="addClientModal" tabIndex={-1} aria-labelledby="addClientModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="addClientModalLabel">Add Client</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" id="name"
                                    value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" id="email"
                                    value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone Number</label>
                                <input type="phone" className="form-control" id="phone"
                                    value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <button type="submit" data-bs-dismiss="modal" className="btn btn-secondary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
)
}

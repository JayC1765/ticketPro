import React, { useEffect } from 'react';
import { ApiError } from '../../types/types';

const Admin: React.FC = () => {
  // const [tickets, setTickets] = useState<>([])

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('http://localhost:8000/admin/allTickets');

        if (!response.ok) {
          throw new ApiError('Failed to retrieve all tickets');
        }

        const data = await response.json();
        console.log('data: ', data);
      } catch (err) {
        if (err instanceof ApiError) {
          console.log('Error: ', err.message);
        } else {
          console.log('An unexpected error occurred: ', err);
        }
      }
    };

    fetchTickets();
  }, []);

  return <div>Admin Page</div>;
};

export default Admin;

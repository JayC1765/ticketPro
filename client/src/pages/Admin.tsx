import React, { useEffect, useState } from 'react';
import { ApiError } from '../../types/types';
import { Grid, Box } from '@mui/material';
import TicketCard from '../components/TicketCard';
import { Ticket } from '../../types/types';

const Admin: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('http://localhost:8000/admin/allTickets');
        // production mode
        // const response = await fetch('/admin/allTickets');

        if (!response.ok) {
          throw new ApiError('Failed to retrieve all tickets');
        }

        const data = await response.json();
        console.log('data: ', data);
        setTickets(data);
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

  return (
    <Grid
      container
      justifyContent="space-evenly"
      sx={{ gap: '30px', marginTop: '10px' }}
    >
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </Grid>
  );
};

export default Admin;

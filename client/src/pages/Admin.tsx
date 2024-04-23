import React, { useEffect, useState } from 'react';
import { ApiError } from '../../types/types';
import { Grid } from '@mui/material';
import TicketCard from '../components/TicketCard';
import { Ticket } from '../../types/types';
import TicketDrawer from '../components/TicketDrawer';

const Admin: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [currTicket, setCurrTicket] = useState<Ticket | null>(null);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

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
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          toggleDrawer={toggleDrawer}
          setCurrTicket={setCurrTicket}
        />
      ))}
      <TicketDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        currTicket={currTicket}
        setCurrTicket={setCurrTicket}
      />
    </Grid>
  );
};

export default Admin;

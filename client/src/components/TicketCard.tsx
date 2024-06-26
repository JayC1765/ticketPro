import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { Ticket } from '../../types/types';

interface TicketCardProps {
  ticket: Ticket;
  toggleDrawer: () => void;
  setCurrTicket: React.Dispatch<React.SetStateAction<Ticket | null>>;
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  toggleDrawer,
  setCurrTicket,
}) => {
  const formattedTimestamp = new Date(ticket.timestamp).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }
  );

  const handleDrawer = () => {
    toggleDrawer();
    setCurrTicket(ticket);
  };

  return (
    <Grid item xs={12} sm={12} md={5}>
      <Card className="ticket-card" onClick={handleDrawer}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="h2">
              {`${ticket.firstname} ${ticket.lastname}`}
            </Typography>
            <Typography color="textSecondary">{formattedTimestamp}</Typography>
          </Box>
          <Typography color="textSecondary">{ticket.email}</Typography>
          <Typography color="textSecondary">Status: {ticket.status}</Typography>
          <Typography className="description" sx={{ wordBreak: 'break-word' }}>
            Description: {ticket.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TicketCard;

import React, { useEffect, useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { Ticket, TicketStatus, ApiError } from '../../types/types';

interface TicketDrawerProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  currTicket: Ticket | null;
  setCurrTicket: React.Dispatch<React.SetStateAction<Ticket | null>>;
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
}

const TicketDrawer: React.FC<TicketDrawerProps> = ({
  isDrawerOpen,
  toggleDrawer,
  currTicket,
  setCurrTicket,
  setTickets,
}) => {
  const [status, setStatus] = useState<TicketStatus>(TicketStatus.NEW);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    if (!isDrawerOpen) {
      setCurrTicket(null);
    }
  }, [isDrawerOpen, setCurrTicket]);

  useEffect(() => {
    if (currTicket) {
      setStatus(currTicket.status);
    } else {
      setStatus(TicketStatus.NEW);
    }
  }, [currTicket]);

  const formattedTimestamp = currTicket
    ? new Date(currTicket.timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '';

  const handleStatusChange = async (event: SelectChangeEvent<TicketStatus>) => {
    const newStatus = event.target.value as TicketStatus;
    setStatus(newStatus);

    try {
      if (currTicket) {
        const response = await fetch(
          `http://localhost:8000/admin/updateTicket/${currTicket.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
          }
        );

        if (!response.ok) {
          throw new ApiError('Failed to create ticket');
        }

        setIsSuccess(true);
        setSuccessMessage('Updated!');
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.id === currTicket.id
              ? { ...ticket, status: newStatus }
              : ticket
          )
        );

        setTimeout(() => {
          setIsSuccess(false);
          setSuccessMessage('');
        }, 2000);
      }
    } catch (err) {
      if (err) console.log(err);
    }
  };

  return (
    <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
      <Box sx={{ width: '40vw', padding: '20px' }}>
        <Typography variant="h5">Ticket Details</Typography>
        {currTicket && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              Customer: {`${currTicket.firstname} ${currTicket.lastname}`}
            </Typography>

            <Typography variant="body1">Email: {currTicket.email}</Typography>

            <Typography variant="body1">Date: {formattedTimestamp}</Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '50%',
                mt: 2,
              }}
            >
              <FormControl sx={{ width: '70%' }}>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status-select"
                  value={status}
                  label="Status"
                  onChange={handleStatusChange}
                >
                  <MenuItem value={TicketStatus.NEW}>New</MenuItem>
                  <MenuItem value={TicketStatus.IN_PROGRESS}>
                    In Progress
                  </MenuItem>
                  <MenuItem value={TicketStatus.RESOLVED}>Resolved</MenuItem>
                </Select>
              </FormControl>
              {isSuccess && (
                <Typography sx={{ mt: '20px', color: 'green' }}>
                  {successMessage}
                </Typography>
              )}
            </Box>
            <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
              Description: {currTicket.description}
            </Typography>
          </Box>
        )}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Add Comment</Typography>
          <TextField
            label="Your Comment"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            sx={{ mt: 2 }}
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default TicketDrawer;

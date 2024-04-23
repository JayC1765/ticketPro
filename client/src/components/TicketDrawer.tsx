import React, { useEffect } from 'react';
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
} from '@mui/material';
import { Ticket, TicketStatus } from '../../types/types';

interface TicketDrawerProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  currTicket: Ticket | null;
  setCurrTicket: React.Dispatch<React.SetStateAction<Ticket | null>>;
}

const TicketDrawer: React.FC<TicketDrawerProps> = ({
  isDrawerOpen,
  toggleDrawer,
  currTicket,
  setCurrTicket,
}) => {
  useEffect(() => {
    if (!isDrawerOpen) {
      setCurrTicket(null);
    }
  }, [isDrawerOpen, setCurrTicket]);

  const formattedTimestamp = currTicket
    ? new Date(currTicket.timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '';

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

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status-select"
                value={currTicket.status}
                label="Status"
                // onChange={handleStatusChange}
              >
                <MenuItem value={TicketStatus.NEW}>New</MenuItem>
                <MenuItem value={TicketStatus.IN_PROGRESS}>
                  In Progress
                </MenuItem>
                <MenuItem value={TicketStatus.RESOLVED}>Resolved</MenuItem>
              </Select>
            </FormControl>

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

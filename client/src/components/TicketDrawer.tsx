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
import { Ticket, TicketStatus, ApiError, Comment } from '../../types/types';
import TicketComments from './TicketComments';

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
  const [comment, setComment] = useState<string>('');
  const [newComment, setNewComment] = useState<Comment | null>(null);

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
          // `http://localhost:8000/admin/updateTicket/${currTicket.id}`,
          `/admin/updateTicket/${currTicket.id}`,
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

  const handleSubmit = async () => {
    try {
      if (currTicket) {
        const response = await fetch(
          // `http://localhost:8000/admin/addComments/${currTicket.id}`,
          `/admin/addComments/${currTicket.id}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              comment,
              username: 'User123',
            }),
          }
        );

        if (!response.ok) {
          throw new ApiError('Failed to add a comment');
        }

        const data = await response.json();

        if (data.comment) {
          setNewComment(data.comment);
        }

        setComment('');
      }
    } catch (err) {
      if (err) console.log(err);
    }
  };

  return (
    <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
      <Box
        sx={{
          width: '40vw',
          padding: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            height: '80vh',
          }}
        >
          {currTicket && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid black',
                padding: '10px',
              }}
            >
              <Typography variant="h5">Ticket Details</Typography>
              <Typography variant="body1">
                Customer: {`${currTicket.firstname} ${currTicket.lastname}`}
              </Typography>

              <Typography variant="body1">Email: {currTicket.email}</Typography>

              <Typography variant="body1">
                Date: {formattedTimestamp}
              </Typography>
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
          <Box sx={{ border: '1px solid black', padding: 2 }}>
            {currTicket && (
              <TicketComments
                ticketId={currTicket.id}
                newComment={newComment}
              />
            )}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5">Add Comment</Typography>
              <TextField
                label="Your Comment"
                variant="outlined"
                fullWidth
                multiline
                value={comment}
                rows={4}
                sx={{ mt: 2 }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setComment(event.target.value);
                }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default TicketDrawer;

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { ApiError } from '../../types/types';

const TicketForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSuccess(false);
    setIsError(false);
    const apiURL = 'ticketpro-production.up.railway.app';

    try {
      const response = await fetch(
        // 'http://localhost:8000/customers/create-ticket',
        `${apiURL}/customers/create-ticket`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            description,
          }),
        }
      );

      if (!response.ok) {
        throw new ApiError('Failed to create ticket');
      }

      const data = await response.json();

      if (data) {
        setFirstName('');
        setLastName('');
        setEmail('');
        setDescription('');
        setIsSuccess(true);
        setSuccessMessage('Ticket has been created!');

        setTimeout(() => {
          setIsSuccess(false);
          setSuccessMessage('');
        }, 3000);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setIsError(true);
        setErrorMessage(err.message);
      } else {
        setIsError(true);
        setErrorMessage('An unexpected error occurred');
      }

      setFirstName('');
      setLastName('');
      setEmail('');
      setDescription('');
    }
  };

  return (
    <Box className="form-container">
      <form onSubmit={handleSubmit} className="ticket-form">
        <Box className="form-fields">
          <Box className="name-field-container">
            <TextField
              label="First Name"
              value={firstName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFirstName(event.target.value);
              }}
              required
            />
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setLastName(event.target.value);
              }}
              required
            />
          </Box>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
            }}
            required
          />
          <TextField
            label="Description"
            multiline
            rows={6}
            value={description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDescription(event.target.value);
            }}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Typography textAlign="center" color={isSuccess ? 'green' : 'red'}>
            {isSuccess ? successMessage : isError ? errorMessage : null}
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default TicketForm;

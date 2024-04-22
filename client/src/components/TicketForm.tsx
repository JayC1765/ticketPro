import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const TicketForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      name: name,
      email: email,
      description: description,
    };
    console.log(formData);
    setName('');
    setEmail('');
    setDescription('');
  };

  return (
    <Box className="form-container">
      <form onSubmit={handleSubmit} className="ticket-form">
        <Box className="form-fields">
          <TextField label="Name" value={name} onChange={handleNameChange} />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            label="Description"
            multiline
            rows={6}
            value={description}
            onChange={handleDescriptionChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default TicketForm;

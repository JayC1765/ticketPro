import React, { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Typography } from '@mui/material';
import TicketForm from '../components/TicketForm';

const Home: React.FC = () => {
  const [value, setValue] = useState('1');

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 2,
            borderColor: 'divider',
          }}
        >
          <TabList onChange={handleChange} className="home-tabs">
            <Tab label="Create Ticket" value="1" />
            <Tab label="Dashboard" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <TicketForm />
        </TabPanel>
        <TabPanel value="2">
          <Typography>Tickets Dashboard for Logged Users</Typography>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Home;

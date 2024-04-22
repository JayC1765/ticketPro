import React, { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';

const Home: React.FC = () => {
  const [value, setValue] = useState('1');

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Dashboard" value="1" />
            <Tab label="Create Ticket" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <p>Tickets Dashboard</p>
        </TabPanel>
        <TabPanel value="2">
          <p>Create Ticket here</p>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Home;

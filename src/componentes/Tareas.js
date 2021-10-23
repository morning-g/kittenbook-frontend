import React, { Component } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function ColorTabs() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        variant = "fullWidth"
      >
        <Tab value="one" label="Ecuaciones diferenciales" />
        <Tab value="two" label="Item Two" />
        <Tab value="three" label="Item Three" />
        <Tab value="Cuarto" label="Item 4" />
      </Tabs>
    </Box>
  );
}
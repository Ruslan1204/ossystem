import AppBar from '@mui/material/AppBar';
import { Outlet } from 'react-router-dom';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { Navigation } from './Navigation/Navigation';

import { Suspense } from 'react';

export const Layout = () => {
  return (
    <div>
      <AppBar position="static" color="success">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <Navigation />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            SPA application
          </Typography>
        </Toolbar>
      </AppBar>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
};

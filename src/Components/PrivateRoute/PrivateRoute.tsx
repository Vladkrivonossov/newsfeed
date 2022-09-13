import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContextProvider';
import { Box, CircularProgress } from '@mui/material';

export const PrivateRoute: FC = () => {
  const { isAuthenticate } = useAuth();
  if (isAuthenticate === null) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return isAuthenticate ? <Outlet /> : <Navigate to="/login" />;
};

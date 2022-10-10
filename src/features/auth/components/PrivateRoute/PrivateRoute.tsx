import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../AuthContextProvider';
import { Box, CircularProgress } from '@mui/material';

export const PrivateRoute: FC = () => {
  const { isAuthenticated } = useAuthContext();
  if (isAuthenticated === null) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

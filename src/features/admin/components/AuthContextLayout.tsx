import React from 'react';
import { AuthContextProvider } from '@features/auth/AuthContextProvider';
import { initializeAPI } from '@app/api';
import { Outlet } from 'react-router-dom';

const app = initializeAPI();

export const AuthContextLayout = () => {
  return (
    <AuthContextProvider firebaseApp={app}>
      <Outlet />
    </AuthContextProvider>
  );
};

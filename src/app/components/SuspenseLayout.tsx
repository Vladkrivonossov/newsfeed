import React from 'react';
import { Outlet } from 'react-router-dom';

export const SuspenseLayout = () => {
  return (
    <React.Suspense fallback={<div>loading</div>}>
      <Outlet />
    </React.Suspense>
  );
};

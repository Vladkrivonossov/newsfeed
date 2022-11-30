import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '@features/auth/components/PrivateRoute/PrivateRoute';
import AdminPage from '@features/admin/components/AdminPage/AdminPage';
import AdminArticles from '@features/admin/components/AdminArticles/AdminArticles';
import AdminArticleItem from '@features/admin/components/AdminArticleItem/AdminArticleItem';
import { LoginContainer } from '@features/auth/login/LoginContainer';
import { AuthContextProvider } from '@features/auth/AuthContextProvider';
import { initializeAPI } from '@app/api';

const app = initializeAPI();

const Admin = () => {
  return (
    <AuthContextProvider firebaseApp={app}>
      <AdminPage>
        <Routes>
          <Route path="login" element={<LoginContainer />} />
          <Route element={<PrivateRoute />}>
            <Route index element={<AdminArticles />} />
            <Route path="create" element={<AdminArticleItem />} />
            <Route path="edit/:id" element={<AdminArticleItem />} />
          </Route>
        </Routes>
      </AdminPage>
    </AuthContextProvider>
  );
};

export default Admin;

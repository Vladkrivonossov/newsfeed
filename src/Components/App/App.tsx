import { Route, Routes, useLocation } from 'react-router-dom';
import { Articles } from '../Articles/Articles';
import React, { useEffect } from 'react';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import { Page } from '../Page/Page';
import { AdminPage } from '../AdminPage/AdminPage';
import { AdminArticles } from '../AdminArticles/AdminArticles';
import { AdminArticleItem } from '../AdminArticleItem/AdmintArticlesIte';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import { LoginContainer } from '../../features/auth/login/LoginContainer';

export const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Page>
            <LoginContainer />
          </Page>
        }
      />
      <Route element={<PrivateRoute />}>
        <Route
          path="/admin"
          element={
            <AdminPage>
              <AdminArticles />
            </AdminPage>
          }
        />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route
          path="/admin/create"
          element={
            <AdminPage>
              <AdminArticleItem />
            </AdminPage>
          }
        />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route
          path="/admin/edit/:id"
          element={
            <AdminPage>
              <AdminArticleItem />
            </AdminPage>
          }
        />
      </Route>
      <Route
        path="/"
        element={
          <Page>
            <Articles />
          </Page>
        }
      />
      <Route
        path="/:categoryId"
        element={
          <Page>
            <Articles />
          </Page>
        }
      />
      <Route
        path="/article/:id"
        element={
          <Page>
            <ArticleItem />
          </Page>
        }
      />
    </Routes>
  );
};

import { Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from '@features/articlesList/components/HomePage/HomePage';
import React, { useEffect, useRef } from 'react';
import { ArticlePage } from '@features/articleItem/components/ArticlePage/ArticlePage';
import { Page } from '@components/Page/Page';
import { AdminPage } from '@features/admin/components/AdminPage/AdminPage';
import { AdminArticles } from '@features/admin/components/AdminArticles/AdminArticles';
import { AdminArticleItem } from '@features/admin/components/AdminArticleItem/AdmintArticlesIte';
import { PrivateRoute } from '@features/auth/components/PrivateRoute/PrivateRoute';
import { LoginContainer } from '@features/auth/login/LoginContainer';
import { CategoryPage } from '@features/categoryArticles/components/CategoryPage/CategoryPage';
import { OfflineNotificationWatcher } from '@features/networkStatus/OfflineNotificationWatcher/OfflineNotificationWatcher';

export const App = () => {
  const location = useLocation();
  const { pathname } = location;
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <div>
      <Routes location={location}>
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
              <HomePage />
            </Page>
          }
        />
        <Route
          path="/:category"
          element={
            <Page>
              <CategoryPage />
            </Page>
          }
        />
        <Route
          path="/article/:id"
          element={
            <Page>
              <ArticlePage />
            </Page>
          }
        />
      </Routes>
      <OfflineNotificationWatcher />
    </div>
  );
};

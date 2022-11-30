import { Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from '@features/articlesList/components/HomePage/HomePage';
import React, { useEffect, useRef } from 'react';
import { ArticlePage } from '@features/articleItem/components/ArticlePage/ArticlePage';
import { Page } from '@components/Page/Page';
import { CategoryPage } from '@features/categoryArticles/components/CategoryPage/CategoryPage';
import { OfflineNotificationWatcher } from '@features/networkStatus/OfflineNotificationWatcher/OfflineNotificationWatcher';
import { SuspenseLayout } from '@app/components/SuspenseLayout';

const Admin = React.lazy(() => import('@app/components/Admin'));

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
        <Route element={<SuspenseLayout />}>
          <Route path="/admin/*" element={<Admin />} />
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

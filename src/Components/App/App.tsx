import { Route, Routes, useLocation } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import { Articles } from '../Articles/Articles';
import React, { useEffect } from 'react';
import './App.css';
import { ArticleItem } from '../ArticleItem/ArticleItem';

export const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <header className="header">
        <div className="container">
          <Navigation placement="header" className="header__navigation" />
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/:categoryId" element={<Articles />} />
          <Route path="/article/:id" element={<ArticleItem />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">
          <Navigation placement="footer" className="footer__navigation" />
          <div className="footer__column">
            <p className="footer__text">
              Сделано на Frontend курсе в
              <a rel="noreferrer" href="https://karpov.courses/frontend" target="_blank" className="footer__link">
                Karpov.Courses
              </a>
            </p>
            <p className="footer__copyright">© 2022</p>
          </div>
        </div>
      </footer>
    </>
  );
};

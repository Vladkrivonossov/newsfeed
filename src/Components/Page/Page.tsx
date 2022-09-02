import React, { FC, ReactNode } from 'react';
import './Page.css';
import { Navigation } from '../Navigation/Navigation';

interface Props {
  children: ReactNode;
}

export const Page: FC<Props> = ({ children }) => {
  return (
    <>
      <header className="header">
        <div className="container">
          <Navigation placement="header" className="header__navigation" />
        </div>
      </header>

      <main>{children}</main>

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

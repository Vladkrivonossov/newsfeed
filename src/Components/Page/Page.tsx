import React, { FC, ReactNode } from 'react';
import './Page.css';
import { Navigation } from '../Navigation/Navigation';
import { Logo } from '../Logo/Logo';

interface Props {
  children: ReactNode;
}

export const Page: FC<Props> = ({ children }) => {
  return (
    <>
      <header className="header">
        <div className="container header__container">
          <Logo />
          <Navigation className="header__navigation" />
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <Logo />
            <Navigation className="footer__navigation" />
          </div>
          <div className="footer__column">
            Сделано на Frontend курсе в
            <a rel="noreferrer" href="https://karpov.courses/frontend" target="_blank" className="footer__link">
              Karpov.Courses
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

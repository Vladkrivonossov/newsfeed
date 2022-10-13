import React, { FC, ReactNode, useState } from 'react';
import './Page.css';
import { Navigation } from '../Navigation/Navigation';
import { Logo } from '../Logo/Logo';
import { ColorSchemeSwitcher } from '@features/colorScheme/components/ColorSchemeSwitcher/ColorSchemeSwitcher';
import { EmailModal } from '@features/subscribeNotification/components/EmailModal/EmailModal';

const LS_EMAIL_SHOWN_KEY = 'newsfeed:email_modal_shown';

interface Props {
  children: ReactNode;
}

export const Page: FC<Props> = ({ children }) => {
  const [emailModalShown, setEmailModalShown] = useState(!localStorage.getItem(LS_EMAIL_SHOWN_KEY));

  return (
    <>
      {emailModalShown && (
        <EmailModal
          onClose={() => {
            localStorage.setItem(LS_EMAIL_SHOWN_KEY, 'true');
            setEmailModalShown(false);
          }}
        >
          Hello
        </EmailModal>
      )}
      <header className="header">
        <div className="container header__container">
          <Logo />
          <Navigation className="header__navigation" />
          <div className="header__controls">
            <ColorSchemeSwitcher />
          </div>
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
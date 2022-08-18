import React, { FC } from 'react';
import { categoryNames } from '../../utils';
import './Navigation.css';
import logo from '../../images/logo.svg';

interface Props {
  onNavClick: (event: React.MouseEvent<HTMLElement>) => void;
  currentCategory: string;
  className?: string;
  placement: 'header' | 'footer';
}

export const Navigation: FC<Props> = ({ onNavClick, currentCategory, className = '', placement = 'header' }) => {
  return (
    <nav className={`grid navigation navigation--${placement} ${className}`}>
      <a className="navigation__logo" data-href="index" href="src/script.tsx">
        <img className="navigation__image" src={logo} alt="logo" />
      </a>
      <ul className="navigation__list">
        {['index', 'fashion', 'tech', 'politics', 'sport'].map((item) => {
          return (
            <li className="navigation__item" key={item}>
              <a
                onClick={onNavClick}
                data-href={item}
                href="src/script.tsx"
                className={`navigation__link ${currentCategory === item ? 'navigation__link--active' : ''}`}
              >
                {categoryNames[item]}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

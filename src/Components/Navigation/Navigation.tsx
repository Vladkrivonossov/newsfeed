import React, { FC } from 'react';
import { categoryNames } from '../../utils';
import './Navigation.css';
import logo from '../../images/logo.svg';
import { NavLink } from 'react-router-dom';

interface Props {
  className?: string;
  placement: 'header' | 'footer';
}

export const Navigation: FC<Props> = ({ className = '', placement = 'header' }) => {
  return (
    <nav className={`grid navigation navigation--${placement} ${className}`}>
      <NavLink to="/" className="navigation__logo" data-href="index">
        <img className="navigation__logo--image" src={logo} alt="logo" />
      </NavLink>
      <ul className="navigation__list">
        {['index', 'fashion', 'tech', 'politics', 'sport'].map((item) => {
          return (
            <li className="navigation__item" key={item}>
              <NavLink
                to={`/${item}`}
                className={({ isActive }) => 'navigation__link' + (isActive ? ' navigation__link--active' : '')}
              >
                {categoryNames[item]}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

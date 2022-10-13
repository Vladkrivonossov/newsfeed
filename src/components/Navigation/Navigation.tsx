import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './Navigation.css';
import { categoryTitles } from '@features/categories/constants';

interface Props {
  className?: string;
}

interface NavigationItemProps {
  title?: string;
  name?: string;
}

const NavigationItem: FC<NavigationItemProps> = ({ title, name = '' }) => {
  return (
    <li className="navigation__item" key={name}>
      <NavLink
        to={`/${name}`}
        className={({ isActive }) => 'navigation__link' + (isActive ? ' navigation__link--active' : '')}
      >
        {title}
      </NavLink>
    </li>
  );
};

export const Navigation: FC<Props> = ({ className = '' }) => {
  return (
    <nav className={classNames('navigation', className)}>
      <ul className="navigation__list">
        <NavigationItem title="Новости" />
        {Object.entries(categoryTitles).map(([name, title]) => {
          return <NavigationItem key={name} name={name} title={title} />;
        })}
      </ul>
    </nav>
  );
};
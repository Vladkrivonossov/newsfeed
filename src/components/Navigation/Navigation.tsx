import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './Navigation.css';
import { categoryTitles } from '@features/categories/constants';

interface Props {
  className?: string;
  onClick?: () => void;
}

interface NavigationItemProps {
  title?: string;
  name?: string;
  onClick?: () => void;
}

const NavigationItem: FC<NavigationItemProps> = ({ title, name = '', onClick }) => {
  return (
    <li className="navigation__item" key={name}>
      <NavLink
        onClick={onClick}
        to={`/${name}`}
        className={({ isActive }) => 'navigation__link' + (isActive ? ' navigation__link--active' : '')}
      >
        {title}
      </NavLink>
    </li>
  );
};

export const Navigation: FC<Props> = ({ className = '', onClick }) => {
  return (
    <nav className={classNames('navigation', className)}>
      <ul className="navigation__list">
        <NavigationItem title="Новости" onClick={onClick} />
        {Object.entries(categoryTitles).map(([name, title]) => {
          return <NavigationItem key={name} name={name} title={title} onClick={onClick} />;
        })}
      </ul>
    </nav>
  );
};

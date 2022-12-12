import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './Navigation.css';
import { CategoryNames } from '@features/categories/types';
import { useTranslation } from 'react-i18next';

interface Props {
  className?: string;
  onClick?: () => void;
}

interface NavigationItemProps {
  title?: string;
  name?: string;
  onClick?: () => void;
}

const NavigationItem: FC<NavigationItemProps> = ({ onClick, title, name = '' }) => {
  return (
    <li className="navigation__item" key={name}>
      <NavLink
        to={`/${name}`}
        onClick={onClick}
        className={({ isActive }) => 'navigation__link' + (isActive ? ' navigation__link--active' : '')}
      >
        {title}
      </NavLink>
    </li>
  );
};

export const Navigation: FC<Props> = ({ className = '', onClick }) => {
  const { t } = useTranslation();

  return (
    <nav className={classNames('navigation', className)}>
      <ul className="navigation__list">
        <NavigationItem title={t('category_news')} />
        {Object.values(CategoryNames)
          .slice(0, 5)
          .map((name) => {
            return <NavigationItem onClick={onClick} key={name} name={name} title={t(`category_${name}`)} />;
          })}
      </ul>
    </nav>
  );
};

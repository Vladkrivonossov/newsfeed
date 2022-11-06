import React, { FC } from 'react';
import classNames from 'classnames';
import './LocaleSwitcherMenu.css';
import { LocaleSwitcherValues } from '@features/locale/types';

interface Props {
  selectedLocale: LocaleSwitcherValues;
  onChangeLocale: (value: LocaleSwitcherValues) => any;
  className?: string;
}

export const LocaleSwitcherMenu: FC<Props> = ({ selectedLocale, onChangeLocale, className }) => {
  return (
    <div className={classNames('locale-switcher-menu', className)}>
      <button className="locale-switcher-menu__option" onClick={() => onChangeLocale('en')}>
        <span className="locale-switcher-menu__text">English</span>
        {selectedLocale === 'en' && (
          <img
            className="locale-switcher-menu__check"
            src={require('../../../../images/check.svg')}
            alt="Выбранная тема"
          />
        )}
      </button>
      <button className="locale-switcher-menu__option" onClick={() => onChangeLocale('ru')}>
        <span className="locale-switcher-menu__text">Русский</span>
        {selectedLocale === 'ru' && (
          <img
            className="locale-switcher-menu__check"
            src={require('../../../../images/check.svg')}
            alt="Выбранная тема"
          />
        )}
      </button>
    </div>
  );
};

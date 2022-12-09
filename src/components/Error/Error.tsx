import React, { FC } from 'react';
import './Error.css';

export const Error: FC = () => {
  return (
    <div role="status" className="Error">
      <h1 className="Error__title">Oops! Чтото пошло не так</h1>
      <p className="Error__text">Не волнуйтесь. Мы уже вкусре проблемы и решаем ее</p>
    </div>
  );
};

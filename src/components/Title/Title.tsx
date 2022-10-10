import React, { FC, ElementType, ReactNode } from 'react';
import classNames from 'classnames';
import './Title.css';

interface TitleProps {
  Component?: ElementType;
  className?: string;
  children?: ReactNode;
}

export const Title: FC<TitleProps> = ({ Component = 'h1', children, className = '' }) => {
  return <Component className={classNames('Title', className)}>{children}</Component>;
};

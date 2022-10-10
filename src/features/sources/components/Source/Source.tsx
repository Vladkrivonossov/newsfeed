import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import './Source.css';

interface SourceProps {
  className?: string;
  href?: string;
  children?: ReactNode;
}

export const Source: FC<SourceProps> = ({ className = '', href = '', children }) => {
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={classNames('source', className)}>
      {children}
    </a>
  ) : (
    <span className={classNames('source', className)}>{children}</span>
  );
};

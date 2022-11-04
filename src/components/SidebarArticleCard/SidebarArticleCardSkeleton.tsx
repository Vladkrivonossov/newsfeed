import React, { FC } from 'react';
import './SidebarArticleCard.css';
import classNames from 'classnames';
import { Image } from '@components/Image/Image';
import { SkeletonText } from '@components/SkeletonText/SkeletonText';

interface SidebarArticleCardSkeletonProps {
  className?: string;
}

export const SidebarArticleCardSkeleton: FC<SidebarArticleCardSkeletonProps> = ({ className }) => {
  return (
    <div className={classNames('sidebar-article-card', className)}>
      <article className="sidebar-article-card__in">
        <div className="sidebar-article-card__media">
          <Image className="sidebar-article-card__image" skeleton />
        </div>
        <h3 className="sidebar-article-card__title">
          <SkeletonText rowsCount={3} />
        </h3>
        <div className="sidebar-article-card__source">
          <SkeletonText />
        </div>
      </article>
    </div>
  );
};

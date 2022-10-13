import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './ArticleCard.css';
import { Source } from '@features/sources/components/Source/Source';
import { beautifyDate } from '@app/utils';
import { categoryTitles } from '@features/categories/constants';
import { CategoryNames } from '@features/categories/types';
import { Image } from '@components/Image/Image';

interface Props {
  id: number;
  title: string;
  image?: string;
  category?: CategoryNames;
  description?: string;
  source?: string;
  date?: string;
  className?: string;
}

export const ArticleCard: FC<Props> = ({
  id,
  className,
  date = '',
  source = '',
  image = '',
  title,
  description = '',
  category,
}) => {
  const hasDescription = description.length > 0;
  const hasImage = image.length > 0;

  return (
    <Link
      to={`/article/${id}`}
      className={classNames(
        'article-card',
        {
          'article-card--has-description': hasDescription,
        },
        className
      )}
    >
      {hasImage && <Image className="article-card__image" src={image} alt="article-card__image" />}
      <div className="article-card__content">
        <h2 className="article-card__title">{title}</h2>
        {hasDescription && <span className="article-card__description">{description}</span>}
        <div className="article-card__info">
          {category && category.length && <span className="article-card__category">{categoryTitles[category]}</span>}
          {date && <span className="article-card__date">{beautifyDate(date)}</span>}
          {source && <Source className="article-card__source">{source}</Source>}
        </div>
      </div>
    </Link>
  );
};

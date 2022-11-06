import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './ArticleCard.css';
import { Source } from '@features/sources/components/Source/Source';
import { beautifyDate } from '@app/utils';
import { CategoryNames } from '@features/categories/types';
import { Image } from '@components/Image/Image';
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation();
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
      <article className="article-card__in">
        {hasImage && <Image className="article-card__image" src={image} alt={title} />}
        <div className="article-card__content">
          <h3 className="article-card__title">{title}</h3>
          {hasDescription && <span className="article-card__description">{description}</span>}
          <div className="article-card__info">
            {category && category.length && <span className="article-card__category">{t(`category_${category}`)}</span>}
            {date && <span className="article-card__date">{beautifyDate(date, i18n.language)}</span>}
            {source && <Source className="article-card__source">{source}</Source>}
          </div>
        </div>
      </article>
    </Link>
  );
};

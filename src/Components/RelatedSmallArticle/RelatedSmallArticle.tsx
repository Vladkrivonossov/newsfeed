import React, { FC } from 'react';
import './RelatedSmallArticle.css';
import { Link } from 'react-router-dom';

interface Props {
  id: number;
  image: string;
  title: string;
  category: string;
  source: string;
}

export const RelatedSmallArticle: FC<Props> = ({ id, image, source, title, category }) => {
  return (
    <Link to={`/article/${id}`} className="related-small-article">
      <article className="related-small-article__container">
        <img className="related-small-article__image" src={image} alt="related-article-image" />
        <div className="related-small-article__content">
          <span className="article-category related-small-article__category">{category}</span>
          <h2 className="related-small-article__title">{title}</h2>
          <span className="article-source related-small-article__source">{source}</span>
        </div>
      </article>
    </Link>
  );
};

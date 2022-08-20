import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './MainArticle.css';

interface Props {
  id: number;
  title: string;
  image: string;
  category: string;
  description: string;
  source: string;
}

export const MainArticle: FC<Props> = ({ id, title, image, category, description, source }) => {
  return (
    <Link to={`/article/${id}`} className="main-article">
      <article className="main-article__container">
        <div className="main-article__image-container">
          <img className="main-article__image" src={image} alt="news-image" />
        </div>
        <div className="main-article__content">
          <span className="article-category main-article__category">{category}</span>
          <h2 className="main-article__title">{title}</h2>
          <p className="main-article__text">{description}</p>
          <span className="article-source main-article__source">{source}</span>
        </div>
      </article>
    </Link>
  );
};

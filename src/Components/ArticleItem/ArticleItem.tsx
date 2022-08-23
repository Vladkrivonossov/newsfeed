import React, { FC } from 'react';
import './ArticleItem.css';
import { RelatedSmallArticle } from '../RelatedSmallArticle/RelatedSmallArticle';
import { SingleLineTitleArticle } from '../SingleLineTitleArticle/SingleLineTitleArticle';
import { Article, ArticleItemAPI, Category, RelatedArticlesAPI, Source } from '../../types';
import { beautifyDate } from '../../utils';
import { useParams } from 'react-router-dom';
import { ArticleItemInfo } from '../ArticleItemInfo/ArticleItemInfo';

export const ArticleItem: FC = () => {
  const { id } = useParams();
  const [articleItem, setArticleItem] = React.useState<ArticleItemAPI | null>(null);
  const [relatedArticle, setRelatedArticle] = React.useState<Article[] | null>(null);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [sources, setSources] = React.useState<Source[]>([]);

  React.useEffect(() => {
    fetch(`https://frontend.karpovcourses.net/api/v2/news/full/${id}`)
      .then((res) => res.json())
      .then(setArticleItem);

    Promise.all([
      fetch(`https://frontend.karpovcourses.net/api/v2/news/related/${id}?count=9`).then((res) => res.json()),
      fetch(`https://frontend.karpovcourses.net/api/v2/categories`).then((res) => res.json()),
      fetch(`https://frontend.karpovcourses.net/api/v2/sources`).then((res) => res.json()),
    ]).then((responses) => {
      const articles: RelatedArticlesAPI = responses[0];
      const categories: Category[] = responses[1];
      const sources: Source[] = responses[2];

      setRelatedArticle(articles.items);
      setCategories(categories);
      setSources(sources);
    });

    fetch(`https://frontend.karpovcourses.net/api/v2/news/related/${id}?count=9`)
      .then((res) => res.json())
      .then((res: RelatedArticlesAPI) => {
        setRelatedArticle(res.items);
      });
  }, [id]);

  if (articleItem === null || relatedArticle === null) {
    return null;
  }

  const renderArticleItemInfo = (articleItem: ArticleItemAPI): React.ReactElement => {
    return (
      <ArticleItemInfo
        categoryName={articleItem.category.name}
        date={beautifyDate(articleItem.date)}
        sourceLink={articleItem.link}
        sourceName={articleItem.source?.name}
        author={articleItem.author}
      />
    );
  };

  return (
    <section className="article-page">
      <article className="article">
        {articleItem.image.length ? (
          <section className="article__hero" style={{ backgroundImage: `url(${articleItem.image})` }}>
            <div className="container article__hero-content">
              <div className="grid">
                <h1 className="article__hero-title">{articleItem.title}</h1>
              </div>

              {renderArticleItemInfo(articleItem)}
            </div>
          </section>
        ) : null}

        <div className="grid container article__main">
          <div className="article__content">
            {!articleItem.image.length && (
              <div className="article__title-container">
                <h1 className="article__title">{articleItem.title}</h1>

                {renderArticleItemInfo(articleItem)}
              </div>
            )}

            <p>{articleItem.text}</p>
            {/*<p>Звезда баскетбола Неймар Джеймс объявил о новой рекламной акции у себя в инстаграмме, чем шокировал подписчиков. Каждый, кто пожертвует 200 долларов на развитие детских спортивных секций у себя в городе получит...</p>*/}
            {/*<p>Наши баскетболистки прекрасно шли по дистанции, но в решающий момент сплоховали.</p>*/}
            {/*<img src="http://placeimg.com/1000/500/any" />*/}
            {/*<p>Победа США получилась слишком лёгкой. Американки с самого начала захватили инициативу и не давали России ни малейшего шанса совершить камбэк. Появилась хоть призрачная надежда на спасение, но американки сразу же попали из-за дуги и фактически сняли все вопросы — шансов отыграться при 12:17 не было.</p>*/}
            {/*<img src="http://placeimg.com/1000/500/any" />*/}
          </div>

          <div className="article__small-column">
            {relatedArticle.slice(3, 9).map((item) => {
              const category = categories.find(({ id }) => item.category_id === id);
              const source = sources.find(({ id }) => item.source_id === id);

              return (
                <RelatedSmallArticle
                  id={item.id}
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  category={category?.name || ''}
                  source={source?.name || ''}
                />
              );
            })}
          </div>
        </div>
      </article>

      <section className="article-page__related-articles">
        <div className="container">
          <h2 className="article-page__related-articles-title">Читайте также:</h2>

          <div className="grid article-page__related-articles-list">
            {relatedArticle.slice(0, 3).map((item) => {
              const category = categories.find(({ id }) => item.category_id === id);
              const source = sources.find(({ id }) => item.source_id === id);

              return (
                <SingleLineTitleArticle
                  id={item.id}
                  key={item.id}
                  text={item.description}
                  image={item.image}
                  title={item.title}
                  category={category?.name || ''}
                  source={source?.name || ''}
                />
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
};

import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ArticlePage.css';
import { beautifyDate, repeat } from '@app/utils';
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard';
import { Hero } from '@components/Hero/Hero';
import { ArticleCard } from '@components/ArticleCard/ArticleCard';
import { Title } from '@components/Title/Title';
import { Source } from '@features/sources/components/Source/Source';
import { getCachedArticleItem } from '@features/articleItem/selectors';
import { getRelatedArticles } from '@features/relatedNews/selectors';
import { getSources } from '@features/sources/selectors';
import { fetchArticleItem } from '@features/articleItem/actions';
import { fetchRelatedArticles } from '@features/relatedNews/actions';
import { HeroSkeleton } from '@components/Hero/HeroSkeleton';
import { SkeletonText } from '@components/SkeletonText/SkeletonText';
import { SidebarArticleCardSkeleton } from '@components/SidebarArticleCard/SidebarArticleCardSkeleton';
import { useAdaptive } from '@app/hooks';
import { Dispatch } from '@app/store';
import { useTranslation } from 'react-i18next';

export const ArticlePage: FC = () => {
  const { id }: { id?: string } = useParams();
  const dispatch = useDispatch<Dispatch>();
  const articleItem = useSelector(getCachedArticleItem(Number(id)));
  const relatedArticles = useSelector(getRelatedArticles(Number(id)));
  const sources = useSelector(getSources);
  const [loading, setLoading] = useState(!articleItem?.text);
  const { isDesktop } = useAdaptive();
  const { i18n, t } = useTranslation();

  React.useEffect(() => {
    if (!articleItem?.text) {
      setLoading(true);
      //eslint-disable-next-line
      //@ts-ignore
      Promise.all([
        dispatch(fetchArticleItem(Number(id))).unwrap(),
        dispatch(fetchRelatedArticles(Number(id))).unwrap(),
      ]).then(() => {
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div aria-hidden>
        <div className="article-page" aria-label={t('loading')}>
          {articleItem?.title && articleItem.image ? (
            <Hero title={articleItem.title} image={articleItem.image} className="article-page__hero" />
          ) : (
            <HeroSkeleton hasText={true} className="article-page__hero" />
          )}
          <div className="container article-page__main">
            <div className="article-page__info">
              <SkeletonText />
            </div>
            <div className="grid">
              <div className="article-page__content">
                <p>
                  <SkeletonText rowsCount={6} />
                </p>
              </div>

              {isDesktop && (
                <aside className="article-page__sidebar">
                  {repeat((i) => {
                    return <SidebarArticleCardSkeleton key={i} className="article-page__sidebar-item" />;
                  }, 3)}
                </aside>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (articleItem === null) {
    return null;
  }

  return (
    <div className="article-page">
      <Hero title={articleItem.title} image={articleItem.image} className="article-page__hero" />
      <div className="container article-page__main">
        <section className="article-page__info" aria-label={t('article_page_info')}>
          <span className="article-page__category">{t(`category_${articleItem.category.name}`)}</span>
          <span className="article-page__date">{beautifyDate(articleItem.date, i18n.language)}</span>
          {articleItem.link.length > 0 && (
            <Source className="article-page__source" href={articleItem.link}>
              {articleItem.source?.name}
            </Source>
          )}
        </section>
        <section className="grid" aria-label={t('article_page_grid')}>
          <div className="article-page__content">
            <p>{articleItem.text}</p>
          </div>

          {isDesktop && (
            <aside className="article-page__sidebar" aria-label={t('article_page_sub_title')}>
              {relatedArticles.slice(3, 9).map((item) => {
                const source = sources.find(({ id }) => item.source_id === id);

                return (
                  <SidebarArticleCard
                    className="article-page__sidebar-item"
                    date={item.date}
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    source={source?.name || ''}
                    image={item.image}
                  />
                );
              })}
            </aside>
          )}
        </section>
      </div>

      <section className="article-page__related-articles">
        <div className="container">
          <Title Component="h2" className="article-page__related-articles-title">
            {t('related_article_title')}
          </Title>
          <div className="grid article-page__related-articles-list">
            {relatedArticles.slice(0, 3).map((item) => {
              const source = sources.find(({ id }) => item.source_id === id);

              return (
                <ArticleCard
                  className="article-page__related-articles-item"
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  date={item.date}
                  source={source?.name}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

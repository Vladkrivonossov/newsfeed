const categoryNames = {
    index: 'Главная',
    fashion: 'Мода',
    tech: 'Технологии',
    politics: 'Политика',
    sport: 'Спорт',
}
const categoryIds = {
    index: 0,
    fashion: 3,
    tech: 1,
    politics: 4,
    sport: 2,
}

const Navigation = ({onNavClick, currentCategory, className = 'gi'}) => {
    return (
        <nav className={`navigation grid ${className}`}>
            <a  className="navigation__logo" data-href='index' href="#">
                <img className="navigation__image" src="./images/logo.svg" alt="logo" />
            </a>
            <ul className="navigation__list">
                {['index', 'fashion', 'tech', 'politics', 'sport'].map((item) => {
                    return (
                        <li className="navigation__item" key={item}>
                            <a
                                onClick={onNavClick}
                                data-href={item}
                                href="#"
                                className={`navigation__link ${currentCategory === item ? 'navigation__link--active' : ''}`}
                            >{categoryNames[item]}</a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

const MainArticle = ({title, image, category, description, source}) => {
    return (
        <article className="main-article">
            <div className="main-article__image-container">
                <img className="main-article__image"
                     src={image}
                     alt="news-image"
                />
            </div>
            <div className="main-article__content">
                <span
                    className="article-category main-article__category"
                >
                    {category}
                </span>
                <h2
                    className="main-article__title"
                >
                    {title}
                </h2>
                <p
                    className="main-article__text"
                >
                    {description}
                </p>
                <span
                    className="article-source main-article__source"
                >
                    {source}
                </span>
            </div>
        </article>
    )
}

const SmallArticle = ({title, date, source}) => {
    return (
        <article className="small-article">
            <h2
                className="small-article__title"
            >
                {title}
            </h2>
            <p className="small-article__caption">
                <span
                    className="article-date small-article__date"
                >
                    {new Date(date).toLocaleDateString('ru-RU', {
                            month: 'long',
                            day: 'numeric',
                        })}
                </span>
                <span
                    className="article-source small-article__source"
                >
                    {source}
                </span>
            </p>
        </article>
    )
}

const App = () => {
    const [category, setCategory] = React.useState('index');
    const [articles, setArticles] = React.useState({items: [], categories: [], sourses: []});

    const onNavClick = (e) => {
        e.preventDefault();
        setCategory(e.currentTarget.dataset.href);
    }

    React.useEffect(() => {
        fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + (categoryIds[category] || ''))
            .then(res => res.json())
            .then((res) => {
                setArticles(res);
            })
    },[category])


    return (
        <>
            <header className="header">
                <div className="container">
                    <Navigation
                        className={'header__navigation'}
                        currentCategory={category}
                        onNavClick={onNavClick}
                    />
                </div>
            </header>
            <section className="articles">
                <main className="main">
                    <div className="container grid">
                        <section className="articles__big-column">
                            {articles.items.slice(0, 3).map((item) => {
                                return(
                                    <MainArticle
                                        key={item.title}
                                        title={item.title}
                                        description={item.description}
                                        image={item.image}
                                        source={articles.sources.find(({id}) => item.source_id === id).name}
                                        category={articles.categories.find(({id}) => item.category_id === id).name}
                                    />
                                )
                            })}
                        </section>

                        <section className="articles__small-column">
                            {articles.items.slice(3, 12).map((item) => {
                                return (
                                    <SmallArticle
                                        key={item.title}
                                        title={item.title}
                                        date={item.date}
                                        source={articles.sources.find(({id}) => item.source_id === id).name}
                                    />
                                )
                            })}
                        </section>
                    </div>
                </main>
            </section>
            <footer className="footer">
                <div className="container">
                    <Navigation
                        className={'footer__navigation'}
                        onNavClick={onNavClick}
                        currentCategory={category}
                    />
                    <div className="footer__column">
                        <p className="footer__text">Сделано на Frontend курсе в
                            <a
                               href="https://karpov.courses/frontend"
                               target="_blank"
                               className="footer__link">Karpov.Courses
                            </a>
                        </p>
                        <p className="footer__copyright">© 2022</p>
                    </div>
                </div>
            </footer>
        </>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));
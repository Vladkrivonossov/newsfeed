import { categoryIds } from "../../utils.js";
import { Navigation } from "../Navigation/Navigation.js";
import { Articles } from "../Articles/Articles.js";
import React from "react";
import './App.css'

export const App = () => {
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
                        placement={'header'}
                        className={'header__navigation'}
                        currentCategory={category}
                        onNavClick={onNavClick}
                    />
                </div>
            </header>
            <main>
                <Articles articles={articles} />
            </main>
            <footer className="footer">
                <div className="container">
                    <Navigation
                        placement={'footer'}
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
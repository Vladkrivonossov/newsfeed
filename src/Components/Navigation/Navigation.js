import React from "react";
import { categoryNames } from "../../utils.js";
import './Navigation.css'
import logo from '../../images/logo.svg'

export const Navigation = ({onNavClick, currentCategory, className = '', placement = 'header'}) => {
    return (
        <nav className={`grid navigation navigation--${placement} ${className}`}>
            <a  className="navigation__logo" data-href='index' href="src/script#">
                <img className="navigation__image" src={logo} alt="logo" />
            </a>
            <ul className="navigation__list">
                {['index', 'fashion', 'tech', 'politics', 'sport'].map((item) => {
                    return (
                        <li className="navigation__item" key={item}>
                            <a
                                onClick={onNavClick}
                                data-href={item}
                                href="src/script#"
                                className={`navigation__link ${currentCategory === item ? 'navigation__link--active' : ''}`}
                            >{categoryNames[item]}</a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
};
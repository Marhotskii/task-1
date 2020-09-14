import React from 'react'
import {NavLink} from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav>
            <div className="nav-wrapper">
                <a style={{paddingLeft: '1rem'}} className="brand-logo">Task1</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                   <li><NavLink to='/generate'>Генерация файлов</NavLink></li>
                   <li><NavLink to='/concat'>Конкатенация файлов</NavLink></li>
                   <li><NavLink to='/import'>Импорт файлов</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}
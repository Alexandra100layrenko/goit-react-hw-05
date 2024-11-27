import clsx from 'clsx';
import s from './Navigation.module.css'
import { Link, NavLink } from 'react-router-dom';

const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

const Navigation = () => {
  return (
    <div className={s.header}>
      <nav className={s.nav}>
        <NavLink className={buildLinkClass}  to='/'>
          Home
        </NavLink>
        <NavLink className={buildLinkClass}  to='/movies'>
          Movies
        </NavLink>
        </nav>
    </div>
  )
}

export default Navigation

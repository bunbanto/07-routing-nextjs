'use client';
import { useState } from 'react';
import css from './TagsMenu.module.css';
import Link from 'next/link';

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggleMenu} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              onClick={toggleMenu}
              href={`/notes/filter/all`}
              className={css.menuLink}
            >
              All Notes
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              onClick={toggleMenu}
              href={`/notes/filter/Work`}
              className={css.menuLink}
            >
              Work
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              onClick={toggleMenu}
              href={`/notes/filter/Personal`}
              className={css.menuLink}
            >
              Personal
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              onClick={toggleMenu}
              href={`/notes/filter/Meeting`}
              className={css.menuLink}
            >
              Meeting
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              onClick={toggleMenu}
              href={`/notes/filter/Shopping`}
              className={css.menuLink}
            >
              Shopping
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              onClick={toggleMenu}
              href={`/notes/filter/Todo`}
              className={css.menuLink}
            >
              Todo
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

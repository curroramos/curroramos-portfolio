import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { navLinks } from '../constants/index.js';

const NavItems = ({ onClick = () => {} }) => {
  const location = useLocation();

  const handleNavClick = (item, e) => {
    onClick();

    // If it's an anchor link and we're not on the home page, navigate to home first
    if (item.href.startsWith('#') && location.pathname !== '/') {
      e.preventDefault();
      // Use window.location to navigate to home with the anchor
      window.location.href = `/${item.href}`;
    }
  };

  return (
    <ul className="nav-ul">
      {navLinks.map((item) => {
        const isExternal = item.href.startsWith('#');
        const isActive = !isExternal && location.pathname === item.href;

        if (isExternal) {
          return (
            <li key={item.id} className={item.isButton ? "nav-li nav-li-button" : "nav-li"}>
              <a
                href={item.href}
                className={item.isButton ? "nav-li_a nav-li_a-button" : "nav-li_a"}
                onClick={(e) => handleNavClick(item, e)}
              >
                {item.name}
                {item.isButton && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                )}
              </a>
            </li>
          );
        }

        return (
          <li key={item.id} className={item.isButton ? "nav-li nav-li-button" : "nav-li"}>
            <Link
              to={item.href}
              className={`${item.isButton ? "nav-li_a nav-li_a-button" : "nav-li_a"} ${isActive ? "text-blue-400" : ""}`}
              onClick={onClick}
            >
              {item.name}
              {item.isButton && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <Link to="/" className="text-neutral-400 font-bold text-xl hover:text-white transition-colors">
            Francisco
          </Link>

          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle menu">
            <img src={isOpen ? 'assets/close.svg' : 'assets/menu.svg'} alt="toggle" className="w-6 h-6" />
          </button>

          <nav className="sm:flex hidden">
            <NavItems />
          </nav>
        </div>
      </div>

      <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <nav className="p-5">
          <NavItems onClick={closeMenu} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

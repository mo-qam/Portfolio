import React, { useEffect, useState, Fragment } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { projects as projectPageData } from "../constants";
import { logo, menu, close } from "../assets";

import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import Dropdown from 'react-dropdown';

import 'react-dropdown/style.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const menuItemStyling = (active) => {
  return active ? 'bg-rose-600 text-gray-100 rounded xl scale-[1.015] shadow-xl transition tracking-[.01em] -translate-x-1 duration-100 ' : 'text-secondary';
}

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    // Check if the current location is not the homepage
    if (location.pathname !== '/') {
      // Navigate to homepage then to the desired path
      navigate('/');
      setTimeout(() => navigate(path), 0);
    } else {
      // Navigate normally if already on the homepage
      navigate(path);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      
      if (location.pathname !== '/') {
        setActive(location.pathname);
      }
      
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
        if (location.pathname === '/') {
          setActive("");
        }
      }       
    };

    window.addEventListener("scroll", handleScroll);

    const navbarHighlighter = () => {
      const sections = document.querySelectorAll("section[id]");

      sections.forEach((current) => {
        const sectionId = current.getAttribute("id");
        const sectionHeight = current.offsetHeight;
        const sectionTop =
          current.getBoundingClientRect().top - sectionHeight * 0.2;

        if (sectionTop < 0 && sectionTop + sectionHeight > 0) {
          setActive(sectionId);
        }
      });
    };

    window.addEventListener("scroll", navbarHighlighter);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", navbarHighlighter);
    };
  }, [location]); // <-- Add location as a dependency

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex ">
            Mohammed Qamar &nbsp; <span className="sm:block hidden"> | Portfolio </span>
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row">
        {navLinks.map((nav, index) => (
            <li
              key={nav.id}
              className={`${
                (active === nav.id || active === nav.link) ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer transition transform active:-translate-y-1 ${
                nav.icon && index !== 0 ? "ml-6" : "ml-10"
              }`}
            >
              {nav.id === 'resume' ? (
                <a
                  href={nav.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {nav.title}
                </a>
              ) : (
                //////////////////////////// PROJECTS CHECK ////////////////////////////////////////
                nav.id === 'projects' ? (
                  <Menu as="div" className="relative inline-block shadow-2xl">
                    <div>
                      <Menu.Button 
                        className="inline-flex w-full justify-center rounded-md shadow-sm">
                        Projects
                        <ChevronDownIcon className="h-5 py-1" aria-hidden="true" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-rose-500 divide-opacity-30 rounded-md bg-black-200 shadow-card shadow-card ">
                        <div className="py-1 bg-black-100">
                        <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={`/#${nav.id}`}
                                target={nav.id ? undefined : '_blank'}
                                rel={nav.id ? undefined : 'noopener noreferrer'}
                                className={classNames(
                                  menuItemStyling(active),
                                  'block px-4 py-2 text-sm font-semibold text-gray-200 hover:font-medium'
                                )}
                                onClick={(e) => {
                                  // If the link is a regular route, handle it normally
                                  if (nav.link) {
                                    setActive(nav.link); // Update active state
                                    return; 
                                  }
                                
                                  // If we are on the homepage, scroll to the section
                                  if (location.pathname === '/#') {
                                    e.preventDefault(); // Prevent default behavior of scrolling to the anchor
                                    const element = document.getElementById(nav.id);
                                    if (element) element.scrollIntoView({ behavior: 'smooth' }); // Scroll to nav.id
                                  } else {
                                    // If not on '/', set window location directly to the base URL + hash
                                    window.location.href = `${window.location.origin}/#${nav.id}`;
                                  }
                                }}  
                              >
                                View All Projects
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                        <div className="py-1">
                        {projectPageData.map(({ name }) => (
                            <Menu.Item key={name}>
                              {({ active }) => (
                                <Link
                                  to={`/projects/${encodeURIComponent(name)}`}
                                  className={classNames(
                                    menuItemStyling(active),
                                    'block px-4 py-2 text-sm'
                                  )}
                                >
                                  {name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
      
                <Link
                  to={nav.link ? nav.link : `/#${nav.id}`}
                  rel={nav.id ? undefined : 'noopener noreferrer'}
                  onClick={(e) => {
                    // If the link is a regular route, handle it normally
                    if (nav.link) {
                      e.preventDefault();
                      window.open(nav.link, '_blank');
                      setActive(nav.link); // Update active state
                      return;
                    }
                  
                    // If we are on the homepage, scroll to the section
                    if (location.pathname === '/') {
                      e.preventDefault(); // Prevent default behavior of scrolling to the anchor
                      const element = document.getElementById(nav.id);
                      if (element) element.scrollIntoView({ behavior: 'smooth' }); // Scroll to nav.id
                    } else if (!nav.icon) {
                      // If not on '/', set window location directly to the base URL + hash
                      window.location.href = `${window.location.origin}/#${nav.id}`;
                    }
                  }}      
                >
                  {nav.icon ? (
                    <a target="_blank" rel="noopener noreferrer">
                        <img
                          src={nav.icon}
                          alt={nav.title}
                          className="w-6 h-6 object-contain hover:opacity-90 opacity-60"
                        />
                      </a>
                  ) : (
                    nav.title
                  )}
                </Link>
                )
              )}
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-tertiary shadow-lg shadow-rose-500/40 ring-1 ring-black ring-opacity-5 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.id ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  {nav.id === 'resume' ? (
                    <a
                      href={nav.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {nav.title}
                    </a>
                  ) : (
                    <Link
                    to={nav.link ? nav.link : `/#${nav.id}`}
                    onClick={() => {
                      setToggle(!toggle);
                      const element = document.getElementById(nav.id);
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {nav.title}
                  </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

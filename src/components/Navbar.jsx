import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
        setActive("");
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
  }, []);

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
          onClick={() => {
            window.scrollTo(0, 0);
          }}
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
                active === nav.id ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer ${
                nav.icon && index !== 0 ? "ml-6" : "ml-10"
              }`}
            >
              {nav.isPdf ? (
                <a
                  href={nav.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {nav.title}
                </a>
              ) : (
                <Link
                  to={nav.id ? `#${nav.id}` : nav.link}
                  target={nav.id ? undefined : '_blank'}
                  rel={nav.id ? undefined : 'noopener noreferrer'}
                  onClick={() => {
                    const element = document.getElementById(nav.id);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {nav.icon ? (
                    <img
                      src={nav.icon}
                      alt={nav.title}
                      className="w-6 h-6 object-contain hover:opacity-90 opacity-60"
                    />
                  ) : (
                    nav.title
                  )}
                </Link>
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
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
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
                  {nav.isPdf ? (
                    <a
                      href={nav.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {nav.title}
                    </a>
                  ) : (
                    <Link
                      to={nav.id ? `#${nav.id}` : nav.link}
                      target={nav.id ? undefined : '_blank'}
                      rel={nav.id ? undefined : 'noopener noreferrer'}
                      onClick={() => {
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

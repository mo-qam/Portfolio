import { motion } from "framer-motion";
import React, { useEffect, useState, useCallback } from "react";
import { styles } from "../styles";
import { ControllersCanvas } from "./canvas";
import { Link } from "react-router-dom";
import 'react-dropdown/style.css';
import { BsArrowDown } from 'react-icons/bs';
import "../index.css";

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  
  const handleScroll = useCallback(() => {
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

  }, [location]);

  useEffect(() => {
    // Add throttling to the scroll event listener
    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [handleScroll]);


  // Throttle function
  function throttle(func, wait) {
    let timeout;
    return function() {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(this, arguments);
        }, wait);
      }
    };
  }

  const MemoizedArrowDown = React.memo(() => (
    <motion.div
      animate={{
        y: [0, 24, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop",
      }}
      className="w-3 h-3 mb-4"
    >
      <BsArrowDown className="scale-[3.4] text-white-100" />
    </motion.div>
  ));

  return (
    <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#b33939]" />
          <div className="w-1 sm:h-80 h-40 red-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#b33939]">Mohammed Qamar</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100 fade`}>
            Designer | Developer | Artist <br className="sm:block hidden" />
            for Game Applications.
          </p>
        </div>
      </div>
      
      <ControllersCanvas />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <Link
            to={`#about`}
            rel={'noopener noreferrer'}
            className= 'block px-4 py-2 text-sm font-semibold'
            onClick={(e) => {
              const element = document.getElementById('about');
              element.scrollIntoView({ behavior: 'smooth' });
            }}  
          >
          <div className="flex justify-center items-start p-2">
            <MemoizedArrowDown />
          </div>
          </Link>
      </div>
    </section>
    </div>
  );
};

export default Hero;

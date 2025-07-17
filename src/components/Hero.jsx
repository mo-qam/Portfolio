import { motion } from "framer-motion";
import React, { useEffect, useState, useCallback } from "react";
import { styles } from "../styles";
import { ControllersCanvas } from "./canvas";
import { Link } from "react-router-dom";
import 'react-dropdown/style.css';
import { BsArrowDown } from 'react-icons/bs';

import { brandLogo } from "../assets";
import Threads from "./Threads";
import SplitText from "./SplitText";


import "../index.css";

const isMobile = window.innerWidth <= 768;

const isShortScreen = window.innerHeight <= 700;




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
    <>
      {isMobile ? (
        <div
        className="w-3 h-3 mb-4"
      >
        <BsArrowDown className="scale-[3.4] text-white-100" />
      </div>
      ) : (
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

      )}
    </>
  ));

  
  const MemoizedBrandLogo = React.memo(() => (
    <>
      {isMobile ? (
        !isShortScreen ? (
          <div className="w-22 h-22 mb-2">
            <img src={brandLogo} alt="mohammed-qamar-logo" className=" text-white-100"/>
          </div>
        ) : null
      ) : null}
    </>
  ));

  return (
    <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
      <section className={`relative w-full h-screen mx-auto`}>
        {/* Threads background effect */}
        <div className="absolute inset-0 z-0 pointer-events-auto" style={{ pointerEvents: 'auto' }}>
          <Threads
            color={[40/255, 33/255, 67/255]}
            amplitude={3}
            distance={.25}
            enableMouseInteraction={true}
            style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', inset: 0, zIndex: 0 }}
          />
        </div>

        <div
          className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10`}
        >
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="w-5 h-5 rounded-full bg-[#b33939]" />
            <div className="w-1 sm:h-80 h-40 red-gradient" />
          </div>

          <div>
            <SplitText
              text={["Hi, I'm ", <span key="mq" className="text-[#b33939]">Mohammed Qamar</span>]}
              className={`${styles.heroHeadText} text-white`}
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              onLetterAnimationComplete={() => { console.log('All letters have animated!'); }}
            />
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
            <div className="flex flex-col justify-center items-center p-5">
              <div className="mb-4">
                <MemoizedBrandLogo />
              </div>
              <div>
                <MemoizedArrowDown />
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Hero;

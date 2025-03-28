import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const isMobile = window.innerWidth <= 768;

const CardContent = ({ icon, title }) => (
  <div
    options={{
      max: 45,
      scale: 1,
      speed: 450,
    }}
    className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
  >
    <img
      src={icon}
      alt="web-development"
      className="w-16 h-16 object-contain hover:-rotate-12 transition-all duration-300"
    />

    <h3 className="text-white text-[20px] font-bold text-center">
      {title}
    </h3>
  </div>
);

const ServiceCard = ({ index, title, icon, isMobile }) => (
  !isMobile ? (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn("right", "spring", index * 0.1, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <CardContent icon={icon} title={title} />
      </motion.div>
    </Tilt>
  ) : (
    <div className="xs:w-[250px] w-full">
      <div
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <CardContent icon={icon} title={title} />
      </div>
    </div>
  )
);

const About = () => {
  return (
    <>
      {isMobile ? (
        <div variants={textVariant()}>
          <p className={styles.sectionSubText}>Who am I?</p>
          <h2 className={styles.sectionHeadText}>Overview.</h2>
        </div>
      ) : (
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Who am I?</p>
          <h2 className={styles.sectionHeadText}>Overview.</h2>
        </motion.div>
      )}

      {isMobile ? (
        <div className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]">
          I'm a skilled Designer and Artist with experience in Systems Design,
          Level Design, Technical Art, 3D Art, and UI/UX implementation.
          I'm a quick learner and collaborate closely with my colleagues to
          create efficient, scalable, and performant solutions that solve
          problems fast.
          <a
            href="https://canvasrebel.com/check-out-mohammed-qamars-story"
            target="_blank"
            className="
            ml-2 text-[15px] max-w-3xl leading-[15px] text-rose-400 animate-pulse"
          >
            Click here to learn more about me.
          </a>
        </div>
      ) : (
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          I'm a skilled Designer and Artist with experience in Systems Design,
          Level Design, Technical Art, 3D Art, and UI/UX implementation.
          I'm a quick learner and collaborate closely with my colleagues to
          create efficient, scalable, and performant solutions that solve
          problems fast.
          <a
            href="https://canvasrebel.com/check-out-mohammed-qamars-story"
            target="_blank"
            className="ml-2 text-[15px] max-w-3xl leading-[15px] text-rose-400 animate-pulse"
          >
            Click here to learn more about me.
          </a>
        </motion.p>
      )}

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} isMobile={isMobile} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");

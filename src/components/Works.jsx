import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import React, { useRef, useState, useEffect } from 'react';
import useOnScreen from './useOnScreen';
import GifEmbed from './GifEmbed';

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  gif,
  video,
  source_code_link,
}) => {
  const imgRef = useRef(null);
  const isMobile = window.innerWidth <= 768;
  const [hasMedia, setHasMedia] = useState(!!gif || !!video);


  const handleMouseEnter = () => {
    if (hasMedia) {
      setHovered(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (hasMedia) {
      setHovered(false);
    }
  };

  const [hovered, setHovered] = useState(false);

   // Add a new state to control playing the GIF on mobile
  const [mobileGifPlaying, setMobileGifPlaying] = useState(false);

  const [ref, isVisible] = useOnScreen({ threshold: 0.3 }); // Adjust the threshold according to your requirements

  useEffect(() => {
    if (isMobile && isVisible && !mobileGifPlaying) {
      const timer = setTimeout(() => {
        setMobileGifPlaying(true);
      }, 3000); // Modify the delay as needed (2000 ms = 2 seconds)
  
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isMobile, isVisible, mobileGifPlaying]);

  const mediaWrapperStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: '1rem',
  };

  return (
    <>
      {!isMobile ? (
        <motion.div  ref = {ref} variants={!isMobile && fadeIn("up", "spring", index * 0.5, 0.75)}>
          <Tilt
            options={{ max: 45, scale: 1, speed: 450 }}
            className="bg-tertiary p-5 rounded-2xl sm:w-[300px] w-full"
          >
            <div className="relative w-full h-[230px]"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
              <img
                ref={imgRef}
                src={image}
                alt={name}
                style={{ opacity: hasMedia && hovered && mobileGifPlaying ? 0 : 1 }}
                className="w-full h-full object-cover rounded-2xl transition-opacity duration-300 hover:transition-opacity"
              />
                <GifEmbed
                  gifUrl={gif}
                  opacity={(hasMedia && mobileGifPlaying) || (hasMedia && hovered) ? 1 : 0}
                  shouldPlay={(hasMedia && mobileGifPlaying) || (hasMedia && hovered)}
                  style={mediaWrapperStyle}
                />
              <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
                <div
                  onClick={() => window.open(source_code_link, "_blank")}
                  className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer 
                  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                >
                  <img
                    src={github}
                    alt="github"
                    className="w-1/2 h-1/2 object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h3 className="text-white font-bold text-[24px]">{name}</h3>
              <p className="mt-2 text-secondary text-[14px]">{description}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <p key={tag.name} className={`text-[14px] ${tag.color}`}>
                  #{tag.name}
                </p>
              ))}
            </div>
          </Tilt>
        </motion.div>
      ) : (
        <div ref = {ref} className="bg-tertiary p-5 rounded-2xl sm:w-[300px] w-full">
          <div className="relative w-full h-[230px]">
            <img
              ref={imgRef}
              src={image}
              alt={name}
              style={{ opacity: hasMedia && mobileGifPlaying ? 0 : 1 }}
              className="w-full h-full object-cover rounded-2xl transition-opacity duration-300"
            />
            <GifEmbed
              gifUrl={gif}
              opacity={hasMedia && mobileGifPlaying ? 1 : 0}
              shouldPlay={hasMedia && mobileGifPlaying}
              style={mediaWrapperStyle}
            />
            <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
              <div
                onClick={() => window.open(source_code_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
              >
                <img
                  src={github}
                  alt="github"
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h3 className="text-white font-bold text-[24px]">{name}</h3>
            <p className="mt-2 text-secondary text-[14px]">{description}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p key={tag.name} className={`text-[14px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
    )}
  </>
);
};

const TitleContent = () => {
  return (
    <div className="flex flex-col">
      <p className={styles.sectionSubText}>My work</p>
      <h2 className={styles.sectionHeadText}>Projects.</h2>
    </div>
  );
};

const SubHeadingContent = () => {
  return (
    <div className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]" >
      <p>
        Following projects showcases my skills and experience through
        real-world examples of my work. Each project is briefly described with
        links to their location. It reflects my
        ability to solve complex problems, work with different technologies,
        and manage projects effectively.
      </p>
    </div>
  );
};

const Works = ({isMobile}) => {
  return (
    <>
      {isMobile ? (
        <motion.div variants={textVariant()}>
          <TitleContent />
        </motion.div>
      ) : (
        <div className="flex flex-col">
          <TitleContent />
        </div>
      )}


      <div className="w-full flex">
        {isMobile ? (
            <motion.p
              variants={fadeIn("", "", 0.1, 1)}
              className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
            >
              <SubHeadingContent />
          </motion.p>
        ) : (
          <div className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]" >
            <SubHeadingContent />
          </div>
        )}
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");

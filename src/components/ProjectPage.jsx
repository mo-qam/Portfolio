import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Tilt from 'react-tilt';
import ReactPlayer from 'react-player';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/scale-out-animation.css';
import 'react-awesome-slider/dist/custom-animations/open-animation.css';

import { styles } from "../styles";
import { fadeIn, slideIn } from "../utils/motion";
import { motion } from "framer-motion";
import { projects as projectPageData } from "../constants";

const AutoplaySlider = withAutoplay(AwesomeSlider);

  
const Slider = ({ images }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <AutoplaySlider 
        animation="openAnimation"
        play={true}
        cancelOnInteraction={false}
        interval={4000}
        className="aws-btn"
      >
        {images.map((image, idx) => <div key={idx} data-src={image} />)}
      </AutoplaySlider>
    </motion.div>
  );
}


const DetailCard = ({ label, content, index, isMobile }) => (
  !isMobile ? (
    <div
      variants={slideIn("right", "tween", index * 0.1, 0.75)}
      className="bg-tertiary shadow-card rounded-2xl 
      py-5 px-8 
      min-h-[100px] min-w-[100px] 
      flex flex-col justify-evenly 
      items-left
      border-solid border-2 border-rose-600 hover:ring-2 ring-rose-600 transition-all duration-200
      "
    >
      <p className="font-secondary"><strong>{label}</strong></p>
      <p className='mt-2 '>{content}</p>
    </div>
  ) : (
    <div
      variants={slideIn("right", "tween", index * 0.1, 0.75)}
      className="bg-tertiary shadow-card rounded-2xl
      py-12 px-8 
      min-h-[190px] min-w-[150px] 
      flex flex-col justify-evenly 
      items-left
      border-solid border-2 border-rose-600 hover:ring-2 ring-rose-600 transition-all duration-200
      "
    >
      <p className="font-secondary animate-breathe"><strong>{label}</strong></p>
      <p className='mt-2 leading-relaxed'>{content}</p>
    </div>
  )
);

const ServiceCard = ({ index, label, content, isMobile }) => (
  !isMobile ? (
    <Tilt className="xs:w-[290px] w-full">
      <motion.div
        variants={fadeIn(isMobile ? 'up' : 'right', 'spring', index * 0.1, isMobile ? 0.5 : 0.75)}
        className="w-full p-[1px]"
      >
        <DetailCard label={label} content={content} index={index} isMobile={isMobile} />
      </motion.div>
    </Tilt>
  ) : (
    <div className="xs:w-[290px] w-full">
      <motion.div
        vvariants={fadeIn(isMobile ? 'up' : 'right', 'spring', index * 0.1, isMobile ? 0.5 : 0.75)}
        className="w-full p-[1px]"
      >
        <DetailCard label={label} content={content} index={index} isMobile={isMobile} />
      </motion.div>
    </div>
  )
);


const ProjectPage = ({ project }) => {
  const encodedName = encodeURIComponent(project.name);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Attach event listener and set initial state
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to convert Google Drive share link to the embeddable link
  const getEmbeddableGoogleDriveUrl = (url) => {
    const regExp = /https:\/\/drive.google.com\/file\/d\/([a-zA-Z0-9_\-]+)/;
    const match = url.match(regExp);
    return match ? `https://drive.google.com/file/d/${match[1]}/preview` : null;
  };

  const imageUrls = project.images.map((imageObj) => {
    // This assumes that each image object has only one image URL
    const urlKey = Object.keys(imageObj).find((key) => key.startsWith('image_'));
    return imageObj[urlKey];
  });
  
  // Now imageUrls will be an array of just the URLs.  

  return (
    <div id={encodedName} className="bg-black-100 rounded-[20px]">
      <div className='bg-tertiary rounded-2xl p-4 md:p-8'>
        <div className={`${styles.padding} bg-tertiary rounded-2xl`}>
          <header className={`header text-left flex items-center ${isMobile ? 'flex-col mb-20 mt-20' : 'flex-row mb-40 mt-60 pr-2'}`}>
              <div 
                onClick={() => window.open(project.source_code_link, "_blank")}
                className={`
                  cursor-pointer transition ease-in-out hover:-translate-y-1 duration-200 tracking-tight
                  hover:ring ring-rose-500 ring-offset-[20px] rounded-2xl dark:ring-offset-slate-900 tracking-wide
                  ${isMobile ? '' : 'max-w-[calc(100%-700px)]'}
                  `}
              >
                <p className={styles.heroSubText}>{project.company_name}</p>
                <h1 className={`${styles.heroHeadText}`}>{project.name}</h1>
              </div>
            <div className={`${isMobile ? 'mt-4 w-full h-auto w-[300px] h-[234px]' : 'ml-auto w-[600px] h-[334px]'} relative rounded-[20px] shadow-card`}>
              {/* Foreground Image */}
              <img src={imageUrls}
                  alt={project.name}
                  className="w-full object-cover rounded-2xl z-10 blur-sm opacity-30" 
              />
              {/* Slider as background */}
              <div className={`
                absolute top-0 left-0 w-full object-cover rounded-2xl 
                shadow-card drop-shadow-xl z-0 transform overflow-hidden
                ring-inset-2 ring-2 ring-rose-600 
                hover:ring-4 ring-rose-600 hover:scale-105 transition-all duration-300 shadow-inner
                ${isMobile ? '' : '-translate-x-12 -translate-y-14'}
                `}>
                <Slider project={{project}} images={imageUrls} />

              </div>
            </div>
          </header>
        </div>
      </div>

      {/* ///////BODY/////// */}
      <div className={`${styles.paddingProject} grid grid-cols-1 ${isMobile ? 'mt-24' : 'md:grid-cols-12 gap-4'}  mt-10`}>
          <div className={`col-span-1 ${isMobile ? 'col-span-12' : 'md:col-span-5'}`}>
            <h2 className="text-white text-[24px] font-bold mb-12">{project.projectSubtitle}</h2>
            <div className="flex flex-wrap">
              <div className="w-1/2 pr-3">
                <ServiceCard label="Duration" content={project.duration} isMobile={isMobile} />
              </div>
              <div className="w-1/2 pr-3">
                <ServiceCard label="Project Type" content={project.projectType} isMobile={isMobile} />
              </div>
              <div className="w-1/2 mt-4 pr-3">
                <ServiceCard label="Tools" content={project.tools} isMobile={isMobile} />
              </div>
              <div className="w-1/2 mt-4 pr-3">
                <ServiceCard label="Role" content={project.role} isMobile={isMobile} />
              </div>
                <div className="w-full mt-12">
                  <p className="font-secondary"><strong>Tags</strong></p>
                  <div className={`mt-4 flex flex-wrap gap-2 ${isMobile ? 'mb-14' : ''}`}>
                  {project.tags.map((tag) => (
                    <p key={tag.name} className={`text-[16px] ${tag.color}`}>
                      #{tag.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

        {isMobile ? null : <div className="col-span-1"></div>}

        <div className={`col-span-6 ${isMobile ? 'md:col-span-12' : ''}`}>
          <h4 className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
            PROJECT OVERVIEW
          </h4>
          <p className="mt-4 text-lg">
            {project.background}
          </p>
          <h4 className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider mt-8">
            CONTRIBUTIONS
          </h4>
          <p className="mt-4 text-lg">
            {project.description}
          </p>
        </div>

        {/* Spacer */}
        <div className="col-span-12">
        {isMobile ? null : <div className="h-20"></div>}
        </div>
        
        {/* Media Section */}
        <div className="col-span-12 mt-12 grid grid-cols-12 gap-4 ">
          {project.media?.map((media, mediaIndex) => {
            let mediaUrl = media.link;
            let isGoogleDrive = false;

            if (media.link && media.link.includes('drive.google.com')) {
              mediaUrl = getEmbeddableGoogleDriveUrl(media.link);
              isGoogleDrive = true;
            }

            return (
              <React.Fragment key={media.id}>
                {isMobile ? (
                  <div className="col-span-12 mb-24">

                    {/* Media */}
                    <div className="bg-tertiary p-5 rounded-2xl h-[250px] shadow-card overflow-hidden mb-8 shadow-inner">
                      {isGoogleDrive ? (
                        <iframe
                          src={mediaUrl}
                          width="100%"
                          height="100%"
                          allow="autoplay"
                          className="rounded-2xl scale-110"
                        ></iframe>
                      ) : media.image ? (
                        <Link to={media.image_Link ? media.image_Link : ''}>
                          <div className="Tilt-inner rounded-2xl overflow-hidden h-full hover:ring-2 ring-rose-600 transition-all duration-200">
                            <img src={media.image} alt={media.alt} className="h-full w-full" />
                          </div>
                        </Link>
                      ) : !isGoogleDrive ? (
                      <ReactPlayer
                        url={media.link}
                        width="100%"
                        height="100%"
                        onReady={() => console.log("Player is ready")}
                        onError={(e) => console.log("There was an error!", e)}
                        controls
                        className="rounded-2xl scale-110"
                      />
                      ) : null}
                    </div>

                    {/* Text */}
                    <div>
                      <h4 className={styles.sectionSubText}>{media.mediaSubtitle}</h4>
                      <h3 className="text-2xl font-bold">{media.mediaTitle}</h3>
                      {(media.mediaDescription ? media.mediaDescription.split('\n') : []).map((mediaDesc, index) => (
                        <p key={index} className="mt-2 text-secondary text-[14px]">
                          {mediaDesc}
                        </p>
                      ))}
                      <ul className="mt-5 list-disc ml-5 space-y-2"> 
                        {media.mediaBulletPoints ? media.mediaBulletPoints.map((bulletPoint, index) => (
                          <li key={index} className="text-white-100 text-[14px] pl-1 tracking-wider">
                            {bulletPoint}
                          </li>
                        )) : null}
                      </ul>
                    </div>
                  </div>
                  
                ) : (
                  <>
                    {/* Desktop Layout ////////////////////////////////////////////////////////////*/} 
                    {mediaIndex % 2 === 0 ? (
                      <>
                        {/* Media on the left */}
                        <div className={`col-span-6 mb-40`}>
                          <div className={`
                            bg-tertiary p-5 rounded-2xl shadow-card overflow-hidden
                            ${isMobile ? 'sm:w-[700px] h-[250px]' : 'sm:w-[700px] w-full h-[400px]'}
                          `}>
                            {isGoogleDrive ? (
                              <iframe
                                src={mediaUrl}
                                width="100%"
                                height="100%"
                                allow="autoplay"
                                className="transition-all duration-300 rounded-2xl scale-110 hover:scale-[1.12] outline-2 outline-rose-600"
                              ></iframe>
                            ) : media.image ? (
                              <Link to={media.image_Link ? media.image_Link : ''} target="_blank">
                                <div className="Tilt-inner rounded-2xl overflow-hidden h-full hover:scale-[1.05] transition-all duration-200">
                                    <img src={media.image} alt={media.alt} className="h-full w-full" />
                                </div>
                               </Link>
                            ) : !isGoogleDrive ? (
                              <ReactPlayer
                                url={media.link}
                                width="100%"
                                height="100%"
                                onReady={() => console.log("Player is ready")}
                                onError={(e) => console.log("There was an error!", e)}
                                controls
                                className="transition-all duration-300 rounded-2xl scale-110"
                              />
                              ) : null}
                          </div>
                        </div>

                        {/* Text on the right */}
                        <div className={`col-span-${isMobile ? '12' : '6'} mb-40`}>
                          <h4 className={styles.sectionSubText}>{media.mediaSubtitle}</h4>
                          <h3 className="text-2xl font-bold mb-4">{media.mediaTitle}</h3>
                            {(media.mediaDescription ? media.mediaDescription.split('\n') : []).map((mediaDesc, index) => (
                              <p key={index} className="text-white-100 text-[14px] pl-1 pr-6 tracking-wider">
                                {mediaDesc}
                              </p>
                            ))}
                          <ul className="mt-5 list-disc ml-5 space-y-2">
                            {media.mediaBulletPoints ? media.mediaBulletPoints.map((bulletPoint, index) => (
                              <li key={index} className="text-white-100 text-[14px] pl-1 pr-6 tracking-wider">
                                {bulletPoint}
                              </li>
                            )) : null}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <>

                        {/* Text on the left */}
                        <div className={`col-span-${isMobile ? '12' : '6'} mb-40`}>
                          <h4 className={styles.sectionSubText}>{media.mediaSubtitle}</h4>
                          <h3 className="text-2xl font-bold">{media.mediaTitle}</h3>
                          {(media.mediaDescription ? media.mediaDescription.split('\n') : []).map((mediaDesc, index) => (
                              <p key={index} className="mt-4 text-white-100 text-[14px] pl-1 pr-6 tracking-wider">
                                {mediaDesc}
                              </p>
                            ))}
                          <ul className="mt-5 list-disc ml-5 space-y-2"> 
                            {media.mediaBulletPoints ? media.mediaBulletPoints.map((bulletPoint, index) => (
                              <li key={index} className="text-white-100 text-[14px] pl-1 pr-6 tracking-wider">
                                {bulletPoint}
                              </li>
                            )) : null}
                          </ul>
                        </div>

                        {/* Media on the right */}
                        <div className={`col-span-${isMobile ? '12' : '6'} mb-24`}>
                        <div className={`
                          bg-tertiary p-5 rounded-2xl shadow-card overflow-hidden
                          ${isMobile ? 'sm:w-[700px] h-[250px]' : 'sm:w-[700px] w-full h-[400px]'}
                        `}>
                          {isGoogleDrive ? (
                              <iframe
                              src={mediaUrl}
                              width="100%"
                              height="100%"
                              allow="autoplay"
                              className="transition-all duration-300 rounded-2xl scale-110 hover:scale-[1.12] outline-2 outline-rose-600"
                            ></iframe>
                          ) : media.image ? (
                            <Link to={media.image_Link ? media.image_Link : ''} target="_blank">
                              <div className="rounded-2xl overflow-hidden h-full hover:scale-[1.05] transition-all duration-200">
                                  <img src={media.image} alt={media.alt} className="h-full w-full" />
                              </div>
                           </Link>
                          ) : !isGoogleDrive ? (
                              <ReactPlayer
                                url={media.link}
                                width="100%"
                                height="100%"
                                onReady={() => console.log("Player is ready")}
                                onError={(e) => console.log("There was an error!", e)}
                                controls
                                className="transition-all duration-300 rounded-2xl scale-110"
                              />
                              ) : null}
                        </div>
                      </div>
                    </>
                    )}
                  </>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};


const ProjectPages = () => {
  const { projectName } = useParams();
  const decodedProjectName = decodeURIComponent(projectName);

  const project = projectPageData.find(
    (project) => project.name === decodedProjectName
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return <p>Project not found</p>; // Or some 404 component
  }

  return (
    <div>
      <ProjectPage project={project} />
    </div>
  );
};

export default ProjectPages;
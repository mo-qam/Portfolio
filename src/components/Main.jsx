import React from 'react';
import {
  About,
  Experience,
  Feedbacks,
  Hero,
  Tech,
  Works,
  Contact, 
} from './';

const Main = () => {
  return (
    <>
      <Hero />
      <Works />
      <Experience />
      <About />
      <Tech />
      <Feedbacks />
      <Contact />
    </>
  );
};

export default Main;
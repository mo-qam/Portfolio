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
      <About />
      <Experience />
      <Tech />
      <Works />
      <Feedbacks />
      <Contact />
    </>
  );
};

export default Main;
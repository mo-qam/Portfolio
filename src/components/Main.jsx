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

import ClickSpark from './ClickSpark';

const Main = () => {
  return (
    <>
    <ClickSpark
      sparkColor='#fff'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
      className="min-h-screen"
    >
      <Hero />
      <Works />
      <Experience />
      <About />
      <Tech />
      <Feedbacks />
      <Contact />
    </ClickSpark>

    </>
  );
};

export default Main;
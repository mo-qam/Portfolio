import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function CoverLetter_Prompt_Generator() {
  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const validateInput = () => {
    if (!companyName || !position || !jobDescription) {
      alert("All fields are mandatory.");
      return false;
    }
    return true;
  };

  const coverLetterPromptTemplate = (companyName, position, jobDescription) => {
    
    return `
    I am writing a cover letter. I am going to write about my education. I am going to write about my skills. I am going to write about my work experiences.

    I am going to write about my work experiences.

    /////////////////////////////////////////////////////////////////

    Degree Bachelors of Game Design
    Studies included game design, development, advanced 3d art, advanced 3d animation, narrative design, technical art, technical design

    Skills 
    3D Modeling
    Design Thinking 
    Data Analysis 
    Environment Design
    Level Design 
    Prototyping 
    Programming 
    Visual Design 
    Optimization
    C#,
    C++,
    Java,
    Mesh Rigging & Skinning
    Remote work (Experience at PixelNauts)

    Tools  
    3DS Max, Mudbox, Substance Painter, Designer, Sampler, Stager, Photoshop, Illustrator, Marmoset, Unity, Unreal Engine, Twine

    Designer & 3D Artist
    PixelNAUTS Games
    Worked directly with C-Suite and stakeholders to deliver seamless experiences.
    Worked with marketing and engineering decision makers to deliver high-quality game assets and environments.
    Delivered proof of concepts to lead designers for new technology which was later implemented in our product.
    Designed and implemented game systems, including mechanics, and UI, enhancing overall gameplay experiences.
    Ensured seamless integration of art assets with technical systems for optimal performance and visuals.
    Shipped a game title Rocket Rumble
    Created shaders and visual effects based on concepts from lead artists
    Designed, implemented and tested level designs 
    Designed and implemented effective tools for improving multiple department workflows
    Optimized levels

    3D Artist - Intern
    PixelNAUTS Games
    Designed and modeled a variety of 3D assets, such as characters, environments, and props, using industry-standard software like Substance Suite, and 3ds Max, while adhering to the project's style and technical guidelines.
    Worked closely with designers, animators, and other artists to create high-quality 3D assets, fostering a collaborative environment and contributing effectively to the team's success.
    Ensured all 3D assets were optimized for real-time performance, maintaining a balance between visual fidelity and technical constraints, such as polygon count, texture size, and level of detail (LOD).
    Demonstrated a strong aptitude for learning and adapting to new tools, techniques, and workflows, leading to a swift promotion to a core team member in under one month.
    Implemented art assets based on level design department whiteboxes and layouts

    /////////////////////////////////////////////////////////////////

    Cover Letter format should be:

    Dear Mr. Hiring Manager, 

    The purpose of this letter is to apply for the {position} position. An excellent candidate for this internship would have a strong understanding of {job_description}, and strong other requirements from the job posting.

    In addition, the right candidate for this internship should also have other requirements of the job. I believe my resume will show a proven history of utilizing these various skills through my professional and educational experiences. The body of the letter should specifically identify key requirements to show how the applicant is qualified for the job description.

    {company_name} is an outstanding company in City with a proven track record of outputting what the company does/makes. I believe that as a {position}, I could bring a diverse set of skills to the company and, in return, I can further develop my knowledge and experience while working with your team at {company_name}. I am very interested in discussing this opportunity further. Please contact me at your earliest convenience so I can learn more about the position. I have attached a copy of my resume for your review. I look forward to hearing from you soon.

    Thank you for your time and consideration.

    Sincerely,
    Mohammed Qamar

    /////////////////////////////////////////////////////////////////

    Now, using my above information and the job description and information below, 
    Please create a comprehensive cover letter template tailored to a ${position} position at ${companyName}. \n 
    
    Use the following information to fill in the blanks of the cover letter template.

    /////////////////////////////////////////////////////////////////
    Job Description:
    ${jobDescription}
    `
  };

  const generateCoverLetter = () => {
    if (validateInput()) {
      const newCoverLetter = coverLetterPromptTemplate(companyName, position, jobDescription);
      setCoverLetter(newCoverLetter);
    }
  };

  return (
    <div className="container mx-auto p-4 pt-20">
      <div className="flex flex-col mb-4">
        <label className="font-bold mb-2">Company Name:</label>
        <input type="text" className="border p-2" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
      </div>
      <div className="flex flex-col mb-4">
        <label className="font-bold mb-2">Position:</label>
        <input type="text" className="border p-2" value={position} onChange={(e) => setPosition(e.target.value)} />
      </div>
      <div className="flex flex-col mb-4">
        <label className="font-bold mb-2">Job Description:</label>
        <textarea className="border p-2 h-32" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
      </div>
      <button className="bg-blue-500 text-white p-2 rounded" onClick={generateCoverLetter}>Generate Cover Letter</button>
      <div className="flex flex-col mt-4">
        <h2 className="text-xl font-bold mb-2">Generated Cover Letter:</h2>
        <textarea readOnly className="border p-2 h-64" value={coverLetter} />
      </div>
      <CopyToClipboard text={coverLetter}>
        <button className="bg-green-500 text-white p-2 rounded mt-4">Copy to Clipboard</button>
      </CopyToClipboard>
    </div>
  );
}

export default CoverLetter_Prompt_Generator;

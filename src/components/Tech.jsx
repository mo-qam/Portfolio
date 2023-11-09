import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const isMobile = window.innerWidth <= 768;

const Balls = ({isMobile }) => (
  isMobile ? (
      <div className="flex flex-row flex-wrap justify-center gap-4 mb-[-400px]">
        {technologies.map((technology) => (
          <div className="w-28 h-28" key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
  ) : (
      <div className="flex flex-row flex-wrap justify-center gap-10" id="projects">
        {technologies.map((technology) => (
          <div className="w-28 h-28" key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
  )
);

const Tech = () => {
  return (
    <>
      <Balls isMobile={isMobile} />
    </>
  );
};

export default SectionWrapper(Tech, "tech");
